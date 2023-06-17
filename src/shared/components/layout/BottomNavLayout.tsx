import { ReactNode } from 'react';

import { BottomNavigation } from '../navigation';

type BottomNavLayoutProps = {
  children: ReactNode;
};

export default function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className="relative h-screen">
      {children}
      <BottomNavigation />
    </div>
  );
}
