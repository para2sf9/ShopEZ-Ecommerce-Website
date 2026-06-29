import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  getAllUsers,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/users", protect, admin, getAllUsers);

export default router;
