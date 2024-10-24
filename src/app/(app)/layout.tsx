import AppLayout from "@/components/layouts/AppLayout";
import { IProviderProps } from "@/libs/interfaces";
import { FC } from "react";

const Layout: FC<IProviderProps> = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Layout;
