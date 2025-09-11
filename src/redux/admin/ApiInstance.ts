// src/redux/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-backend-z158.onrender.com/api || http://localhost:9999/api",
   // apna backend ka base URL
  withCredentials: true, // agar cookies/jwt bhejna hai
});

export default axiosInstance;
