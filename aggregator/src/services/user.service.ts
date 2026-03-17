import axios from "axios";

const USER_SERVICE_URL = "http://localhost:3001";

export const getUserById = async (userId: string) => {

  const response = await axios.get(
    `${USER_SERVICE_URL}/users/${userId}`
  );

  return response.data;
};