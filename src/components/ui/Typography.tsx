import { styled } from "@mui/material";
import MuiTypography, { TypographyProps } from "@mui/material/Typography";

export const TypographyAuth = styled(MuiTypography)<TypographyProps>(() => ({
  fontSize: 14,
  color: "#1a8917",
  textAlign: "center",
  cursor: "pointer",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
  "&:hover": {
    opacity: 0.5,
  },
}));
