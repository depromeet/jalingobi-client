import React from 'react';

import ErrorPageBuilder from '@/shared/components/error-page';

const NotFound = () => {
  return (
    <ErrorPageBuilder
      statusCode="404"
      title="페이지를 찾을 수 없습니다."
      descriptions={[
        '페이지 주소가 잘못 입력되었거나',
        '변경 혹은 삭제되어 찾을 수 없습니다',
        '입력하신 주소가 정확한지 다시 확인 부탁드립니다.',
      ]}
    />
  );
};

export default NotFound;
