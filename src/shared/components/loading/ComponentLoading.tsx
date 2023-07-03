import { IconLoading } from '@/public/svgs';

export const ComponentLoading = () => {
  return (
    <div className="flex h-full items-center justify-center">
      <IconLoading className="h-[40px] w-[40px] animate-spin fill-primary" />
    </div>
  );
};
