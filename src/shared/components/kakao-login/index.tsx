import React, { CSSProperties, ReactChild, ReactNode } from 'react';

export interface Props {
  /** 하위 컴퍼넌트 @default 카카오로 로그인하기 */
  children?: ReactChild;
  /** 스타일 @default 기본 스타일 */
  style?: CSSProperties;
  /** 커스텀 컴퍼넌트 렌더하기 */
  render?: ({ onClick }: { onClick: () => void }) => ReactNode;
  /** 클래스 이름 */
  className?: string;
}

export default class KakaoLogin extends React.PureComponent<Props> {
  public static DEFAULT_STYLE: CSSProperties = {
    display: 'inline-block',
    padding: '0px',
    width: '222px',
    height: '49px',
    lineHeight: '49px',
    color: 'rgb(60, 30, 30)',
    backgroundColor: 'rgb(255, 235, 0)',
    border: '1px solid transparent',
    borderRadius: '3px',
    fontSize: '16px',
    textAlign: 'center',
  };

  public render() {
    const onClick = () => {
      const clientId = '05853a15a5b25d2003a144e6e4c312c7';
      const redirectUrl = 'http://localhost:3000/auth/kakao';

      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
    };

    const {
      render,
      className = '',
      style = KakaoLogin.DEFAULT_STYLE,
      children = '카카오톡으로 시작',
    } = this.props;

    if (typeof render === 'function') {
      return render({ onClick });
    }

    return (
      <button
        type="button"
        className={className}
        onClick={onClick}
        style={style}
      >
        {children}
      </button>
    );
  }
}
