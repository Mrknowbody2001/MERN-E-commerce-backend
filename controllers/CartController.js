import Cart from "../models/Cart.js";

export const addToCart = async (req, res, next) => {
  try {
    const {
      productId,
      name,
      price,
      image,
      size,
      quantity = 1,
      userId = null, // guest users also supported
    } = req.body;

    if (!productId || !size) {
      return res.status(400).json({ message: "Product and size are required" });
    }

    // ✅ Make sure quantity is at least 1
    const qty = Math.max(1, Number(quantity));

    // Find or create a cart for this user (or guest)
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Find if item with same product + size already exists
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId.toString() && item.size === size
    );

    if (existingItem) {
      // ✅ Increase quantity if already exists
      existingItem.quantity += qty;
    } else {
      // ✅ Push new product to cart
      cart.items.push({
        productId,
        name,
        price,
        image,
        size,
        quantity: qty,
      });
    }

    await cart.save();

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    next(error); // ✅ Pass to error handler
  }
};

export const getCart = async (req, res) => {
  try {
    const { userId = null } = req.query;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { items: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { userId = null, productId, size, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.productId.toString() === productId && i.size === size
    );
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to update cart" });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { userId = null, productId, size } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (i) => !(i.productId.toString() === productId && i.size === size)
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Failed to remove item" });
  }
};
