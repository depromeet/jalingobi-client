import { ReactNode } from 'react';

import { BottomNavigation } from '../navigation';

type BottomNavLayoutProps = {
  children: ReactNode;
};

export default function BottomNavLayout({ children }: BottomNavLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      {/* 
        TODO: 창완님 overflow-auto의 경우 각 페이지 내부에서 하는게 맞는 것 같은데 어떻게 생각하세요 ? 
        창완님께서 작성해주신 거지방 탐색의 경우에도 list만 scroll 되는게 맞는 것 같아서요 ! 

        추가적으로 제가 기존에 짰던 코드가 페이지 내부에서 overflow를 사용하고 있어서 현재 사이드 이펙트가 발생하고 있어요.

        BottomNavLayout과 같이 공통으로 사용되는 컴포넌트의 경우 사이드 이펙트가 발생할 여지가 크니까, 사용하는 모든 곳에서 
        사이드 이펙트가 발생하지 않는지 확인해주시고 고쳐주세요 ㅠ
      */}
      <div className="flex-1 overflow-auto">{children}</div>
      <BottomNavigation />
    </div>
  );
}
