import type { AppProps } from 'next/app';
import '@/styles/globals.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';

import { GlobalLayout } from '@/shared/components/layout';
import { ToastsContainer } from '@/shared/components/toast';
import { NextPageWithLayout } from '@/shared/types/layout';

dayjs.locale('ko');

// if (process.env.NODE_ENV === 'development') {
//   await import('../mocks');
// }
const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <GlobalLayout>
        <ToastsContainer />
        <Component {...pageProps} />
      </GlobalLayout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>,
  );
}
