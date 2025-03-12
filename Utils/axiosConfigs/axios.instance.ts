import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AxiosRequestConfig, AxiosError } from "axios";
const axiosInstance = axios.create({
  baseURL: "https://chat-app-server-drab.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error?.response?.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

type AxiosQueryArgs = {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: any;
  params?: any;
};

const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }: AxiosQueryArgs) => {
    try {
      const result = await axiosInstance({
        url: url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return { error: axiosError?.response?.data || axiosError?.message };
    }
  };

export { axiosBaseQuery };
