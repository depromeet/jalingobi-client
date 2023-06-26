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

  // TODO: 동호님에게 이렇게 오는지 물어보기
  const getDueDayPhrase = (dueDay: number) => {
    if (dueDay !== 1) {
      return `${dueDay}일 남았어요`;
    }
    return '오늘이 마지막 날이에요';
  };

  return {
    goalCharge: convertedCurrentCharge,
    currentCharge: convertedGoalCharge,
    percent,
    dueDay: getDueDayPhrase(dueDay),
  };
};
