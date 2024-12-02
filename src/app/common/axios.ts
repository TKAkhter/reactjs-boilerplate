import axios from "axios";
import { getTokenFromCookie, getUserFromCookie } from "./cookie";

const axiosClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PATH}`, // Backend URL from environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = getTokenFromCookie();
  const user = getUserFromCookie();
  console.log("🚀 ~ axiosClient.interceptors.request.use ~ user:", user);
  console.log("🚀 ~ axiosClient.interceptors.request.use ~ token:", token);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
