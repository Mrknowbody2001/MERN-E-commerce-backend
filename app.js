import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/UserRoutes.js";
import productRouter from "./routes/ProductRoute.js";
import cartRouter from "./routes/CartRouter.js";

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

//! error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

app.use("/api/user", userRoutes);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

//! Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

//! start server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
