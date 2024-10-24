import { Box, Container, Button as MuiButton } from "@mui/material";
import Image from "next/image";
import { memo } from "react";
import Link from "../../common/Link";
import ModalLogin from "../../modules/ModalAuth";

const Header = () => {
  return (
    <header>
      <Box sx={{ borderBottom: "1px solid #000" }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link href="/">
              <Image
                src="/icons/logo.svg"
                alt="logo"
                priority
                width={112}
                height={75}
              />
            </Link>
            <Box sx={{ display: "flex", gap: 2 }}>
              <ModalLogin
                textBtn="Viết"
                btnComponent={MuiButton}
                sxBtn={{
                  display: { xs: "none", sm: "block" },
                  color: "black",
                  bgcolor: "unset !important",
                }}
              />

              <ModalLogin
                textBtn="Đăng nhập"
                btnComponent={MuiButton}
                sxBtn={{
                  display: { xs: "none", sm: "block" },
                  color: "black",
                  bgcolor: "unset !important",
                }}
              />

              <ModalLogin textBtn="Bắt đầu" />
            </Box>
          </Box>
        </Container>
      </Box>
    </header>
  );
};

export default memo(Header);
