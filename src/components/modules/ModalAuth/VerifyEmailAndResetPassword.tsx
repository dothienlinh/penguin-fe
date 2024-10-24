"use client";

import InputForm from "@/components/common/InputForm";
import InputPasswordForm from "@/components/common/InputPasswordForm";
import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { TypographyAuth } from "@/components/ui/Typography";
import { ETypeSnackbar, TypeModal } from "@/libs/enums";
import { fetchApi } from "@/libs/helpers/fetchApi";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import useSnackbar from "@/libs/hooks/useSnackbar";
import { callVerifyEmailAndResetPassword } from "@/libs/services/apis/auth";
import { sendOTPCodeForgotPassword } from "@/libs/services/apis/mail";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IVerifyEmailAndResetPassword {
  password: string;
  confirmPassword: string;
  otpCode: string;
}

const schema = yup.object({
  password: yup.string().required("Mật khẩu không được để trống"),
  confirmPassword: yup.string().required("Mật khẩu không được để trống"),
  otpCode: yup.string().required("Mã code không được để trống"),
});

const VerifyEmailAndResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { targetModal, setTargetModal } = useAuthModalContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IVerifyEmailAndResetPassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      otpCode: "",
    },
  });
  const { handleOpenSnackbar } = useSnackbar();

  const onSubmit = async (data: IVerifyEmailAndResetPassword) => {
    setIsLoading(true);
    const { email } = targetModal;
    if (!email) return;

    const res = await fetchApi(() =>
      callVerifyEmailAndResetPassword({ ...data, email })
    );

    if (res.data) {
      setTargetModal(TARGET_MODAL.loginWithEmail);
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }

    setIsLoading(false);
  };

  const resendCode = async () => {
    setIsLoading(true);
    const email = targetModal.email as string;
    setTargetModal((prev) => ({
      ...prev,
      title: "Đang gửi lại code.",
      email,
    }));
    const res = await fetchApi(() => sendOTPCodeForgotPassword({ email }));

    if (res.data) {
      handleOpenSnackbar("Gửi lại code thành công", ETypeSnackbar.SUCCESS);
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }
    setTargetModal((prev) => ({
      ...prev,
      title: TARGET_MODAL.verifyEmailAndResetPassword.title,
      email,
    }));
    setIsLoading(false);
  };

  const handleOpenModalConfirm = () => {
    setTargetModal((prev) => ({
      ...prev,
      isOpenModalConfirm: true,
      backModal: TypeModal.forgotPassword,
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box sx={{ mt: -8 }}>
          <Box>
            <Typography
              sx={{
                fontSize: 14,
                color: "text.secondary",
                textAlign: "center",
                justifyContent: "center",
                px: 10,
              }}
            >
              Nhập mật khẩu mới và nhập lại mật khẩu để đặt lại mật khẩu.
            </Typography>
            <Box
              onSubmit={handleSubmit(onSubmit)}
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box>
                <Controller
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <InputPasswordForm
                      size="small"
                      id="password"
                      label="Mật khẩu"
                      helperText={errors.password?.message}
                      error={!!errors.password}
                      sx={{ width: 270 }}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <InputPasswordForm
                      size="small"
                      id="passwordConfirm"
                      label="Nhập lại mật khẩu"
                      helperText={errors.confirmPassword?.message}
                      error={!!errors.confirmPassword}
                      sx={{ width: 270 }}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  control={control}
                  name="otpCode"
                  render={({ field }) => (
                    <InputForm
                      label={"Code"}
                      id="otpCode"
                      size="small"
                      helperText={errors.otpCode?.message}
                      error={!!errors.otpCode}
                      sx={{ width: 270 }}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Button type="submit" sx={{ textTransform: "none", width: 200 }}>
                Đăng ký
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: 270,
              justifyContent: "space-between",
              alignItems: "center",
              mt: 5,
              mx: "auto",
            }}
          >
            <TypographyAuth component={"span"} onClick={handleOpenModalConfirm}>
              <ArrowBackIosIcon sx={{ color: "#1a8917", fontSize: 14 }} />
              Quay lại
            </TypographyAuth>

            <TypographyAuth sx={{}} component={"span"} onClick={resendCode}>
              Gửi lại code
            </TypographyAuth>
          </Box>
        </Box>
      )}
    </>
  );
};

export default VerifyEmailAndResetPassword;