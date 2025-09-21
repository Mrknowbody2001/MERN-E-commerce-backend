import express from "express";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/CartController.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart); // Add item
cartRouter.get("/", getCart); // Get all items
cartRouter.put("/", updateCartItem); // Update quantity
cartRouter.delete("/", removeCartItem); // Remove item

export default cartRouter;
