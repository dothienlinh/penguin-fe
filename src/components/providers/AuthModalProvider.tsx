"use client";

import { TypeModal } from "@/libs/enums";
import { IProviderProps } from "@/libs/interfaces";
import { FC, useState } from "react";
import AuthModalContext, { TargetModal } from "../contexts/AuthModalContext";
import ContentModuleLogin from "../modules/ModalAuth/ContentModuleLogin";
import ContentModuleRegister from "../modules/ModalAuth/ContentModuleRegister";
import LoginWithEmail from "../modules/ModalAuth/LoginWithEmail";
import RegisterWithEmail from "../modules/ModalAuth/RegisterWithEmail";
import VerifyEmailAndRegister from "../modules/ModalAuth/VerifyEmailAndRegister";
import ForgotPassword from "../modules/ModalAuth/ForgotPassword";
import VerifyEmailAndResetPassword from "../modules/ModalAuth/VerifyEmailAndResetPassword";

export const TARGET_MODAL: Record<TypeModal, TargetModal> = {
  login: {
    type: TypeModal.login,
    component: <ContentModuleLogin />,
    title: "Chào mừng trở lại.",
    textFooter:
      'Nhấp vào "Đăng nhập" để đồng ý với Điều khoản dịch vụ của Penguin và xác nhận rằng Chính sách quyền riêng tư của Penguin áp dụng cho bạn.',
  },
  register: {
    type: TypeModal.register,
    component: <ContentModuleRegister />,
    title: "Tham gia Penguin.",
    textFooter:
      'Nhấp vào "Đăng ký" để đồng ý với Điều khoản dịch vụ của Penguin và xác nhận rằng Chính sách quyền riêng tư của Penguin áp dụng cho bạn.',
  },
  sendOTPCodeRegister: {
    type: TypeModal.sendOTPCodeRegister,
    title: "Đăng ký bằng email",
    component: <RegisterWithEmail />,
    textFooter: "Nhấp vào 'Tiếp tục' để tiếp tục đăng ký với email của bạn.",
  },
  loginWithEmail: {
    type: TypeModal.loginWithEmail,
    component: <LoginWithEmail />,
    title: "Đăng nhập bằng email",
  },
  verifyEmailAndRegister: {
    type: TypeModal.verifyEmailAndRegister,
    component: <VerifyEmailAndRegister />,
    title: "Xác thực email và đăng ký tài khoản.",
  },
  forgotPassword: {
    type: TypeModal.forgotPassword,
    component: <ForgotPassword />,
    title: "Quên mật khẩu?",
  },
  verifyEmailAndResetPassword: {
    type: TypeModal.verifyEmailAndResetPassword,
    component: <VerifyEmailAndResetPassword />,
    title: "Xác thực email và đặt lại mật khẩu.",
  },
};

const AuthModalProvider: FC<IProviderProps> = ({ children }) => {
  const [targetModal, setTargetModal] = useState<TargetModal>(
    TARGET_MODAL.login
  );

  return (
    <AuthModalContext.Provider value={{ targetModal, setTargetModal }}>
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;
