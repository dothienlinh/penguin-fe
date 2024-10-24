import axios from "axios";
import { Mutex } from "async-mutex";
import { API_URL, NO_RETRY_HEADER } from "../constants";
import { callRefreshToken } from "./apis/auth";
import { makeStore } from "../store";
import { clearProfile } from "../store/slices/profileSlice";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const mutex = new Mutex();

const handleRefreshToken = async (): Promise<string | null> => {
  return await mutex.runExclusive(async () => {
    const res = await callRefreshToken();
    if (res && res.data) return res.data.data.accessToken;
    else return null;
  });
};

axiosInstance.interceptors.request.use(function (config) {
  if (
    typeof window !== "undefined" &&
    window &&
    window.localStorage &&
    window.localStorage.getItem("accessToken")
  ) {
    config.headers.Authorization =
      "Bearer " + window.localStorage.getItem("accessToken");
  }
  if (!config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error.config &&
      error.response &&
      +error.response.status === 401 &&
      !error.config.headers[NO_RETRY_HEADER]
    ) {
      const accessToken = await handleRefreshToken();
      error.config.headers[NO_RETRY_HEADER] = "true";

      if (accessToken) {
        error.config.headers["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem("accessToken", accessToken);
        return await axiosInstance.request(error.config);
      }
    }

    if (
      error.config &&
      error.response &&
      +error.response.status === 400 &&
      error.config.url === "/auth/refresh-token" &&
      location.pathname.startsWith("/admin")
    ) {
      const message =
        error?.response?.data?.message ?? "Có lỗi xảy ra, vui lòng login.";

      makeStore().dispatch(clearProfile(message));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
