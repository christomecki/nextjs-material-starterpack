import { forwardRef } from "react";
import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import NextLink from "next/link";
import { LinkProps } from "@mui/material/Link";

const LinkBehavior = forwardRef<HTMLAnchorElement, LinkProps>(function MuiNextLink(props, ref) {
  return <NextLink ref={ref} {...(props as any)} />;
});

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const linkDefaultProps = {
  component: LinkBehavior,
} as Partial<LinkProps<"a", object>>;

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiLink: {
      defaultProps: linkDefaultProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

export default theme;
