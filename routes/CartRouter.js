import express from "express";
import {
  addToCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../controllers/CartController.js";

const cartRouter = express.Router();

cartRouter.post("/create", addToCart); // Add item
cartRouter.get("/", getCart); // Get all items
cartRouter.put("/update", updateCartItem); // Update quantity
cartRouter.delete("/delete", removeCartItem); // Remove item

export default cartRouter;
