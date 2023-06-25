export const calculateDaysLeft = (startAt: string): number => {
  const startAtDate = new Date(startAt);
  const today = new Date();

  const diffInMilliseconds = startAtDate.getTime() - today.getTime();
  // Convert the difference from milliseconds to days
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);
  return Math.floor(diffInDays);
};
