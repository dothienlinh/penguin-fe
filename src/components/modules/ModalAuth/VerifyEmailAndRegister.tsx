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
import { callVerifyEmailAndRegister } from "@/libs/services/apis/auth";
import { sendOTPCodeRegister } from "@/libs/services/apis/mail";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IVerifyEmailAndRegister {
  otpCode: string;
  password: string;
  passwordConfirm: string;
  lastName: string;
  firstName: string;
}

const schema = yup.object({
  lastName: yup.string().required("Họ is required"),
  firstName: yup.string().required("Tên is required"),
  otpCode: yup.string().required("Code is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const VerifyEmailAndRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IVerifyEmailAndRegister>({
    resolver: yupResolver(schema),
    defaultValues: {
      otpCode: "",
      password: "",
      passwordConfirm: "",
      lastName: "",
      firstName: "",
    },
  });
  const { setTargetModal, targetModal } = useAuthModalContext();
  const { handleOpenSnackbar } = useSnackbar();

  const onSubmit = async (data: IVerifyEmailAndRegister) => {
    setIsLoading(true);
    const res = await fetchApi(() =>
      callVerifyEmailAndRegister({
        ...data,
        email: targetModal.email as string,
      })
    );

    if (res?.data) {
      handleOpenSnackbar("Đăng ký thành công", ETypeSnackbar.SUCCESS);
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
    const res = await fetchApi(() => sendOTPCodeRegister({ email }));

    if (res.data) {
      handleOpenSnackbar("Gửi lại code thành công", ETypeSnackbar.SUCCESS);
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }
    setTargetModal((prev) => ({
      ...prev,
      title: TARGET_MODAL.verifyEmailAndRegister.title,
      email,
    }));
    setIsLoading(false);
  };

  const handleOpenModalConfirm = () => {
    setTargetModal((prev) => ({
      ...prev,
      isOpenModalConfirm: true,
      backModal: TypeModal.sendOTPCodeRegister,
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
              Nhập địa thông tin tài khoản và mã code được gửi đến email của
              bạn.
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
                  name="lastName"
                  render={({ field }) => (
                    <InputForm
                      size="small"
                      id="lastName"
                      label="Họ"
                      helperText={errors.lastName?.message}
                      error={!!errors.lastName}
                      sx={{ width: 270 }}
                      {...field}
                    />
                  )}
                />
              </Box>
              <Box>
                <Controller
                  control={control}
                  name="firstName"
                  render={({ field }) => (
                    <InputForm
                      size="small"
                      id="firstName"
                      label="Tên"
                      helperText={errors.firstName?.message}
                      error={!!errors.firstName}
                      sx={{ width: 270 }}
                      {...field}
                    />
                  )}
                />
              </Box>
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
                  name="passwordConfirm"
                  render={({ field }) => (
                    <InputPasswordForm
                      size="small"
                      id="passwordConfirm"
                      label="Nhập lại mật khẩu"
                      helperText={errors.passwordConfirm?.message}
                      error={!!errors.passwordConfirm}
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

export default VerifyEmailAndRegister;
