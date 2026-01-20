import { describe, it, expect } from 'vitest';
import { tail } from './tail';

describe('tail 함수 테스트', () => {
  it('배열의 첫 번째 요소를 제외한 나머지를 반환해야 한다', () => {
    expect(tail([1, 2, 3])).toEqual([2, 3]);
  });

  it('요소가 하나인 배열은 빈 배열을 반환해야 한다', () => {
    expect(tail([100])).toEqual([]);
  });

  it('빈 배열은 빈 배열을 반환해야 한다', () => {
    expect(tail([])).toEqual([]);
  });
});