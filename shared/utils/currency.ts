export const transferToCurrencyForm = (
  value: number,
  unitOfCurrency: string,
): string => {
  return `${new Intl.NumberFormat('en-US').format(value)} ${unitOfCurrency}`;
};
