import { IBackendRes } from "@/libs/interfaces";
import axiosInstance, { API_URL } from "../axiosInstance";
import { IUser } from "@/libs/store/slices/profileSlice";

export interface AccessTokenResponse {
  accessToken: string;
}

export interface IRegisterParams {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  address: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IBodyVerifyEmailAndRegister {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  otpCode: string;
}

export interface IBodyVerifyEmailAndResetPassword
  extends Omit<
    IBodyVerifyEmailAndRegister,
    "lastName" | "firstName" | "passwordConfirm"
  > {
  confirmPassword: string;
}

export const callRegister = (params: IRegisterParams) => {
  return axiosInstance.post<IBackendRes<IUser>>("/auth/register", params);
};

export const callLoginWithEmail = (body: ILoginBody) => {
  return axiosInstance.post<IBackendRes<AccessTokenResponse>>(
    "/auth/login",
    body
  );
};

export const callLoginGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const callLoginFacebook = () => {
  window.location.href = `${API_URL}/auth/facebook`;
};

export const callGetProfile = () => {
  return axiosInstance.get<IBackendRes<IUser>>("/auth/profile");
};

export const callRefreshToken = () => {
  return axiosInstance.post<IBackendRes<AccessTokenResponse>>(
    "/auth/refresh-token"
  );
};

export const callLogout = () => {
  return axiosInstance.post<IBackendRes<string>>("/auth/logout");
};

export const callVerifyEmailAndRegister = (
  body: IBodyVerifyEmailAndRegister
) => {
  return axiosInstance.post<IBackendRes<string>>("/auth/signup", body);
};

export const callVerifyEmailAndResetPassword = (
  body: IBodyVerifyEmailAndResetPassword
) => {
  return axiosInstance.post<IBackendRes<string>>("/auth/forgot-password", body);
};
