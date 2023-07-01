import React from 'react';

import ErrorPageBuilder from '@/shared/components/error-page';

const InternalServerError = () => {
  return (
    <ErrorPageBuilder
      statusCode="500"
      title="페이지를 표시할 수 없습니다."
      descriptions={[
        '서비스에 프로그래밍 오류가 있습니다',
        '페이지를 새로 고치거나',
        '서비스 관리자에게 문의해주세요.',
      ]}
    />
  );
};

export default InternalServerError;
