import { forwardRef } from 'react';
import { Roboto } from '@next/font/google';
import { createTheme, PaletteOptions, ThemeOptions } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { merge } from 'lodash';
import NextLink from 'next/link';
import { LinkProps as MuiLinkProps } from '@mui/material/Link';

const LinkBehavior = forwardRef(function MuiNextLink(props, ref) {
  return <NextLink ref={ref} {...(props as any)} />;
});

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const palette = {
  primary: {
    main: '#556cd6',
  },
  secondary: {
    main: '#19857b',
  },
  error: {
    main: red.A400,
  },
};

const themeOptions: ThemeOptions = {
  palette,
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as MuiLinkProps, //LinkProps missing component prop, workaround: https://github.com/mui/material-ui/issues/29942
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
  },
};

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
  },
};

export const darkTheme = createTheme(merge(themeOptions, darkThemeOptions));
export const lightTheme = createTheme(merge(themeOptions, lightThemeOptions));
