import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Fashion", "Groceries", "Beauty", "Home", "Sports"],
    },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
