import Product from "../models/Product.js";
import { fixProductImages, fixProductsList } from "../utils/fixImages.js";

export const getProducts = async (req, res) => {
  try {
    const { category, search, brand, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;
    const query = {};

    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
      ];
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let sortOption = { createdAt: -1 };
    if (sort === "price-asc") sortOption = { price: 1 };
    if (sort === "price-desc") sortOption = { price: -1 };
    if (sort === "rating") sortOption = { rating: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query).sort(sortOption).skip(skip).limit(Number(limit));
    const total = await Product.countDocuments(query);

    res.json({ products: fixProductsList(products), total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(fixProductImages(product));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((f) => `/uploads/${f.filename}`);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : JSON.parse(req.body.images);
    }
    const product = await Product.create({ ...req.body, images });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true }).sort({ createdAt: -1 }).limit(10);
    res.json(fixProductsList(products));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ isTrending: true }).sort({ rating: -1 }).limit(10);
    res.json(fixProductsList(products));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.find({ isNewArrival: true }).sort({ createdAt: -1 }).limit(10);
    res.json(fixProductsList(products));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Product.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
