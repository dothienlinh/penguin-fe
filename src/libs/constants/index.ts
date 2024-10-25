import ContentModuleLogin from "@/components/modules/ModalAuth/ContentModuleLogin";
import ContentModuleRegister from "@/components/modules/ModalAuth/ContentModuleRegister";
import ForgotPassword from "@/components/modules/ModalAuth/ForgotPassword";
import LoginWithEmail from "@/components/modules/ModalAuth/LoginWithEmail";
import RegisterWithEmail from "@/components/modules/ModalAuth/RegisterWithEmail";
import VerifyEmailAndRegister from "@/components/modules/ModalAuth/VerifyEmailAndRegister";
import VerifyEmailAndResetPassword from "@/components/modules/ModalAuth/VerifyEmailAndResetPassword";
import { TypeModal } from "../enums";
import { IModalAuth } from "../store/slices/modalAuthSlice";

export const TARGET_MODAL: Record<
  TypeModal,
  Omit<IModalAuth, "component"> & { componentKey: string }
> = {
  login: {
    type: TypeModal.login,
    componentKey: "ContentModuleLogin",
    title: "Chào mừng trở lại.",
    textFooter:
      'Nhấp vào "Đăng nhập" để đồng ý với Điều khoản dịch vụ của Penguin và xác nhận rằng Chính sách quyền riêng tư của Penguin áp dụng cho bạn.',
    isOpenModal: true,
  },
  register: {
    type: TypeModal.register,
    componentKey: "ContentModuleRegister",
    title: "Tham gia Penguin.",
    textFooter:
      'Nhấp vào "Đăng ký" để đồng ý với Điều khoản dịch vụ của Penguin và xác nhận rằng Chính sách quyền riêng tư của Penguin áp dụng cho bạn.',
    isOpenModal: true,
  },
  sendOTPCodeRegister: {
    type: TypeModal.sendOTPCodeRegister,
    title: "Đăng ký bằng email",
    componentKey: "RegisterWithEmail",
    textFooter: "Nhấp vào 'Tiếp tục' để tiếp tục đăng ký với email của bạn.",
    isOpenModal: true,
  },
  loginWithEmail: {
    type: TypeModal.loginWithEmail,
    componentKey: "LoginWithEmail",
    title: "Đăng nhập bằng email",
    isOpenModal: true,
  },
  verifyEmailAndRegister: {
    type: TypeModal.verifyEmailAndRegister,
    componentKey: "VerifyEmailAndRegister",
    title: "Xác thực email và đăng ký tài khoản.",
    isOpenModal: true,
  },
  forgotPassword: {
    type: TypeModal.forgotPassword,
    componentKey: "ForgotPassword",
    title: "Quên mật khẩu?",
    isOpenModal: true,
  },
  verifyEmailAndResetPassword: {
    type: TypeModal.verifyEmailAndResetPassword,
    componentKey: "VerifyEmailAndResetPassword",
    title: "Xác thực email và đặt lại mật khẩu.",
    isOpenModal: true,
  },
};

export const COMPONENT_MAP = {
  ContentModuleLogin,
  ContentModuleRegister,
  ForgotPassword,
  LoginWithEmail,
  RegisterWithEmail,
  VerifyEmailAndRegister,
  VerifyEmailAndResetPassword,
};
