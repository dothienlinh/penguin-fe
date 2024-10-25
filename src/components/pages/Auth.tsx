import { Box } from "@mui/material";
import { memo } from "react";
import AuthLayout from "../layouts/AuthLayout";

const Auth = () => {
  return (
    <Box
      sx={{
        bgcolor: "#F7F4ED",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AuthLayout />
    </Box>
  );
};

export default memo(Auth);
