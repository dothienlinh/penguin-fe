import InputForm from "@/components/common/InputForm";
import InputPasswordForm from "@/components/common/InputPasswordForm";
import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import { TypographyAuth } from "@/components/ui/Typography";
import { ETypeSnackbar } from "@/libs/enums";
import { fetchApi } from "@/libs/helpers/fetchApi";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import useSnackbar from "@/libs/hooks/useSnackbar";
import { callGetProfile, callLoginWithEmail } from "@/libs/services/apis/auth";
import { useAppDispatch } from "@/libs/store/hooks";
import { setProfile } from "@/libs/store/slices/profileSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().required("Password is required"),
});

interface ILoginWithEmail {
  email: string;
  password: string;
}

const LoginWithEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setTargetModal } = useAuthModalContext();
  const { handleOpenSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginWithEmail>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginWithEmail) => {
    setIsLoading(true);
    const res = await fetchApi(() => callLoginWithEmail(data));
    if (res.data) {
      handleOpenSnackbar("Đăng nhập thành công", ETypeSnackbar.SUCCESS);
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", accessToken);

      const user = await fetchApi(() => callGetProfile());
      if (user.data) {
        dispatch(setProfile(user.data));
      }
    } else {
      handleOpenSnackbar(res.message, ETypeSnackbar.ERROR);
    }
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ mt: -8 }}>
            <Typography
              sx={{
                fontSize: 14,
                color: "text.secondary",
                textAlign: "center",
                justifyContent: "center",
                px: 10,
              }}
            >
              Nhập email và mật khẩu để đăng nhập.
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
                  name="email"
                  render={({ field }) => (
                    <InputForm
                      size="small"
                      id="email"
                      label="Email"
                      helperText={errors.email?.message}
                      error={!!errors.email}
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

              <Button type="submit" sx={{ textTransform: "none", width: 200 }}>
                Đăng nhập
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                mt: 4,
              }}
            >
              <TypographyAuth
                component={"span"}
                onClick={() => setTargetModal(TARGET_MODAL.login)}
              >
                <ArrowBackIosIcon sx={{ color: "#1a8917", fontSize: 14 }} />
                Tất cả các tùy chọn đăng nhập
              </TypographyAuth>
              <TypographyAuth
                component={"span"}
                onClick={() => setTargetModal(TARGET_MODAL.forgotPassword)}
              >
                Quên mật khẩu?
              </TypographyAuth>
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default LoginWithEmail;
