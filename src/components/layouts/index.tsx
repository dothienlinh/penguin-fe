"use client";

import { IProviderProps } from "@/libs/interfaces";
import { useAppDispatch, useAppSelector } from "@/libs/store/hooks";
import { handleCloseSnackbar } from "@/libs/store/slices/snackbarSlice";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import React, { FC } from "react";
import GrowTransition from "../ui/GrowTransition";

const Layout: FC<IProviderProps> = ({ children }) => {
  const { open, message, type } = useAppSelector((state) => state.snackbar);

  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(handleCloseSnackbar());
  };

  return (
    <>
      {children}

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        TransitionComponent={GrowTransition}
      >
        <Alert
          onClose={handleClose}
          severity={type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Layout;
