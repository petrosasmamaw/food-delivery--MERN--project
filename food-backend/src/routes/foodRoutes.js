import express from "express";
import {
  getFoods,
  getFoodsByCategory,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
} from "../controllers/foodController.js";

import upload from "../middleware/upload.js"; // ✅ singular, matches folder name

const router = express.Router();

router.get("/", getFoods);
router.get("/category/:category", getFoodsByCategory);
router.get("/:id", getFoodById);

router.post("/", upload.single("image"), createFood);
router.put("/:id", upload.single("image"), updateFood);
router.delete("/:id", deleteFood);

export default router;
