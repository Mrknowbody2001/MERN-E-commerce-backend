import mongoose from "mongoose";

const sizeQuantitySchema = new mongoose.Schema({
    size: {
        type: String,
        required: true,
    },
    quantity: { type: Number, required: true, min: 1 }, // 👈 add quantity per size

    
})

const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: String,
  price: Number,
  image: String,
  sizes:[sizeQuantitySchema],
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
