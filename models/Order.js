import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        size: String,
        quantity: Number,
      },
    ],
    totalPrice: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
