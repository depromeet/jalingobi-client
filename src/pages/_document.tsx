import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta property="og:title" content="자린고비" key="title" />
        <meta
          property="og:description"
          content="거지방에서 배달비, 커피값, 택시비를 줄여보세요! 무지출 챌린지, 절약 꿀팁 모두 자린고비에서!"
          key="description"
        />
        <meta
          property="og:image"
          content="https://jalingobi.com/images/jalingobi-og.webp"
          key="image"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
