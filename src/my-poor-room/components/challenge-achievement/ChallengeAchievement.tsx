import { convertNumberToCurrency } from '@/shared/utils/currency';

import { ProgressBar } from './Progressbar';

interface IAchievement {
  goalCharge: number;
  currentCharge: number;
  percent: number;
  dueDay: number;
}

// mock
const achievement: IAchievement = {
  goalCharge: 100000,
  currentCharge: 42000,
  percent: 42,
  dueDay: 11,
};

const ChallengeAchievement = () => {
  const { goalCharge, currentCharge, percent, dueDay } = achievement;

  const convertedCurrentCharge = convertNumberToCurrency({
    value: currentCharge,
    unitOfCurrency: '원',
  });

  const convertedGoalCharge = convertNumberToCurrency({
    value: goalCharge,
    unitOfCurrency: '원',
  });

  // TODO: 동호님에게 이렇게 오는지 물어보기
  const getDueDayPhrase = (dueDay: number) => {
    if (dueDay !== 1) {
      return `${dueDay}일 남았어요`;
    }
    return '오늘이 마지막 날이에요';
  };

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
          <p className="font-body-regular-sm text-gray-50">
            {getDueDayPhrase(dueDay)}
          </p>
        </div>
        <ProgressBar percent={percent} />
      </div>
    </div>
  );
};

export { ChallengeAchievement };
