import type { ReactNode } from 'react';

import ApplyingFont from '../font/ApplyingFont';

interface GlobalLayoutProps {
  children: ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <ApplyingFont>
      <div className="mx-auto my-0 h-screen w-full max-w-[600px] px-5">
        {children}
      </div>
    </ApplyingFont>
  );
}
