import Redirect from "@/components/modules/NotFound/Redirect";
import { Box, Typography } from "@mui/material";

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
        <Redirect />
      </Box>
    </>
  );
};

export default NotFound;
