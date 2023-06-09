import { convertNumberToCurrency } from '@/shared/utils/currency';

/* eslint-disable no-use-before-define */
interface AchievementOfChallengeInformationProps {
  goalCharge: number;
  currentCharge: number;
  percent: number;
  dueDay: number;
}

const AchievementOfChallengeInformation = ({
  goalCharge,
  currentCharge,
  percent,
  dueDay,
}: AchievementOfChallengeInformationProps) => {
  const convertedCurrentCharge = convertNumberToCurrency({
    value: currentCharge,
    unitOfCurrency: '원',
  });

  const convertedGoalCharge = convertNumberToCurrency({
    value: goalCharge,
    unitOfCurrency: '원',
  });

  return (
    <div className="h-15 w-full px-5 py-2.5">
      <div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="font-body-regular-lg text-black">
              {convertedCurrentCharge}
            </p>
            <p className="font-body-regular-lg text-gray-60">{`/${convertedGoalCharge}`}</p>
          </div>
          <p className="font-body-regular-sm text-gray-50">{`${dueDay}일 남았어요`}</p>
        </div>
        <ProgressBar percent={percent} />
      </div>
    </div>
  );
};

interface ProgressBarProp {
  percent: number;
}

const ProgressBar = ({ percent }: ProgressBarProp) => {
  const getBarColor = (percent: number) => {
    if (percent > 0 && percent <= 60) {
      return 'bg-accent-dark';
    }
    if (percent > 60 && percent <= 90) {
      return 'bg-primary';
    }
    // TODO: system-danger값 확인 이후에 변경 필요하면 변경 필요
    if (percent > 90 && percent <= 100) {
      return 'bg-system-danger';
    }
    return '';
  };
  return (
    <div className="h-2 w-full rounded-full bg-gray-20">
      <div
        className={`h-2 rounded-full ${getBarColor(percent)}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export { AchievementOfChallengeInformation };
