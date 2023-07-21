import dayjs from 'dayjs';

import { calculateDaysLeft } from './time';

describe('calculateDaysLeft 함수', () => {
  it('오늘 날짜와 미래 날짜 사이의 날짜를 계산한다', () => {
    const futureDate = dayjs().add(7, 'day').format('YYYY-MM-DD'); // 미래의 날짜 (7일 후)
    expect(calculateDaysLeft(futureDate)).toBe(7);
  });

  it('입력 날짜가 오늘이거나 과거일 경우 0을 반환해야 한다.', () => {
    const pastDate = dayjs().subtract(7, 'day').format('YYYY-MM-DD'); // 과거의 날짜 (7일 전)
    expect(calculateDaysLeft(pastDate)).toBe(0);

    const today = dayjs().format('YYYY-MM-DD'); // 오늘 날짜
    expect(calculateDaysLeft(today)).toBe(0);
  });
});
