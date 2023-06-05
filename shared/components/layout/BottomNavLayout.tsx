import { ReactNode } from 'react';

import { BottomNavigation } from '../navigation';

interface BottomNavLayoutProps {
  children: ReactNode;
}

export default function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className="relative h-screen">
      <div className="overflow-y-auto">{children}</div>
      <div className="absolute bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
