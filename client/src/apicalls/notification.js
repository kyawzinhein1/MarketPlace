import { axiosInstance } from "./axiosInstance";

// add new notification
export const notify = async (payload) => {
  try {
    const response = await axiosInstance.post("/notify", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all notification
export const getAllNoti = async () => {
  try {
    const response = await axiosInstance.get(`/notifications`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
