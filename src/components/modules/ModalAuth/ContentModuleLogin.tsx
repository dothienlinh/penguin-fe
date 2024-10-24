import { ButtonAuth } from "@/components/ui/Button";
import { FacebookIcon, GoogleIcon } from "@/components/ui/Icons";
import { callLoginFacebook, callLoginGoogle } from "@/libs/services/apis/auth";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";
import { TARGET_MODAL } from "@/components/providers/AuthModalProvider";

const ContentModuleLogin: FC = () => {
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
        <ButtonAuth variant="outlined" onClick={callLoginGoogle}>
          <GoogleIcon />
          <Typography sx={{ flexGrow: 1 }}>Đăng nhập với Google</Typography>
        </ButtonAuth>
        <ButtonAuth variant="outlined" onClick={callLoginFacebook}>
          <FacebookIcon />
          <Typography sx={{ flexGrow: 1 }}>Đăng nhập với Facebook</Typography>
        </ButtonAuth>
        <ButtonAuth
          variant="outlined"
          onClick={() => setTargetModal(TARGET_MODAL.loginWithEmail)}
        >
          <EmailOutlinedIcon />
          <Typography sx={{ flexGrow: 1 }}>Đăng nhập với Email</Typography>
        </ButtonAuth>
      </Box>

      <Typography sx={{ mt: 4, fontSize: 16, textAlign: "center" }}>
        Không có tài khoản?
        <Typography
          component={"span"}
          sx={{ fontWeight: 700, cursor: "pointer", color: "#1a8917" }}
          onClick={() => setTargetModal(TARGET_MODAL.register)}
        >
          Tạo một tài khoản
        </Typography>
      </Typography>
    </Box>
  );
};

export default memo(ContentModuleLogin);
