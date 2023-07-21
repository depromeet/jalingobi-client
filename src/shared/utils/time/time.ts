import dayjs from 'dayjs';

export const calculateDaysLeft = (startAt: string): number => {
  const startAtDate = dayjs(startAt);
  const today = dayjs().startOf('day');

  const diffInDays = startAtDate.diff(today, 'day');
  return Math.max(0, diffInDays);
};

export const isNewChallenge = (challengeDate: string): string => {
  const now = new Date();
  const challengeDateObject = new Date(challengeDate);
  const diffInDays =
    (now.getTime() - challengeDateObject.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays < 3 ? 'NEW' : '';
};

export const isChallengeDueSoon = (deadline?: string): string => {
  if (!deadline) return '';
  const now = new Date();
  const deadlineDateObject = new Date(deadline);
  const diffInDays =
    (deadlineDateObject.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diffInDays < 3 ? 'Due soon' : '';
};
