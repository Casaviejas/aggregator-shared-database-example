import axios from "axios";

const URL = process.env.USER_SERVICE_URL;
console.log("url cargada desde el env" , URL)

export const getUserById = async (userId: string) => {

  const response = await axios.get(
    `${URL}/profile/internal/${userId}`
  );

  return response.data;
};