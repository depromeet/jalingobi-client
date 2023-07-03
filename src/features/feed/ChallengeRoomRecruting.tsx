import { ImageLoader } from '@/shared/components/image';

type ChallengeRoomRecrutingProps = {
  title?: string;
  participants?: number;
  maxParticipants?: number;
};

export const ChallengeRoomRecruting = ({
  title,
  participants,
  maxParticipants,
}: ChallengeRoomRecrutingProps) => {
  return (
    <div className="flex flex-col items-center justify-center pt-40">
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
        곧이어 챌린지가 시작됩니다.
      </p>
    </div>
  );
};
