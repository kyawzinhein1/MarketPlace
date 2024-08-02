import { axiosInstance } from "./axiosInstance";

// get all products
export const getAllProducts = async (payload) => {
  try {
    const response = await axiosInstance.get("/admin/products", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};
