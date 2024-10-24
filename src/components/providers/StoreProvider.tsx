"use client";

import { IProviderProps } from "@/libs/interfaces";
import { makeStore } from "@/libs/store";
import { FC } from "react";
import { Provider } from "react-redux";

const StoreProvider: FC<IProviderProps> = ({ children }) => {
  return <Provider store={makeStore()}>{children}</Provider>;
};

export default StoreProvider;
