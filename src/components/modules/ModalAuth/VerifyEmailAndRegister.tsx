import InputForm from "@/components/common/InputForm";
import InputPasswordForm from "@/components/common/InputPasswordForm";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { TypographyAuth } from "@/components/ui/Typography";
import { TARGET_MODAL } from "@/libs/constants";
import { ETypeSnackbar, TypeModal } from "@/libs/enums";
import { fetchApi } from "@/libs/helpers/fetchApi";
import useSnackbar from "@/libs/hooks/useSnackbar";
import { callVerifyEmailAndRegister } from "@/libs/services/apis/auth";
import { sendOTPCodeRegister } from "@/libs/services/apis/mail";
import { useAppDispatch, useAppSelector } from "@/libs/store/hooks";
import {
  setBackModalAndModalConfirm,
  setModalAuth,
  setTitleAndEmail,
} from "@/libs/store/slices/modalAuthSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IVerifyEmailAndRegister {
  otpCode: string;
  password: string;
  passwordConfirm: string;
  username: string;
}

const schema = yup.object({
  username: yup.string().required("Username is required"),
  otpCode: yup.string().required("Code is required"),
  password: yup.string().required("Password is required"),
  passwordConfirm: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const VerifyEmailAndRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const targetModal = useAppSelector((state) => state.modalAuth);
  const dispatch = useAppDispatch();
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
      username: "",
    },
  });
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
      dispatch(setModalAuth(TARGET_MODAL.loginWithEmail));
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }
    setIsLoading(false);
  };

  const resendCode = async () => {
    setIsLoading(true);
    const email = targetModal.email as string;
    dispatch(setTitleAndEmail({ title: "Đang gửi lại code.", email }));
    const res = await fetchApi(() => sendOTPCodeRegister({ email }));

    if (res.data) {
      handleOpenSnackbar("Gửi lại code thành công", ETypeSnackbar.SUCCESS);
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }
    dispatch(setTitleAndEmail({ title: "Đang gửi lại code.", email }));
    setIsLoading(false);
  };

  const handleOpenModalConfirm = () => {
    dispatch(
      setBackModalAndModalConfirm({
        isOpenModalConfirm: true,
        backModal: TypeModal.sendOTPCodeRegister,
      })
    );
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
                  name="username"
                  render={({ field }) => (
                    <InputForm
                      size="small"
                      id="username"
                      label="Username"
                      helperText={errors.username?.message}
                      error={!!errors.username}
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

export default memo(VerifyEmailAndRegister);
