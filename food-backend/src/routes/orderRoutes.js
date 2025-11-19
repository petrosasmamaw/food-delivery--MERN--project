import express from "express";
import { getOrders, createOrder, updateOrderStatus } from "../controllers/ordercontroller.js";

const router = express.Router();

router.get("/:userId", getOrders);
router.post("/", createOrder); // body: { userId, items, totalAmount }
router.put("/:id", updateOrderStatus); // body: { status }

export default router;
