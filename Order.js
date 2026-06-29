import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      phone: String,
    },
    totalPrice: { type: Number, required: true },
    paymentStatus: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Paid", "Failed"],
    },
    orderStatus: {
      type: String,
      default: "Placed",
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
