import React from "react";
import HeaderAuth from "./HeaderAuth";
import MainAuth from "./MainAuth";
import FooterAuth from "./FooterAuth";
import ModalAuth from "@/components/modules/ModalAuth";

const AuthLayout = () => {
  return (
    <>
      <HeaderAuth />
      <MainAuth />
      <FooterAuth />

      <ModalAuth />
    </>
  );
};

export default AuthLayout;
