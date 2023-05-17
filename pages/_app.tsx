import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../lib/material/createEmotionCache';
import Layout from '@/components/Layout';
import { CurrentThemeProvider } from '@/lib/material/CurrentThemeProvider';

import '../styles/globals.css';
import { CookieNotice } from '@/components/CookieNotice';
import { FeedbackMessage } from '@/components/FeedbackMessage';
import { SnackbarProvider } from 'notistack';
import { SnackbarCloseButton } from '@/components/SnackbarCloseButton';
import ErrorBoundary from '@/components/ErrorBoundary';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CurrentThemeProvider>
        <CssBaseline />
        <SnackbarProvider preventDuplicate anchorOrigin={{ vertical: 'top', horizontal: 'center' }} action={(key) => <SnackbarCloseButton barKey={key} />} />
        <FeedbackMessage />
        <ErrorBoundary>
          <Layout user={pageProps?.user}>
            <Component {...pageProps} />
          </Layout>
        </ErrorBoundary>
        <CookieNotice />
      </CurrentThemeProvider>
    </CacheProvider>
  );
}
