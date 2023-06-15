import { ReactNode } from 'react';

import { BottomNavigation } from '../navigation';

interface BottomNavLayoutProps {
  children: ReactNode;
}

// TODO: 여기 overflow-y-auto를 없애고 자식에서 맥이는게 맞는거 같아서 삭제했는데요, 사이드 이펙트 발생하면 말씀해주세요 !
export default function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className="relative h-screen">
      <div>{children}</div>
      <div className="absolute bottom-0">
        <BottomNavigation />
      </div>
    </div>
  );
}
