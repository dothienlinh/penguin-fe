"use client";

import { ALL_ROUTES, PUBLIC_ROUTES } from "@/libs/constants";
import useCheckAuth from "@/libs/hooks/useCheckAuth";
import { IProviderProps } from "@/libs/interfaces";
import { useAppDispatch, useAppSelector } from "@/libs/store/hooks";
import { handleCloseSnackbar } from "@/libs/store/slices/snackbarSlice";
import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useCallback, useEffect, useState } from "react";
import Auth from "../pages/Auth";
import GradientCircularProgress from "../ui/GradientCircularProgress";
import GrowTransition from "../ui/GrowTransition";

const Layout: FC<IProviderProps> = ({ children }) => {
  const { isInitialized } = useCheckAuth();
  const { open, message, type } = useAppSelector((state) => state.snackbar);
  const { isAuthenticated } = useAppSelector((state) => state.profile);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);

  const isPrivateRoute = useCallback((pathname: string) => {
    return ALL_ROUTES.some((route) => {
      if (route instanceof RegExp) {
        return route.test(pathname);
      }
      return route === pathname;
    });
  }, []);

  const componentAuth =
    pathname === "/" ? isAuthenticated ? children : <Auth /> : children;
  const isNotFound = !isPrivateRoute(pathname);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(handleCloseSnackbar());
  };
  useEffect(() => {
    if (!isInitialized) return;

    if (!PUBLIC_ROUTES.includes(pathname) && !isAuthenticated && !isNotFound) {
      router.replace("/auth/signin");
    } else {
      setShouldRender(true);
    }
  }, [pathname, router, isInitialized, isAuthenticated, isNotFound]);

  if (!isInitialized || !shouldRender) {
    return <GradientCircularProgress />;
  }

  return (
    <>
      {componentAuth}

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
