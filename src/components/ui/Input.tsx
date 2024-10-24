"use client";

import {
  TextField,
  TextFieldProps,
  OutlinedInput as OutlinedInputMUI,
  OutlinedInputProps,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Input = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "#000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000",
      borderWidth: 1,
    },
    "&.Mui-error fieldset": {
      borderColor: theme.palette.error.main,
    },
  },
}));

export const OutlinedInput = styled(OutlinedInputMUI)<OutlinedInputProps>(
  ({ theme }) => ({
    "&.MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "#000",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#000",
        borderWidth: 1,
      },
      "&.Mui-error fieldset": {
        borderColor: theme.palette.error.main,
      },
    },
  })
);

export default Input;
