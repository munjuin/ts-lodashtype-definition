import { describe, it, expect } from 'vitest';
import { without } from './without'; // 혹은 'my-lodash' 별칭 사용

describe('without 함수 테스트', () => {
  it('지정된 단일 숫자를 배열에서 제거해야 한다', () => {
    expect(without([1, 2, 1, 3], 1)).toEqual([2, 3]);
  });

  it('지정된 여러 개의 숫자를 배열에서 동시에 제거해야 한다', () => {
    expect(without([1, 2, 3, 1, 2, 4], 1, 2)).toEqual([3, 4]);
  });

  it('제외할 목록에 없는 값을 넣어도 원본 배열이 유지되어야 한다', () => {
    expect(without([1, 2, 3], 4, 5)).toEqual([1, 2, 3]);
  });

  it('문자열 배열에서도 올바르게 작동해야 한다', () => {
    const fruits = ['apple', 'banana', 'cherry'];
    expect(without(fruits, 'banana')).toEqual(['apple', 'cherry']);
  });

  it('빈 배열이 들어오면 빈 배열을 반환해야 한다', () => {
    expect(without([], 1, 2)).toEqual([]);
  });

  it('원본 배열을 수정하지 않아야 한다 (불변성 체크)', () => {
    const original = [1, 2, 3];
    without(original, 1);
    expect(original).toEqual([1, 2, 3]);
  });
});