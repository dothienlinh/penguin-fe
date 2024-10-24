"use client";

import {
  Box,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from "@mui/material";
import type { OutlinedInputProps } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { forwardRef, memo, MouseEvent, useState } from "react";
import { OutlinedInput } from "../ui/Input";

interface InputPasswordFormProps
  extends Omit<OutlinedInputProps, "helperText"> {
  helperText?: string;
}

const InputPasswordForm = forwardRef<HTMLDivElement, InputPasswordFormProps>(
  ({ label, id, helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

    const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    return (
      <>
        {label && (
          <InputLabel htmlFor={id} sx={{ fontSize: 14, fontWeight: 700 }}>
            {label}
          </InputLabel>
        )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <OutlinedInput
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...props}
          />
          {helperText && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mx: "14px", mt: "4px" }}
            >
              {helperText}
            </Typography>
          )}
        </Box>
      </>
    );
  }
);

InputPasswordForm.displayName = "InputPasswordForm";

export default memo(InputPasswordForm);
