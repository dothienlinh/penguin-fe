"use client";

import { styled } from "@mui/material";
import NextImage from "next/image";

const Image = styled(NextImage, {
  name: "Image",
  slot: "root",
})(({}) => ({}));

export default Image;
