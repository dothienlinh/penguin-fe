import { Box, Container, Typography } from "@mui/material";
import { memo } from "react";
import Content from "../../common/Content";
import Image from "../../common/Image";
import ModalLogin from "../../modules/ModalAuth";

const Main = () => {
  return (
    <Content>
      <Container maxWidth="xl">
        <Box>
          <Box>
            <Typography sx={{ fontSize: { xs: 60, md: 80 }, color: "#242424" }}>
              Con người
            </Typography>
            <Typography sx={{ fontSize: { xs: 60, md: 80 }, color: "#242424" }}>
              Câu chuyện & Ý tưởng
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 30, md: 40 },
                color: "#242424",
                mt: 4,
              }}
            >
              Một nơi để đọc, viết và đào sâu hiểu biết của bạn
            </Typography>
          </Box>

          <ModalLogin
            textBtn="Bắt đầu đọc"
            sxBtn={{
              bgcolor: "#1A8917",
              borderColor: "#1A8917",
              px: 4,
              py: 1,
              mt: 5,
              "&:hover": {
                bgcolor: "#156D12",
                borderColor: "#156D12",
              },
            }}
          />
        </Box>

        <Image
          src="/images/bg-main.webp"
          alt="main"
          priority={false}
          width={460}
          height={600}
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
            position: "absolute",
            right: { md: -200, xl: 0 },
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </Container>
    </Content>
  );
};

export default memo(Main);
