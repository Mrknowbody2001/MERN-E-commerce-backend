import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  price: Number,
  image: String,
  size: String,
  quantity: { type: Number, default: 1 },
});

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, default: null }, // null if not logged in
    items: [CartItemSchema],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
