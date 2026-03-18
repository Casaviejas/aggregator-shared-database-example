import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserById } from "../services/user.service";
import { getOrdersByUser } from "../services/order.services";

export const getProfile = async (req: AuthRequest, res: Response) => {

  try {

    const userId = req.user!.id;


    const user = await getUserById(userId);


    let orders = [];

    try {
      orders = await getOrdersByUser(userId);
    } catch (error) {
      console.warn("Order service failed:", (error as Error).message);

    }

    res.json({
      user,
      orders,
      warnings: orders.length === 0 ? ["Orders no disponibles"] : []
    });

  } catch (error) {
    res.status(500).json({ message: "Error obteniendo perfil" });
  }


};