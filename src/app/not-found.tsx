import Link from "@/components/common/Link";
import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h2">Not Found</Typography>
        <Typography variant="body1">
          Could not find requested resource
        </Typography>
        <Link href="/">Return Home</Link>
      </Box>
    </>
  );
};

export default NotFound;
