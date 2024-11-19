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

// make noti as read
export const makeRead = async (id) => {
  try {
    const response = await axiosInstance.get(`/notifications-read/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete noti
export const deleteNoti = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notification-delete/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
