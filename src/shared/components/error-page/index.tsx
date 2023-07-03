import Link from 'next/link';
import React from 'react';

import { IconArrowLeft } from '@/public/svgs';

import ImageLoader from '../image/ImageLoader';
import Spacing from '../spacing';

const ErrorPageBuilder = ({
  statusCode,
  title,
  descriptions,
}: {
  statusCode: string;
  title: string;
  descriptions: string[];
}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  const [description1, description2, description3] = descriptions;

  return (
    <div className="flex flex-col items-center px-5">
      <header className="mb-10 flex h-12 w-full items-center justify-between">
        <button type="button" onClick={handleGoBack}>
          <IconArrowLeft className="h-4 w-4" />
        </button>
      </header>
      <Spacing height={12} />
      <span>
        <ImageLoader
          src="/images/mark.png"
          alt="에러이미지"
          width={335}
          height={335}
          className="grayscale"
        />
      </span>
      <Spacing height={24} />
      <span className="font-title-medium-lg">{statusCode}</span>
      <Spacing height={16} />
      <span className="font-title-medium-sm">{title}</span>
      <Spacing height={16} />
      <span className="font-body-regular-sm text-gray-60">{description1}</span>
      <span className="font-body-regular-sm text-gray-60">{description2}</span>
      <span className="font-body-regular-sm text-gray-60">{description3}</span>

      <Spacing height={48} />
      <Link href="/search">
        <span className="font-body-regular-sm text-gray-60">
          메인으로 돌아가기
        </span>
      </Link>
    </div>
  );
};

export default ErrorPageBuilder;
