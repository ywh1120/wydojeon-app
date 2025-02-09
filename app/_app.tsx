// pages/_app.tsx
import type { AppProps } from 'next/app';
import { SnackbarProvider } from '@/context/snackbarcontext';
import { CustomSnackbar } from '@/component/noticebar';

import { NextAppProvider } from '@toolpad/core/nextjs';

export default function App(props : any) {
  const { Component, pageProps } = props;

  return (
    <NextAppProvider>
      <Component {...pageProps} />
      <CustomSnackbar />
    </NextAppProvider>
  );
}