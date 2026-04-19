import express from "express";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 💳 CHECKOUT
router.post("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Carrito vacío" });
    }

    // 💰 calcular total
    const total = cart.items.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    const order = new Order({
      user: req.user._id,
      items: cart.items,
      total,
    });

    const createdOrder = await order.save();

    // 🧹 vaciar carrito
    cart.items = [];
    await cart.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product",
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
