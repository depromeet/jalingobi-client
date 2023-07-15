import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import { httpClient } from '@/service';

export const withAuth = (handler: GetServerSideProps): GetServerSideProps => {
  return async (context: GetServerSidePropsContext) => {
    try {
      await httpClient.post('/auth/refresh', { headers: context.req.headers });
    } catch (error) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }

    return handler(context);
  };
};
