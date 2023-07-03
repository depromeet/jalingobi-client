import { IconLoading } from '@/public/svgs';

export const PageLoading = () => {
  return (
    <div className="z-99 fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-white">
      <IconLoading className="h-[40px] w-[40px] animate-spin fill-primary" />
    </div>
  );
};
