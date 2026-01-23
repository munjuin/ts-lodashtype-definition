import { describe, it, expect } from 'vitest';
import { take } from './take';

describe('take 함수 테스트', () => {
  const mockArray = [10, 20, 30, 40, 50];

  it('n이 주어지지 않으면 기본적으로 첫 번째 요소 하나만 담긴 배열을 반환해야 한다', () => {
    expect(take(mockArray)).toEqual([10]);
  });

  it('지정된 n개의 요소를 앞에서부터 가져와야 한다', () => {
    expect(take(mockArray, 2)).toEqual([10, 20]);
    expect(take(mockArray, 3)).toEqual([10, 20, 30]);
  });

  it('n이 0이면 빈 배열을 반환해야 한다', () => {
    expect(take(mockArray, 0)).toEqual([]);
  });

  it('n이 배열의 길이보다 크면 배열 전체의 복사본을 반환해야 한다', () => {
    const result = take(mockArray, 10);
    expect(result).toEqual([10, 20, 30, 40, 50]);
    expect(result).not.toBe(mockArray); // 복사본인지 확인 (참조값 비교)
  });

  it('n이 음수이면 빈 배열을 반환해야 한다', () => {
    expect(take(mockArray, -5)).toEqual([]);
  });

  it('빈 배열에 대해 호출하면 빈 배열을 반환해야 한다', () => {
    expect(take([], 5)).toEqual([]);
  });

  it('원본 배열을 수정하지 않아야 한다 (불변성 체크)', () => {
    const original = ['a', 'b', 'c'];
    take(original, 2);
    expect(original).toEqual(['a', 'b', 'c']);
  });
});