import { Router } from "express";
import {
  getOrders,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
} from "../controllers/orders.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  validateCreateOrder,
  validateUpdateOrder,
} from "../middlewares/orders.middleware";

const router = Router();

router.get("/internal/:userId", getOrders);

router.post("/", authMiddleware, validateCreateOrder, createOrderHandler);
router.put("/:id", authMiddleware, validateUpdateOrder, updateOrderHandler);
router.delete("/:id", authMiddleware, deleteOrderHandler);

export default router;
