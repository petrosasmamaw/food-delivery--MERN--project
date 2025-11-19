import express from "express";
import { getCart, updateCart, deleteCart } from "../controllers/cartcontroller.js";

const router = express.Router();

router.get("/:userId", getCart);
router.put("/", updateCart);
router.delete("/:userId", deleteCart);

export default router; 
 