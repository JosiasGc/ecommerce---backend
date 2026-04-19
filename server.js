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

app.listen(5000, () => {
  console.log("Servidor corriendo en puerto 5000");
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
