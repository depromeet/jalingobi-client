import { isActiveChallenge } from './date';

describe('isActiveChallenge', () => {
  it('startAt 또는 endAt이 제공되지 않으면 false를 반환합니다', () => {
    expect(isActiveChallenge({ startAt: '', endAt: '2023-07-22' })).toBeFalsy();
    expect(isActiveChallenge({ startAt: '2023-07-20', endAt: '' })).toBeFalsy();
  });

  it('현재 날짜가 startAt 이전이면 false를 반환합니다', () => {
    expect(
      isActiveChallenge({ startAt: '2023-07-22', endAt: '2023-07-23' }),
    ).toBeFalsy();
  });

  it('현재 날짜가 endAt 이후면 false를 반환합니다', () => {
    expect(
      isActiveChallenge({ startAt: '2023-07-19', endAt: '2023-07-20' }),
    ).toBeFalsy();
  });

  it('현재 날짜가 startAt과 endAt의 범위 내에 있으면 true를 반환합니다', () => {
    expect(
      isActiveChallenge({ startAt: '2023-07-21', endAt: '2023-07-22' }),
    ).toBeTruthy();
  });

  it('현재 날짜가 startAt과 endAt의 범위 내에 있으면 true를 반환합니다', () => {
    expect(
      isActiveChallenge({ startAt: '2023-07-20', endAt: '2023-07-21' }),
    ).toBeTruthy();
  });
});
