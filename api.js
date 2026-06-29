import axios from "axios";

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("shopezUser") || "null");
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  getProfile: () => API.get("/auth/profile"),
  updateProfile: (data) => API.put("/auth/profile", data),
};

export const productAPI = {
  getAll: (params) => API.get("/products", { params }),
  getById: (id) => API.get(`/products/${id}`),
  getFeatured: () => API.get("/products/featured"),
  getTrending: () => API.get("/products/trending"),
  getNewArrivals: () => API.get("/products/new-arrivals"),
  getCategories: () => API.get("/products/categories"),
  create: (data) => API.post("/products", data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

export const cartAPI = {
  get: () => API.get("/cart"),
  add: (data) => API.post("/cart/add", data),
  update: (data) => API.put("/cart/update", data),
  remove: (productId) => API.delete(`/cart/remove/${productId}`),
  clear: () => API.delete("/cart/clear"),
};

export const orderAPI = {
  create: (data) => API.post("/orders", data),
  buyNow: (data) => API.post("/orders/buy-now", data),
  getMyOrders: () => API.get("/orders/my-orders"),
  getById: (id) => API.get(`/orders/${id}`),
  getAll: () => API.get("/orders/all"),
  updateStatus: (id, data) => API.put(`/orders/${id}/status`, data),
  getDashboard: () => API.get("/orders/dashboard"),
};

export default API;
