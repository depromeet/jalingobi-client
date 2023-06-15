import type { AppProps } from 'next/app';
import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { GlobalLayout } from '@/shared/components/layout';
import { NextPageWithLayout } from '@/shared/types/layout';

if (process.env.NODE_ENV === 'development') {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    (async () => {
      const { server } = await import('../mocks/server');
      server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import('../mocks/browser');
      worker.start();
    })();
  }
}
const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  );
}
