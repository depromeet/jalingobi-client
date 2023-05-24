import type { ReactNode } from 'react';

import ApplyingFont from '../font/ApplyingFont';

interface GlobalLayoutProps {
  children: ReactNode;
}

export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <ApplyingFont>
      <div className="h-screen px-[20px]">{children}</div>
    </ApplyingFont>
  );
}
