"use client";

import { styled } from "@mui/material";

const Content = styled("main", {
  name: "Content",
  slot: "root",
})(({}) => ({
  flexGrow: 1,
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  position: "relative",
}));

export default Content;
