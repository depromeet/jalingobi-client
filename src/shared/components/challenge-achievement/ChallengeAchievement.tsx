import { ProgressBar } from '@/shared/components/progress-bar';

type Props = {
  goalCharge: string;
  currentCharge: string;
  percent: number;
  dueDay: string;
};

const ChallengeAchievement = ({
  goalCharge,
  currentCharge,
  percent,
  dueDay,
}: Props) => {
  return (
    <div className="h-15 w-full max-w-[600px] border-t border-gray-30 px-5 py-2.5">
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="font-body-regular-lg text-black">{currentCharge}</p>
            <p className="font-body-regular-lg text-gray-60">{`/${goalCharge}`}</p>
          </div>
          <p className="font-caption-medium-sm flex items-center text-gray-50">
            {dueDay}
          </p>
        </div>
        <ProgressBar percent={percent} />
      </div>
    </div>
  );
};

export { ChallengeAchievement };
