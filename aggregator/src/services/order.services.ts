import axios from "axios";

const ORDER_SERVICE_URL = "http://localhost:3002";

export const getOrdersByUser = async (userId: string) => {

  const response = await axios.get(
    `${ORDER_SERVICE_URL}/orders/user/${userId}`
  );

  return response.data;
};