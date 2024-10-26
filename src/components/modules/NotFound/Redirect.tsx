"use client";

import Link from "@/components/common/Link";
import { useAppSelector } from "@/libs/store/hooks";

const Redirect = () => {
  const { isAuthenticated } = useAppSelector((state) => state.profile);

  console.log(isAuthenticated);

  return <Link href="/">Return {isAuthenticated ? "Home" : "Sign In"}</Link>;
};

export default Redirect;
