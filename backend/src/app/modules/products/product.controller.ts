import { NextFunction, Request, Response } from "express";
import { appError } from "../../errors/appError";
import { Product } from "./product.model";
import { productSchema, updateProductSchema } from "./product.validation";

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const parseJsonField = <T = any>(field: any, defaultValue: T): T => {
      if (field === undefined || field === null || field === "") {
        return defaultValue;
      }

      if (typeof field === "string") {
        try {
          return JSON.parse(field);
        } catch {
          throw new appError("Invalid JSON format", 400);
        }
      }

      return field;
    };

    // ============================================
    // FILES
    // ============================================

    const files = (req.files || {}) as {
      [fieldname: string]: Express.Multer.File[];
    };

    // ============================================
    // PARSE ARRAYS
    // ============================================

    const variants = parseJsonField<any[]>(req.body.variants, []);

    const specifications = parseJsonField<any[]>(req.body.specifications, []);

    const tags = parseJsonField<string[]>(req.body.tags, []);

    // ============================================
    // ATTACH VARIANT IMAGES
    // ============================================

    const variantImages = files?.variantImages?.map((file) => file.path) || [];

    const variantsWithImages = variants.map((variant: any, index: number) => ({
      ...variant,

      price: Number(variant.price ?? 0),
      delPrice: Number(variant.delPrice ?? 0),
      discount: Number(variant.discount ?? 0),
      stock: Number(variant.stock ?? 0),

      image: variantImages[index] || variant.image || "",
    }));

    // ============================================
    // PREPARE PRODUCT DATA
    // ============================================

    const productData = {
      productName: req.body.productName,

      category: req.body.category,

      subCategory: req.body.subCategory || undefined,

      material: req.body.material || undefined,

      section: req.body.section || undefined,

      brand: req.body.brand || undefined,

      dealOfTheDay:
        req.body.dealOfTheDay === true ||
        req.body.dealOfTheDay === "true" ||
        req.body.dealOfTheDay === "1",

      coupon: req.body.coupon || undefined,

      tags,

      videoUrl: req.body.videoUrl || "",

      variants: variantsWithImages,

      shortDesc: req.body.shortDesc,

      desc: req.body.desc,

      additionalInformation: req.body.additionalInformation || "",

      shippingReturnPolicy: req.body.shippingReturnPolicy,

      specifications,

      status: req.body.status || "active",

      isDeleted: false,
    };

    // ============================================
    // VALIDATION
    // ============================================

    const validatedData = productSchema.parse(productData);

    // ============================================
    // CREATE PRODUCT
    // ============================================

    const createdProduct = await Product.create(validatedData);

    // ============================================
    // RESPONSE
    // ============================================

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Product created successfully",
      data: createdProduct,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getAllProducts = await Product.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: getAllProducts,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProductsById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const getAllproductById = await Product.findOne({ _id: req.params.id });

    if (!getAllproductById) {
      return next(new appError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: getAllproductById,
    });
    return;
  } catch (error) {
    next(error);
  }
};

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

    // ============================================
    // HELPER: PARSE JSON FIELD
    // ============================================

    const parseJsonField = <T = any>(field: any, defaultValue: T): T => {
      if (field === undefined || field === null || field === "") {
        return defaultValue;
      }

      if (typeof field === "string") {
        try {
          return JSON.parse(field);
        } catch {
          throw new appError("Invalid JSON format", 400);
        }
      }

      return field;
    };

    // ============================================
    // FILES
    // ============================================

    const files = (req.files || {}) as {
      [fieldname: string]: Express.Multer.File[];
    };

    const variantImages = files?.variantImages?.map((file) => file.path) || [];

    // ============================================
    // PARSE BODY DATA
    // ============================================

    const variants = parseJsonField<any[]>(
      req.body.variants,
      existingProduct.variants || [],
    );

    const specifications = parseJsonField<any[]>(
      req.body.specifications,
      existingProduct.specifications || [],
    );

    const tags = parseJsonField<string[]>(
      req.body.tags,
      existingProduct.tags || [],
    );

    // ============================================
    // PREPARE VARIANTS
    // ============================================

    const variantsWithImages = variants.map((variant: any, index: number) => {
      const existingVariant = existingProduct.variants?.find(
        (item: any) =>
          variant._id && item._id?.toString() === variant._id?.toString(),
      );

      return {
        ...variant,

        price:
          variant.price !== undefined
            ? Number(variant.price)
            : Number(existingVariant?.price ?? 0),

        delPrice:
          variant.delPrice !== undefined
            ? Number(variant.delPrice)
            : Number(existingVariant?.delPrice ?? 0),

        discount:
          variant.discount !== undefined
            ? Number(variant.discount)
            : Number(existingVariant?.discount ?? 0),

        stock:
          variant.stock !== undefined
            ? Number(variant.stock)
            : Number(existingVariant?.stock ?? 0),

        image:
          variantImages[index] || variant.image || existingVariant?.image || "",
      };
    });

    // ============================================
    // PREPARE UPDATE DATA
    // ============================================

    const updateData = {
      productName: req.body.productName ?? existingProduct.productName,

      category: req.body.category ?? existingProduct.category,

      subCategory:
        req.body.subCategory !== undefined
          ? req.body.subCategory || undefined
          : existingProduct.subCategory,

      material:
        req.body.material !== undefined
          ? req.body.material || undefined
          : existingProduct.material,

      section:
        req.body.section !== undefined
          ? req.body.section || undefined
          : existingProduct.section,

      brand:
        req.body.brand !== undefined
          ? req.body.brand || undefined
          : existingProduct.brand,

      dealOfTheDay:
        req.body.dealOfTheDay !== undefined
          ? req.body.dealOfTheDay === true ||
            req.body.dealOfTheDay === "true" ||
            req.body.dealOfTheDay === "1"
          : existingProduct.dealOfTheDay,

      coupon:
        req.body.coupon !== undefined
          ? req.body.coupon || undefined
          : existingProduct.coupon,

      tags,

      videoUrl:
        req.body.videoUrl !== undefined
          ? req.body.videoUrl
          : existingProduct.videoUrl,

      variants: variantsWithImages,

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

    // ============================================
    // VALIDATION
    // ============================================

    const validatedData = updateProductSchema.parse(updateData);

    // ============================================
    // UPDATE PRODUCT
    // ============================================

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      validatedData,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const deleteProduct = await Product.findOneAndDelete(
      {
        _id: req.params.id,
      },
      { new: true },
    );

    if (!deleteProduct) {
      return next(new appError("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product deleted successfully",
      data: deleteProduct,
    });

    return;
  } catch (error) {
    next(error);
  }
};
