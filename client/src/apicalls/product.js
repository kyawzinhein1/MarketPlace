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

// get all products
export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get old product
export const getOldProduct = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update product
export const updateProduct = async (payload) => {
  try {
    const response = await axiosInstance.post("/update-product", payload, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// upload product image
export const uploadImages = async (formData) => {
  try {
    const response = await axiosInstance.post("/upload", formData, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get saved product images
export const getSavedImages = async (id) => {
  try {
    const response = await axiosInstance.get(`/product-images/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete saved product images
export const deleteSavedImages = async (payload) => {
  try {
    const { productId, imgToDelete } = payload;

    const encodeImgToDelete = encodeURIComponent(imgToDelete);

    const response = await axiosInstance.delete(
      `/products/images/destroy/${productId}/${encodeImgToDelete}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

////////////////////// public //////////////////////
// get all categories
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/api/categories");
    return response.data;
  } catch (err) {
    return err.message;
  }
};
// get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/products");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get all products by filter
export const getProductsByFilter = async (key, value) => {
  try {
    const response = await axiosInstance.get(
      `/api/products/filters?${key}=${value}`
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
};

// get product by id
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// save product
export const savedProduct = async (id) => {
  try {
    const response = await axiosInstance.post(`/saved-products/${id}`, {
      validateStatus: () => true,
    });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// get saved products
export const getSavedProducts = async () => {
  try {
    const response = await axiosInstance.get(`/saved-products`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete saved product
export const deleteSavedProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/unsaved-products/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
