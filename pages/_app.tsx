import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local';

const pretendard = localFont({
  src: [
    {
      path: '../styles/font/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../styles/font/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${pretendard.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
