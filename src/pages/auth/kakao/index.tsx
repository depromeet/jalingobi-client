import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { oauthRequestToKakao, authKakao } from '@/service/auth';

export interface State {
  code: string;
}

export default function RedirectedKakao() {
  const router = useRouter();
  useEffect(() => {
    async function test() {
      const code = new URL(window.location.href).searchParams.get('code');
      if (code) {
        const kakao = await oauthRequestToKakao(code);
        const login = await authKakao({
          idToken: kakao.id_token,
          accessToken: kakao.access_token,
        });
        if (login) {
          router.push('/search');
        }
      }
    }

    test();
  }, []);

  return <button type="button">loading</button>;
}

// export default function authKakao() {
//   const router = useRouter();
//   const { code: authCode, error: kakaoServerError } = router.query;

//   const loginHandler = useCallback(
//     async (code: string) => {
//       // 백엔드에 전송
//       const response: IAuthKakaoResponse = await httpClient.post(
//         "https://jalingobi.com/auth/kakao",
//         {
//           idToken: "string",
//           accessToken: "string",
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.isSuccess) {
//         // 성공하면 홈으로 리다이렉트
//         router.push("/search");
//       } else {
//         // 실패하면 에러 페이지로 리다이렉트
//         router.push("/notifications/authentication-failed");
//       }
//     },
//     [router]
//   );

//   const getToken = (code: string) => {
//     httpClient.post(
//       "https://kauth.kakao.com/oauth/token",
//       {
//         grant_type: "authorization_code",
//         client_id: "05853a15a5b25d2003a144e6e4c312c7",
//         redirect_uri: "http://localhost:3000/auth/kakao",
//         code,
//         client_secret: "p7ABkLq3Izo05Ci78aPfKRN21ASoWyLT",
//       },
//       {
//         headers: {
//           "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
//         },
//       }
//     );
//   };

//   useEffect(() => {
//     if (authCode) {
//       loginHandler(authCode);

//       // 인가코드를 제대로 못 받았을 경우에 에러 페이지를 띄운다.
//     } else if (kakaoServerError) {
//       router.push("/notifications/authentication-failed");
//     }
//   }, [loginHandler, authCode, kakaoServerError, router]);

//   return <h2>로그인 중입니다..</h2>;
// }

// export function authKakao2() {
//   const dispatch = useDispatch();

//   const kakaoLogin = (code: string) => {
//     console.log(code);
//   };

//   useEffect(() => {

//     if (code) {
//       console.log(code);
//       getToken(code);
//     }
//   });

//   return <div>asas</div>;
// }
