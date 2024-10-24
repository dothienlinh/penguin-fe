import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";
import { ButtonAuth } from "@/components/ui/Button";
import { FacebookIcon, GoogleIcon } from "@/components/ui/Icons";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import { callLoginFacebook, callLoginGoogle } from "@/libs/services/apis/auth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

const ContentModuleRegister: FC = () => {
  const { setTargetModal } = useAuthModalContext();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <ButtonAuth variant="outlined" onClick={() => callLoginGoogle()}>
          <GoogleIcon />
          <Typography sx={{ flexGrow: 1 }}>Đăng ký với Google</Typography>
        </ButtonAuth>
        <ButtonAuth variant="outlined" onClick={() => callLoginFacebook()}>
          <FacebookIcon />
          <Typography sx={{ flexGrow: 1 }}>Đăng ký với Facebook</Typography>
        </ButtonAuth>
        <ButtonAuth
          variant="outlined"
          onClick={() => {
            setTargetModal(TARGET_MODAL.sendOTPCodeRegister);
          }}
        >
          <EmailOutlinedIcon />
          <Typography sx={{ flexGrow: 1 }}>Đăng ký với Email</Typography>
        </ButtonAuth>
      </Box>

      <Typography sx={{ mt: 4, fontSize: 16, textAlign: "center" }}>
        Đã có tài khoản?{" "}
        <Typography
          component={"span"}
          sx={{ fontWeight: 700, cursor: "pointer", color: "#1a8917" }}
          onClick={() => {
            setTargetModal(TARGET_MODAL.login);
          }}
        >
          Đăng nhập
        </Typography>
      </Typography>
    </Box>
  );
};

export default ContentModuleRegister;
