import { Box } from "@mui/material";
import React, { memo } from "react";
import AuthLayout from "../layouts/AuthLayout";
import AuthModalProvider from "../providers/AuthModalProvider";

const Auth = () => {
  return (
    <AuthModalProvider>
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
    </AuthModalProvider>
  );
};

export default memo(Auth);
