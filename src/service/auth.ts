import axios from 'axios';

import { IAuthKakaoBody, IAuthKakaoResponse } from '@/lib/interfaces';
import { httpClient } from '@/service/index';

interface oauthResposneFromKakao {
  /** 토큰 타입, bearer 로 고정 */
  token_type: string;
  /** id 토큰 값 */
  id_token: string;
  /** 사용자 액세스 토큰 값 */
  access_token: string;
  /** 액세스 토큰 만료 시간(초) */
  expires_in: string;
  /** 사용자 리프레시 토큰 값 */
  refresh_token: string;
  /** 리프레시 토큰 만료 시간(초) */
  refresh_token_expires_in: number;
  /** 인증된 사용자의 정보 조회 권한 범위 */
  scope: string; // 범위가 여러 개일 경우, 공백으로 구분
}

export const oauthRequestToKakao = async (
  code: string,
): Promise<oauthResposneFromKakao> => {
  const response = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: '05853a15a5b25d2003a144e6e4c312c7',
      redirect_uri: 'http://localhost:3000/auth/kakao',
      code,
      client_secret: 'p7ABkLq3Izo05Ci78aPfKRN21ASoWyLT',
    },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    },
  );

  return response.data;
};

export const authKakao = async (
  body: IAuthKakaoBody,
): Promise<IAuthKakaoResponse> => {
  return httpClient.post('https://jalingobi.com/auth/kakao', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
