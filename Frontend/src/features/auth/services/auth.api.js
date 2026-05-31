import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const loginAPI = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const registerAPI = async (name, email, password) => {
  const response = await api.post("/auth/register", {
    username: name,
    email,
    password,
  });
  return response.data;
};

export const logoutAPI = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const getCurrentUserAPI = async () => {
  const response = await api.get("/auth/get-me");
  return response.data;
};

export default api;
