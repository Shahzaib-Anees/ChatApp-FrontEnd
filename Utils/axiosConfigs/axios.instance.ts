import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AxiosRequestConfig, AxiosError } from "axios";
import CONFIGS from "../config/configs.app";

const production = false;
const environments = {
  development: {
    baseURL: CONFIGS.localServerBaseUrl,
  },
  production: {
    baseURL: CONFIGS.productionServerBaseUrl,
  },
};
const axiosInstance = axios.create({
  baseURL: production
    ? environments.production.baseURL
    : environments.development.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `${parsedToken?.token}`;
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
