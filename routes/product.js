import express from "express";
import {
  addProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  updateProductById,
} from "../controllers/product.js";

const router = express.Router();

// add product route
//@api- /api/product/add
router.post("/add", addProduct);

// get all products route
//@api- /api/product/all
router.get("/all", getAllProducts);

// get product by id route
//@api- /api/product/get/:id
router.get("/:id", getProductById);

// update product by id route
router.put("/:id", updateProductById);


// delete product by id route
router.delete("/:id", deleteProductById);

export default router;
