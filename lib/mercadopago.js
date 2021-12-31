import axios from "axios";

export const createPreference = async (order) => {
  const response = await axios.post("/api/mercadopago/create_payment", order);
  return response;
};
