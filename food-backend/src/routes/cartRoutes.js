// routes/cartRoutes.js
import express from "express";
import { getCart, updateCart, deleteCart } from "../controllers/cartcontroller.js";

const router = express.Router();

router.get("/:userId", getCart);
router.put("/:userId", updateCart);   // <-- A: userId in params
router.delete("/:userId", deleteCart);

export default router;
