import { Box, Container, Button as MuiButton } from "@mui/material";
import Image from "next/image";
import { memo } from "react";
import Link from "../../common/Link";
import Button from "@/components/ui/Button";
import useAuthModalContext from "@/libs/hooks/useAuthModalContext";

const Header = () => {
  const { setTargetModal } = useAuthModalContext();

  const handleOpen = () =>
    setTargetModal((prev) => ({ ...prev, isOpenModal: true }));

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
              <MuiButton
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "black",
                }}
                onClick={handleOpen}
              >
                Viết
              </MuiButton>

              <MuiButton
                sx={{
                  display: { xs: "none", sm: "block" },
                  color: "black",
                }}
                onClick={handleOpen}
              >
                Đăng nhập
              </MuiButton>

              <Button onClick={handleOpen}>Bắt đầu</Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </header>
  );
};

export default memo(Header);
