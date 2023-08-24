type FeedUserInfoProps = {
  nickname: string;
  convertedCurrentCharge: string;
};

export const FeedUserInfo = ({
  nickname,
  convertedCurrentCharge,
}: FeedUserInfoProps) => {
  return (
    <div className="flex items-center gap-[4px]">
      <p className="font-body-regular-sm max-w-[160px] truncate font-[600] text-black">
        {nickname}
      </p>
      <p className="font-caption-medium-md text-gray-50 ">
        {convertedCurrentCharge}
      </p>
    </div>
  );
};
