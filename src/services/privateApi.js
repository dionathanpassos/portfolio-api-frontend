import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const URL = 'http://localhost:8080/api/v1'


export const privateApi = axios.create({
    baseURL: URL

});

privateApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

privateApi.interceptors.response.use(
  (reponse) => reponse,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      const message =
        error.response.data?.message ?? "Sua sessão expirou. Faça login novamente.";

      sessionStorage.setItem("auth-message", message);

      
      window.location.href = "/auth";
    }
    return Promise.reject(error);
  },
);
