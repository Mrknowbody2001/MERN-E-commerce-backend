import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L", "XL", "28", "30", "32", "34"],
    required: true,
  },
  quantity: { type: Number, required: true, min: 0 }, // 👈 add quantity per size
});

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: {
      type: String,
      enum: ["Men", "Women", "Kids"],
      required: true,
    },
    sizes: [SizeSchema], // 👈 now stores array of { size, quantity }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
