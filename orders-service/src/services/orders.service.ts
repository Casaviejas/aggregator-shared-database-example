import { OrderModel } from "../models/order-model";

export interface CreateOrderBody {
  order_name: string;
  quantity: number;
}

export interface UpdateOrderBody {
  order_name?: string;
  quantity?: number;
}

// GET /orders — obtener todos los pedidos del usuario autenticado
export const getOrdersByUser = async (userId: string) => {
  const orders = await OrderModel.find({ userID: userId }).sort({
    createdAt: -1,
  });
  return orders;
};

// POST /orders — crear un nuevo pedido
export const createOrder = async (userId: string, data: CreateOrderBody) => {
  const order = await OrderModel.create({
    userID: userId,
    order_name: data.order_name.trim(),
    quantity: data.quantity,
  });

  return order;
};

// PUT /orders/:id — editar pedido solo si pertenece al usuario
export const updateOrder = async (
  orderId: string,
  userId: string,
  data: UpdateOrderBody,
) => {
  const order = await OrderModel.findOneAndUpdate(
    { _id: orderId, userID: userId },
    data,
    { new: true, runValidators: true },
  );

  if (!order) {
    const error = new Error("Pedido no encontrado o no autorizado") as Error & {
      statusCode: number;
    };

    error.statusCode = 404;
    throw error;
  }

  return order;
};

export const deleteOrder = async (orderId: string, userId: string) => {
  const order = await OrderModel.findOneAndDelete({
    _id: orderId,
    userID: userId,
  });

  if (!order) {
    const error = new Error("Pedido no encontrado o no autorizado") as Error & {
      statusCode: number;
    };

    error.statusCode = 404;
    throw error;
  }

  return order;
};
