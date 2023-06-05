import type { AppProps } from 'next/app';

import { GlobalLayout } from '@/shared/components/layout';
import { NextPageWithLayout } from '@/shared/types/layout';

import '@/styles/globals.css';

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>,
  );
}
