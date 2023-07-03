import { ImageLoader } from '@/shared/components/image';

export const MyRoomEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-40">
      <p className="font-title-medium-md text-black">
        진행 중인 거지방이 없어요.
      </p>
      <ImageLoader
        width={110}
        height={110}
        src="/images/mark.png"
        alt=""
        className="grayscale filter"
      />
      <p className="font-body-regular-sm text-gray-70">
        탐색 탭을 클릭해 소비습관에 맞는
      </p>
      <p className="text-gray- font-body-regular-sm">
        거지방 챌린지를 시작해보세요.
      </p>
    </div>
  );
};
