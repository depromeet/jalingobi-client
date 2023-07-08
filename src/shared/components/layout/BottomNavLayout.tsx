import { ReactNode } from 'react';

import { BottomNavigation } from '../navigation';

type BottomNavLayoutProps = {
  children: ReactNode;
};

export default function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-1 overflow-auto">{children}</div>
      <BottomNavigation />
    </div>
  );
}
