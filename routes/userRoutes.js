import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ REGISTER
router.post("/register", async (req, res) => {
  console.log("🔥 LLEGÓ AL REGISTER");
  console.log("📦 BODY:", req.body);

  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await user.save();

    res.status(201).json(createdUser);
  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: jwt.sign({ id: user._id }, "secret123"),
      });
    } else {
      res.status(401).json({ message: "Credenciales inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
