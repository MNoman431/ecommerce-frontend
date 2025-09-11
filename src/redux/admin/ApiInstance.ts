import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:9999/api"
      : "https://ecommerce-backend-z158.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
