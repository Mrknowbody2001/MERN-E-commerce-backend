import Order from "../models/Order.js";
import nodemailer from "nodemailer";

const pendingOrders = new Map(); // store verification data temporarily

export const createOrder = async (req, res) => {
  try {
    const { email, address, phone, items, totalPrice } = req.body;

    if (!email || !address || !phone || !items || items.length === 0)
      return res.status(400).json({ message: "All fields are required" });

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Store the order data in memory until confirmation
    pendingOrders.set(email, {
      code: verificationCode,
      orderData: { email, address, phone, items, totalPrice },
    });

    await sendVerificationEmail(email, verificationCode);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ New: Confirm Order Endpoint
export const confirmOrder = async (req, res) => {
  try {
    const { email, code } = req.body;

    const pending = pendingOrders.get(email);
    if (!pending) {
      return res.status(400).json({ message: "No pending order found" });
    }

    if (parseInt(code) !== pending.code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    // Save order to DB
    const newOrder = await Order.create(pending.orderData);

    // Remove from pending
    pendingOrders.delete(email);

    res.status(200).json({
      message: "Order confirmed and saved",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order confirmation failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const sendVerificationEmail = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <h2>Verify Your Order</h2>
    <p>Enter the following code on the verification page:</p>
    <h3>${code}</h3>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Order",
    html: htmlContent,
  });
};
