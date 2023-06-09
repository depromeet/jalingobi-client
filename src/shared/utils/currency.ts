interface ConvertNumberToCurrencyProps {
  value: number;
  unitOfCurrency: string;
}
/**
 *
 * @example
 * convertNumberToCurrency({value: 10000, unitOfCurrency: '원'})
 * return '10,000 원'
 */
export const convertNumberToCurrency = ({
  value,
  unitOfCurrency,
}: ConvertNumberToCurrencyProps): string => {
  return `${new Intl.NumberFormat('en-US').format(value)}${unitOfCurrency}`;
};
