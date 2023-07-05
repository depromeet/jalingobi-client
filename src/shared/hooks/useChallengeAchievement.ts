import { ChallengeAchievementResponse } from '@/shared/types/feed';

import { convertNumberToCurrency } from '../utils/currency';

export const useConvertChallengeAcievement = (
  data: ChallengeAchievementResponse | null,
) => {
  if (!data) {
    return {
      goalCharge: '',
      currentCharge: '',
      percent: 0,
      dueDay: '',
    };
  }

  const { goalCharge, currentCharge, percent, dueDay } = data.result;

  const convertedCurrentCharge = convertNumberToCurrency({
    value: currentCharge,
    unitOfCurrency: '원',
  });

  const convertedGoalCharge = convertNumberToCurrency({
    value: goalCharge,
    unitOfCurrency: '원',
  });

  const getDueDayPhrase = (dueDay: number) => {
    if (dueDay !== 0) {
      return `${dueDay}일 남음`;
    }
    return '오늘 종료';
  };

  return {
    goalCharge: convertedGoalCharge,
    currentCharge: convertedCurrentCharge,
    percent,
    dueDay: getDueDayPhrase(dueDay),
  };
};
