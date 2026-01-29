import { describe, it, expect } from 'vitest';
import { initial } from './initial';

describe('initial 함수 테스트', () => {
  it('마지막 요소를 제외한 모든 요소를 담은 배열을 반환해야 한다', () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
  });

  it('요소가 하나인 배열 입력 시 빈 배열을 반환해야 한다', () => {
    expect(initial([1])).toEqual([]);
  });

  it('빈 배열 입력 시 빈 배열을 반환해야 한다', () => {
    expect(initial([])).toEqual([]);
  });
});