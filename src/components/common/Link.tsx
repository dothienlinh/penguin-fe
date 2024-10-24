import { LinkProps, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
import { FC } from "react";

interface ILinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
}

const Link: FC<ILinkProps> = ({ href, children, ...props }) => {
  return (
    <MuiLink component={NextLink} href={href} {...props}>
      {children}
    </MuiLink>
  );
};

export default Link;
