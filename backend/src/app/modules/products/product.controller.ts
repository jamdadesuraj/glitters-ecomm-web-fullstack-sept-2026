import { NextFunction, Request, Response } from "express";
import { appError } from "../../errors/appError";
import { Product } from "./product.model";
import { productSchema, updateProductSchema } from "./product.validation";

// ============================================
// HELPERS
// ============================================

type VariantInput = Record<string, any>;

const parseJsonField = <T>(field: unknown, defaultValue: T): T => {
  if (field === undefined || field === null || field === "") {
    return defaultValue;
  }

  if (typeof field === "string") {
    try {
      return JSON.parse(field) as T;
    } catch {
      throw new appError("Invalid JSON format", 400);
    }
  }

  return field as T;
};

const parseNumber = (value: unknown, defaultValue = 0): number => {
  if (value === undefined || value === null || value === "") {
    return defaultValue;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new appError("Invalid numeric value in product variant", 400);
  }

  return parsed;
};

const parseBoolean = (value: unknown): boolean =>
  value === true || value === "true" || value === "1";

// Returns a clean id string, or undefined for "", null, "null", "undefined"
const cleanObjectId = (value: unknown): string | undefined => {
  if (value === undefined || value === null) return undefined;

  const id = String(value).trim();

  if (!id || id === "null" || id === "undefined") return undefined;

  return id;
};

// Maps each uploaded file to the variant it belongs to
const createVariantImageResolver = (req: Request) => {
  const files = (req.files || {}) as {
    [fieldname: string]: Express.Multer.File[];
  };

  const uploadedImages = files.variantImages?.map((file) => file.path) ?? [];

  // Sent by the admin form: variant index for each uploaded file
  const hasIndexes = req.body.variantImageIndexes !== undefined;
  const imageIndexes = parseJsonField<number[]>(
    req.body.variantImageIndexes,
    [],
  );

  return (variantIndex: number): string => {
    // Old clients that don't send indexes: keep the previous behaviour
    if (!hasIndexes) return uploadedImages[variantIndex] || "";

    const fileIndex = imageIndexes.findIndex((i) => Number(i) === variantIndex);

    return fileIndex >= 0 ? uploadedImages[fileIndex] || "" : "";
  };
};

// Builds clean variants. `existingVariants` is only passed on update.
const prepareVariants = (
  variants: VariantInput[],
  getUploadedImage: (index: number) => string,
  existingVariants: VariantInput[] = [],
) =>
  variants.map((variant, index) => {
    const existing = variant._id
      ? existingVariants.find(
          (item) => item._id?.toString() === variant._id.toString(),
        )
      : undefined;

    const prepared: Record<string, unknown> = {
      price: parseNumber(variant.price, Number(existing?.price ?? 0)),
      delPrice: parseNumber(variant.delPrice, Number(existing?.delPrice ?? 0)),
      discount: parseNumber(variant.discount, Number(existing?.discount ?? 0)),
      stock: parseNumber(variant.stock, Number(existing?.stock ?? 0)),
      image:
        getUploadedImage(index) ||
        (typeof variant.image === "string" ? variant.image : "") ||
        existing?.image ||
        "",
    };

    if (variant._id) prepared._id = variant._id;

    // Size and color are optional.
    // If the key is sent, use it (empty clears it); if not sent, keep the existing one.
    const size = cleanObjectId("size" in variant ? variant.size : existing?.size);
    if (size) prepared.size = size;

    const color = cleanObjectId(
      "color" in variant ? variant.color : existing?.color,
    );
    if (color) prepared.color = color;

    return prepared;
  });

const populateOptions = [
  { path: "category", select: "_id categoryName status" },
  {
    path: "subCategory",
    select: "_id subCategoryName category status",
  },
  { path: "material", select: "_id name status" },
  { path: "brand", select: "_id name status" },
  {
    path: "coupon",
    select: "_id couponCode couponAmount couponName subTitle discount status",
  },
  { path: "variants.size", select: "_id size status" },
  { path: "variants.color", select: "_id colorName hexCode status" },
];

// ============================================
// CREATE PRODUCT
// ============================================

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const variants = parseJsonField<VariantInput[]>(req.body.variants, []);
    const specifications = parseJsonField<any[]>(req.body.specifications, []);
    const tags = parseJsonField<string[]>(req.body.tags, []);

    const productData = {
      productName: req.body.productName,
      category: req.body.category,
      subCategory: req.body.subCategory || undefined,
      material: req.body.material || undefined,
      section: req.body.section || undefined,
      brand: req.body.brand || undefined,
      dealOfTheDay: parseBoolean(req.body.dealOfTheDay),
      coupon: req.body.coupon || undefined,
      tags,
      videoUrl: req.body.videoUrl || "",
      variants: prepareVariants(variants, createVariantImageResolver(req)),
      shortDesc: req.body.shortDesc,
      desc: req.body.desc,
      additionalInformation: req.body.additionalInformation || "",
      shippingReturnPolicy: req.body.shippingReturnPolicy,
      specifications,
      status: req.body.status || "active",
      isDeleted: false,
    };

    const validatedData = productSchema.parse(productData);
    const createdProduct = await Product.create(validatedData);

    return res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// GET ALL PRODUCTS
// ============================================

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate(populateOptions)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// GET PRODUCT BY ID
// ============================================

export const getAllProductsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).populate(
      populateOptions,
    );

    if (!product) {
      return next(new appError("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// UPDATE PRODUCT
// ============================================

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = req.params.id;

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return next(new appError("Product not found", 404));
    }

    const variants = parseJsonField<VariantInput[]>(
      req.body.variants,
      (existingProduct.variants as unknown as VariantInput[]) || [],
    );

    const specifications = parseJsonField<any[]>(
      req.body.specifications,
      existingProduct.specifications || [],
    );

    const tags = parseJsonField<string[]>(
      req.body.tags,
      existingProduct.tags || [],
    );

    // Use the new value when the field is sent, otherwise keep the existing one.
    // Empty values clear optional fields.
    const optionalField = (value: unknown, current: unknown) =>
      value !== undefined ? value || undefined : current;

    const updateData = {
      productName: req.body.productName ?? existingProduct.productName,
      category: req.body.category ?? existingProduct.category,
      subCategory: optionalField(
        req.body.subCategory,
        existingProduct.subCategory,
      ),
      material: optionalField(req.body.material, existingProduct.material),
      section: optionalField(req.body.section, existingProduct.section),
      brand: optionalField(req.body.brand, existingProduct.brand),
      dealOfTheDay:
        req.body.dealOfTheDay !== undefined
          ? parseBoolean(req.body.dealOfTheDay)
          : existingProduct.dealOfTheDay,
      coupon: optionalField(req.body.coupon, existingProduct.coupon),
      tags,
      videoUrl:
        req.body.videoUrl !== undefined
          ? req.body.videoUrl
          : existingProduct.videoUrl,
      variants: prepareVariants(
        variants,
        createVariantImageResolver(req),
        (existingProduct.variants as unknown as VariantInput[]) || [],
      ),
      shortDesc: req.body.shortDesc ?? existingProduct.shortDesc,
      desc: req.body.desc ?? existingProduct.desc,
      additionalInformation:
        req.body.additionalInformation !== undefined
          ? req.body.additionalInformation
          : existingProduct.additionalInformation,
      shippingReturnPolicy:
        req.body.shippingReturnPolicy ?? existingProduct.shippingReturnPolicy,
      specifications,
      reviews: existingProduct.reviews || [],
      status: req.body.status ?? existingProduct.status,
      isDeleted:
        req.body.isDeleted !== undefined
          ? req.body.isDeleted === true || req.body.isDeleted === "true"
          : existingProduct.isDeleted,
    };

    const validatedData = updateProductSchema.parse(updateData);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      validatedData,
      { new: true, runValidators: true },
    );

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// ============================================
// DELETE PRODUCT
// ============================================

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedProduct) {
      return next(new appError("Product not found", 404));
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};