import express from "express";
import { confirmOrder, createOrder } from "../controllers/OrderController.js";
import { IsAuth } from "../middleware/Auth.js";

const orderRouter = express.Router();

orderRouter.post("/create",IsAuth, createOrder);//protected route
orderRouter.post("/confirm",IsAuth, confirmOrder);//protected route 

export default orderRouter;