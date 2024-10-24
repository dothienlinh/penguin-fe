import { IBackendRes } from "@/libs/interfaces";
import axiosInstance from "../axiosInstance";

interface SendOTPCodeRegisterProps {
  email: string;
}

type SendOTPCodeForgotPasswordProps = SendOTPCodeRegisterProps;

export const sendOTPCodeRegister = async (data: SendOTPCodeRegisterProps) => {
  return await axiosInstance.post<IBackendRes<boolean>>(
    "/mail/send-otp-code-register",
    data
  );
};

export const sendOTPCodeForgotPassword = async (
  data: SendOTPCodeForgotPasswordProps
) => {
  return await axiosInstance.post<IBackendRes<boolean>>(
    "/mail/send-forgot-password",
    data
  );
};
