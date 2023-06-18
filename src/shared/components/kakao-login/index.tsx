import React, { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { IconKakao } from '@/public/svgs';

export interface Props {
  children?: React.ReactNode;
  render?: ({ onClick }: { onClick: () => void }) => ReactNode;
  className?: string;
}

export default class KakaoLogin extends React.PureComponent<Props> {
  public render() {
    const onClick = () => {
      const clientId = '05853a15a5b25d2003a144e6e4c312c7';
      const redirectUrl = 'http://localhost:3000/auth/kakao';

      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
    };

    const {
      render,
      className = '',
      children = '카카오톡으로 시작',
    } = this.props;

    if (typeof render === 'function') {
      return render({ onClick });
    }

    return (
      <div className="flex items-center">
        <button
          type="button"
          className={cn(
            'border-1 rounded-3 text-16 inline-block h-[49px] w-[335px] border-transparent bg-[#FAE54D] p-0 text-center leading-[49px]',
            className,
          )}
          onClick={onClick}
        >
          <div className="absolute left-[73px] right-[218px] top-[12px]">
            <IconKakao />
          </div>
          {children}
        </button>
      </div>
    );
  }
}
