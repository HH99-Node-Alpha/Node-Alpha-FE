import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;

axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async (response) => {
    if (response.data && response.data.newAccessToken) {
      Cookies.set("accessToken", response.data.newAccessToken);
      const originalRequest = response.config;
      originalRequest.headers["Authorization"] = response.data.newAccessToken;
      return await axios(originalRequest);
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
    }
    return Promise.reject(error);
  }
);

export const postAPI = <T = any, R = any>(
  url: string,
  data: T
): Promise<AxiosResponse<R>> => {
  return axios.post<R>(API_BASE_URL + url, data);
};

export const putAPI = <T = any, R = any>(
  url: string,
  data: T
): Promise<AxiosResponse<R>> => {
  return axios.put<R>(API_BASE_URL + url, data);
};

export const getAPI = <R = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<R>> => {
  return axios.get<R>(API_BASE_URL + url, config);
};

export const deleteAPI = <R = any>(url: string): Promise<AxiosResponse<R>> => {
  return axios.delete<R>(API_BASE_URL + url);
};

export const patchAPI = <T = any, R = any>(
  url: string,
  data: T
): Promise<AxiosResponse<R>> => {
  return axios.patch<R>(API_BASE_URL + url, data);
};
