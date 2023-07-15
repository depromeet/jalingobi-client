import { ReactNode } from 'react';

import { BottomNavigation } from '../navigation';

import styles from './BottomNavLayout.module.css';

type BottomNavLayoutProps = {
  children: ReactNode;
};

export default function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className={styles.layout}>
      <div className="flex-1 overflow-auto">{children}</div>
      <BottomNavigation />
    </div>
  );
}
