import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import { resolveProductImage } from "../data/productImages.js";

function fixOrderImages(order) {
  if (!order) return order;
  const obj = order.toObject ? order.toObject() : { ...order };
  if (Array.isArray(obj.products)) {
    obj.products = obj.products.map((item) => ({
      ...item,
      image: resolveProductImage(item.image, item.name, ""),
    }));
  }
  return obj;
}

export const createOrder = async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    let totalPrice = 0;
    const orderProducts = [];

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
      orderProducts.push({
        product: product._id,
        name: product.name,
        image: resolveProductImage(product.images[0] || "", product.name, product.category),
        price: product.price,
        quantity: item.quantity,
      });
      totalPrice += product.price * item.quantity;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      shippingAddress,
      totalPrice,
    });

    const cart = await Cart.findOne({ user: req.user._id });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const buyNow = async (req, res) => {
  try {
    const { productId, quantity = 1, shippingAddress } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    const totalPrice = product.price * quantity;
    product.stock -= quantity;
    await product.save();

    const order = await Order.create({
      user: req.user._id,
      products: [
        {
          product: product._id,
          name: product.name,
          image: resolveProductImage(product.images[0] || "", product.name, product.category),
          price: product.price,
          quantity,
        },
      ],
      shippingAddress,
      totalPrice,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders.map(fixOrderImages));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders.map(fixOrderImages));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.orderStatus = req.body.orderStatus || order.orderStatus;
    order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const User = (await import("../models/User.js")).default;
    const Product = (await import("../models/Product.js")).default;

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const orders = await Order.find({ paymentStatus: "Paid" });
    const revenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
    const recentOrders = await Order.find({}).populate("user", "name email").sort({ createdAt: -1 }).limit(5);

    res.json({ totalUsers, totalProducts, totalOrders, revenue, recentOrders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
