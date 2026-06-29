import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import { resolveProductImage, PRODUCT_IMAGES } from "./data/productImages.js";

dotenv.config();

const migrateImages = async () => {
  try {
    await connectDB();
    const products = await Product.find({});
    let updated = 0;

    for (const product of products) {
      const current = product.images?.[0] || "";
      const resolved = resolveProductImage(current, product.name, product.category);
      const named = PRODUCT_IMAGES[product.name];

      if (named && current !== named) {
        product.images = [named];
        await product.save();
        updated++;
        console.log(`Updated: ${product.name}`);
      } else if (
        !current ||
        current.includes("fakestoreapi.com") ||
        current.includes("placehold.co")
      ) {
        product.images = [resolved];
        await product.save();
        updated++;
        console.log(`Fixed: ${product.name}`);
      }
    }

    console.log(`\nDone — ${updated} of ${products.length} products updated.`);
    process.exit(0);
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  }
};

migrateImages();
