import { axiosInstance } from "./axiosInstance";

// sell product
export const SellProduct = async (payload) => {
    try {
        const response = await axiosInstance.post("/create-product", payload, {
            validateStatus: () => true,
        });
        return response.data;
    } catch (error) {
        return error.message;
    }
};
