import { ButtonAuth } from "@/components/ui/Button";
import { FacebookIcon, GoogleIcon } from "@/components/ui/Icons";
import { TARGET_MODAL } from "@/libs/constants";
import { callLoginFacebook, callLoginGoogle } from "@/libs/services/apis/auth";
import { useAppDispatch } from "@/libs/store/hooks";
import { setModalAuth } from "@/libs/store/slices/modalAuthSlice";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Box, Typography } from "@mui/material";
import { FC, memo } from "react";

const ContentModuleLogin: FC = () => {
  const dispatch = useAppDispatch();

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
          onClick={() => dispatch(setModalAuth(TARGET_MODAL.loginWithEmail))}
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
          onClick={() => dispatch(setModalAuth(TARGET_MODAL.register))}
        >
          Tạo một tài khoản
        </Typography>
      </Typography>
    </Box>
  );
};

export default memo(ContentModuleLogin);
