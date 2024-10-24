import { Box, Container, Typography } from "@mui/material";
import { memo } from "react";

const Footer = () => {
  return (
    <footer>
      <Box sx={{ borderTop: "1px solid #000" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: 68,
              alignItems: "center",
            }}
          >
            <Typography>Copyright © 2024</Typography>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default memo(Footer);
