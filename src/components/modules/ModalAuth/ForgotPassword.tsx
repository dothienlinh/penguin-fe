import InputForm from "@/components/common/InputForm";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { TypographyAuth } from "@/components/ui/Typography";
import { TARGET_MODAL } from "@/libs/constants";
import { ETypeSnackbar } from "@/libs/enums";
import { fetchApi } from "@/libs/helpers/fetchApi";
import useSnackbar from "@/libs/hooks/useSnackbar";
import { sendOTPCodeForgotPassword } from "@/libs/services/apis/mail";
import { useAppDispatch } from "@/libs/store/hooks";
import { setEmail, setModalAuth } from "@/libs/store/slices/modalAuthSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface IForgotPassword {
  email: string;
}

const schema = yup.object({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
});

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IForgotPassword>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
    },
  });
  const { handleOpenSnackbar } = useSnackbar();

  const onSubmit = async (data: IForgotPassword) => {
    dispatch(setEmail(data.email));
    setIsLoading(true);
    const res = await fetchApi(() => sendOTPCodeForgotPassword(data));

    if (res?.data) {
      dispatch(
        setModalAuth({
          ...TARGET_MODAL.verifyEmailAndResetPassword,
          email: data.email,
        })
      );
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 5,
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
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
                Nhập địa chỉ email được liên kết với tài khoản của bạn và chúng
                tôi sẽ gửi một mã code đến hộp thư đến của bạn
              </Typography>
              <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Box>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <InputForm
                        id="email"
                        label="Email của bạn"
                        size="small"
                        helperText={errors.email?.message}
                        error={!!errors.email}
                        sx={{ width: 270 }}
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{ textTransform: "none", width: 200 }}
                >
                  Tiếp tục
                </Button>
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TypographyAuth
                component={"span"}
                onClick={() =>
                  dispatch(setModalAuth(TARGET_MODAL.loginWithEmail))
                }
              >
                <ArrowBackIosIcon sx={{ color: "#1a8917", fontSize: 14 }} />
                Quay lại
              </TypographyAuth>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default memo(ForgotPassword);
