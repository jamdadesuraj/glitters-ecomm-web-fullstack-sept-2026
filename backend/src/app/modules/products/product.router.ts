import express from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getAllProductsById,
  updateProduct,
} from "./product.controller";

import { upload } from "../../config/cloudinary";

const router = express.Router();

// ============================================
// PRODUCT UPLOAD FIELDS
// ============================================

const uploadFields = upload.fields([
  { name: "productImages", maxCount: 10 },
  { name: "variantImages", maxCount: 50 },
]);

// ============================================
// CREATE PRODUCT
// ============================================

router.post("/", uploadFields, createProduct);

// ============================================
// GET ALL PRODUCTS
// ============================================

router.get("/", getAllProducts);

// ============================================
// GET SINGLE PRODUCT
// ============================================

router.get("/:id", getAllProductsById);

// ============================================
// UPDATE PRODUCT
// ============================================

router.put("/:id", uploadFields, updateProduct);

// ============================================
// DELETE PRODUCT
// ============================================

router.delete("/:id", deleteProduct);

export const productRouter = router;
