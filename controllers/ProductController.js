import Product from "../models/Product.js";

//!create product
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, sizes } = req.body;

    if (!name || !description || !price || !image || !category || !sizes) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Validate sizes input (array of { size, quantity })
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res
        .status(400)
        .json({ message: "Sizes must be an array with at least one size" });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      sizes,
    });

    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
// GET /api/products?search=hoodie&category=Men&size=M&minPrice=20&maxPrice=50&page=1&limit=10

export const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      size,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) filter.category = category;

    if (size) {
      // ✅ Filter by size in sizes array
      filter["sizes.size"] = size;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [products, totalCount] = await Promise.all([
      Product.find(filter).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      total: totalCount,
      page: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

//! GET one product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//! delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
