"use client";

import React from "react";
import useCheckAuth from "@/libs/hooks/useCheckAuth";
import GradientCircularProgress from "../ui/GradientCircularProgress";
import { useAppSelector } from "@/libs/store/hooks";
import Auth from "./Auth";

const Home = () => {
  const { isLoading } = useCheckAuth();
  const { isAuthenticated } = useAppSelector((state) => state.profile);

  return (
    <>
      {isLoading ? (
        <GradientCircularProgress />
      ) : isAuthenticated ? (
        <>Home</>
      ) : (
        <Auth />
      )}
    </>
  );
};

export default Home;
