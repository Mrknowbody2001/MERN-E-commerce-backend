import express from "express";
import products from "../data/ProductData.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/ProductController.js";

const productRouter = express.Router();

//! Create a new product
productRouter.post("/create", createProduct);
// Get all products
// productRouter.get("/all", (req, res) => {
//   res.json(products);
// });
//!get all products
productRouter.get("/", getProducts);
//!get product by id
productRouter.get("/:id", getProductById);

//!delete product by id
productRouter.delete("/delete/:id", deleteProduct);

// Get single product by ID
// productRouter.get("/:id", (req, res) => {
//   const product = products.find((p) => p.id === Number(req.params.id));
//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }
//   res.json(product);
// });

export default productRouter;
