import { ImageLoader } from '@/shared/components/image';

type ChallengeRoomEmptyProps = {
  title?: string;
  participants?: number;
  maxParticipants?: number;
};

export const ChallengeRoomEmpty = ({
  title,
  participants,
  maxParticipants,
}: ChallengeRoomEmptyProps) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <p className="font-title-medium-md text-black">{title}</p>
      <p className="font-caption-medium-md text-gray-60">{`참여 인원 ${participants}명 / ${maxParticipants}명`}</p>
      <ImageLoader
        width={110}
        height={110}
        src="/images/mark.png"
        alt=""
        className="grayscale filter"
      />
      <p className="font-body-regular-sm text-gray-70">
        아무도 지출 기록을 올리지 않았어요.
      </p>
      <p className="text-gray- font-body-regular-sm">
        지출 기록의 첫번째 주인공이 되어보세요.
      </p>
    </div>
  );
};
