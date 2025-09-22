import express from "express";
import { confirmOrder, createOrder } from "../controllers/OrderController.js";

const orderRouter = express.Router();

orderRouter.post("/create", createOrder);
orderRouter.post("/confirm", confirmOrder);

export default orderRouter;