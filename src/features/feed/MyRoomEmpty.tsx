import { ImageLoader } from '@/shared/components/image';

export const MyRoomEmpty = () => {
  return (
    <div className="flex flex-col items-center pt-40">
      <p className="font-title-medium-md text-black">
        아직 지출 기록이 없어요.
      </p>
      <ImageLoader
        width={110}
        height={110}
        src="/images/mark.png"
        alt=""
        className="grayscale filter"
      />
      <p className="font-body-regular-sm text-gray-70">지출 추가를 눌러</p>
      <p className="text-gray- font-body-regular-sm">
        거지방 챌린지를 시작해보세요.
      </p>
    </div>
  );
};
