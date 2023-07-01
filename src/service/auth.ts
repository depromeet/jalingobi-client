import axios from 'axios';

import { AuthKakaoBody, AuthKakaoResponse } from '@/lib/interfaces';
import { httpClient } from '@/service/index';

type OAuthResposneFromKakao = {
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
};

export const OAuthRequestToKakao = async (
  code: string,
): Promise<OAuthResposneFromKakao> => {
  const response = await axios.post(
    'https://kauth.kakao.com/oauth/token',
    {
      grant_type: 'authorization_code',
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
      code,
      client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
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
  body: AuthKakaoBody,
): Promise<AuthKakaoResponse> => {
  const response = await httpClient.post('/auth/kakao', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};
