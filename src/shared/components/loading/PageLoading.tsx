import { IconLoading } from '@/public/svgs';

export const PageLoading = () => {
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center">
      <IconLoading className="h-[40px] w-[40px] animate-spin fill-primary" />
    </div>
  );
};
