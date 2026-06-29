import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { fixCartResponse } from "../utils/fixImages.js";

export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(fixCartResponse(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find((item) => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    cart = await Cart.findById(cart._id).populate("items.product");
    res.json(fixCartResponse(cart));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const updated = await Cart.findById(cart._id).populate("items.product");
    res.json(fixCartResponse(updated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    const updated = await Cart.findById(cart._id).populate("items.product");
    res.json(fixCartResponse(updated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
