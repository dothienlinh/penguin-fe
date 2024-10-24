import { FC } from "react";
import { IProviderProps } from "@/libs/interfaces";

const AppLayout: FC<IProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default AppLayout;
