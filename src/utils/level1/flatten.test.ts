import { describe, it, expect } from 'vitest';
import { flatten } from './flatten';

describe('flatten 함수 테스트', () => {
  it('중첩된 배열을 한 단계 평탄화해야 한다', () => {
    const input = [1, [2, 3], [4]];
    expect(flatten(input)).toEqual([1, 2, 3, 4]);
  });

  it('깊게 중첩된 배열도 한 단계만 평탄화해야 한다 (Shallow)', () => {
    const input = [1, [2, [3, [4]]], 5];
    // [3, [4]] 부분은 배열 형태 그대로 유지되어야 합니다.
    expect(flatten(input)).toEqual([1, 2, [3, [4]], 5]);
  });

  it('이미 평탄한 배열은 그대로 복사해서 반환해야 한다', () => {
    const input = [1, 2, 3];
    const result = flatten(input);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input); // 불변성 확인
  });

  it('빈 배열은 빈 배열을 반환해야 한다', () => {
    expect(flatten([])).toEqual([]);
  });

  it('다양한 타입이 섞인 배열도 올바르게 평탄화해야 한다', () => {
    const input = ['a', ['b', 'c'], [true, false]];
    expect(flatten(input)).toEqual(['a', 'b', 'c', true, false]);
  });

  it('배열 내부의 빈 배열은 제거되는 효과가 있어야 한다', () => {
    const input = [1, [], 2];
    expect(flatten(input)).toEqual([1, 2]);
  });
});