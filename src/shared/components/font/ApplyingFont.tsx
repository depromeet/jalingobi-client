import localFont from 'next/font/local';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const pretendard = localFont({
  src: [
    {
      path: '../../../../public/fonts/Pretendard-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../../public/fonts/Pretendard-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-pretendard',
});

export default function ApplyingFont({ children }: Props) {
  return <main className={`${pretendard.variable} font-sans`}>{children}</main>;
}
