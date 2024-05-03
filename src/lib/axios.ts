import Axios from "axios";
import { API_URL } from "@/config";

export const axios = Axios.create({
  baseURL: API_URL,
});

export const setupAxiosInterceptors = (token: unknown) => {
  axios.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
