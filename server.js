import express from "express";
import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});

app.get("/api/products", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Laptop",
      price: 1200,
    },
    {
      id: 2,
      name: "Mouse",
      price: 25,
    },
  ]);
});
