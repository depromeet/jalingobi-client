import Image from 'next/image';

type FeedUserImgProps = { imgUrl: string };

export const FeedUserImg = ({ imgUrl }: FeedUserImgProps) => {
  return (
    <div className="relative h-[2.625rem] w-[2.625rem] rounded-[0.625rem] object-cover">
      <Image src={imgUrl ?? ''} alt="" fill sizes="(max-width: 600px) 10vw" />
    </div>
  );
};
