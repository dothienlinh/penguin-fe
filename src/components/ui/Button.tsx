"use client";

import { ButtonProps, Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";

const Button = styled(MuiButton)({
  fontSize: 14,
  color: "white",
  backgroundColor: "#191919",
  borderRadius: 9999,
  padding: "8px 16px",
  border: "1px solid #191919",
  "&:hover": {
    backgroundColor: "#000000",
    border: "1px solid #000000",
  },
});

const ButtonAuth = styled(MuiButton)<ButtonProps>({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: 9999,
  border: "1px solid black",
  gap: 8,
  width: 300,
  textTransform: "none",
  color: "black",
  padding: "8px 16px",
});

export { ButtonAuth };
export default Button;
