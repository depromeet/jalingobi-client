import { BottomNavigation } from '@/shared/components/navigation';
import { useHandleBack } from '@/shared/hooks';

export default function Search() {
  useHandleBack();
  return (
    <div>
      <BottomNavigation />
    </div>
  );
}
