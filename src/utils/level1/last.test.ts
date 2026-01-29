import { describe, it, expect } from 'vitest';
import { last } from './last';

describe('last 함수 테스트', () => {
  it('배열의 마지막 요소를 정확히 반환해야 한다', () => {
    expect(last([1, 2, 3])).toBe(3);
    expect(last(['a', 'b'])).toBe('b');
  });

  it('빈 배열 입력 시 undefined를 반환해야 한다', () => {
    expect(last([])).toBeUndefined();
  });
});