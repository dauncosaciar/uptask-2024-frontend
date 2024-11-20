import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Axios Request Interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem("UPTASK_2024_AUTH_TOKEN");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
