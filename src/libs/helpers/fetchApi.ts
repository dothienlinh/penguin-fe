import { AxiosError, AxiosResponse } from "axios";
import { IBackendRes } from "../interfaces";

export const fetchApi = async <T>(
  callApi: () => Promise<AxiosResponse<IBackendRes<T>>>
) => {
  try {
    const res = await callApi();

    if (!res?.data) {
    }

    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status,
        message: error.response?.data.message,
        data: null,
      };
    }

    return {
      status: 500,
      message: "Internal server error",
      data: null,
    };
  }
};
