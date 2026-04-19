import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [cartItemSchema],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
