import express from "express";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🛒 AGREGAR AL CARRITO
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [],
      total: 0,
    });
  }

  const product = await Product.findById(productId);

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId,
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;

    // ❌ SI QUEDA EN 0 O MENOS → ELIMINAR
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }
  } else {
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  // 🔥 RECALCULAR TOTAL
  await cart.populate("items.product");

  cart.total = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  await cart.save();

  res.json(cart);
});

// 👀 VER CARRITO
router.get("/", protect, async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product",
  );

  // 🔥 SI NO EXISTE, CREARLO
  if (!cart) {
    cart = await Cart.create({
      user: req.user._id,
      items: [],
      total: 0,
    });
  }

  res.json(cart);
});

// ❌ ELIMINAR PRODUCTO DEL CARRITO
router.delete("/", protect, async (req, res) => {
  const { productId } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.populate("items.product");

  cart.total = cart.items.reduce(
    (acc, item) => acc + item.quantity * item.product.price,
    0,
  );

  await cart.save();

  res.json(cart);
});

export default router;
