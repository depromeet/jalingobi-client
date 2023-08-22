import Image from 'next/image';
import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  description: ReactNode;
};

export const NoChallengeAvailable = ({
  title,
  subtitle,
  description,
}: Props) => {
  return (
    <div className="max-w- flex flex-col items-center pt-40">
      <h2 className="font-title-medium-md font-semibold text-black">{title}</h2>
      {subtitle && (
        <h6 className="font-caption-medium-md text-gray-60">{subtitle}</h6>
      )}
      <Image
        width={110}
        height={110}
        src="/images/mark.png"
        alt="empty"
        className="grayscale filter"
      />
      <div className="font-body-regular-sm text-center font-semibold text-gray-70">
        {description}
      </div>
    </div>
  );
};
