import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import {
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
  CreateOrderBody,
  UpdateOrderBody,
} from "../services/orders.service";

// GET /orders/internal/:userId
export const getOrders = async (
  req: Request<{ userId: string}>,
  res: Response
): Promise<void> => {
  try {

    const userId = req.params.userId;

    const orders = await getOrdersByUser(userId);

    res.status(200).json({ orders });

  } catch (error) {
    console.error("[getOrders]", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// POST /orders
export const createOrderHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const body = req.body as CreateOrderBody;

    const order = await createOrder(userId, body);

    res.status(201).json({ message: "Pedido creado exitosamente", order });
  } catch (error) {
    console.error("[createOrder]", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// PUT /orders/:id
export const updateOrderHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { id } = req.params as { id: string };
    const body = req.body as UpdateOrderBody;

    const order = await updateOrder(id, userId, body);

    res.status(200).json({ message: "Pedido actualizado", order });
  } catch (error) {
    const err = error as Error & { statusCode?: number };

    if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    console.error("[updateOrder]", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteOrderHandler = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { id } = req.params as { id: string };

    await deleteOrder(id, userId);

    res.status(200).json({ message: "Pedido eliminado" });
  } catch (error) {
    const err = error as Error & { statusCode?: number };

    if (err.statusCode) {
      res.status(err.statusCode).json({ message: err.message });
      return;
    }

    console.error("[deleteOrder]", err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
