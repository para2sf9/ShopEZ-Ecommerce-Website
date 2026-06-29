import express from "express";
import {
  createOrder,
  buyNow,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.post("/buy-now", protect, buyNow);
router.get("/my-orders", protect, getMyOrders);
router.get("/dashboard", protect, admin, getDashboardStats);
router.get("/all", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
