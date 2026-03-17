import axios from "axios";

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

export const getUserById = async (userId: string) => {

  const response = await axios.get(
    `${USER_SERVICE_URL}/users/internal/${userId}`
  );

  return response.data;
};