import axios from "axios";

const ORDER_SERVICE_URL = process.env.ORDERS_SERVICE_URL;

export const getOrdersByUser = async (userId: string) => {

  const response = await axios.get(
    `${ORDER_SERVICE_URL}/orders/internal/${userId}`
  );

  return response.data;
};