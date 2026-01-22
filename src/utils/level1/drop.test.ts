import { describe, it, expect } from 'vitest';
import { drop } from './drop';

describe('drop 함수 테스트', () => {
  const mockArray = [1, 2, 3, 4, 5];

  it('n이 주어지지 않으면 기본적으로 첫 번째 요소를 제거해야 한다', () => {
    expect(drop(mockArray)).toEqual([2, 3, 4, 5]);
  });

  it('지정된 n개의 요소를 앞에서부터 제거해야 한다', () => {
    expect(drop(mockArray, 2)).toEqual([3, 4, 5]);
    expect(drop(mockArray, 4)).toEqual([5]);
  });

  it('n이 0이면 원본 배열과 동일한 요소를 가진 배열을 반환해야 한다', () => {
    expect(drop(mockArray, 0)).toEqual([1, 2, 3, 4, 5]);
  });

  it('n이 배열의 길이보다 크면 빈 배열을 반환해야 한다', () => {
    expect(drop(mockArray, 10)).toEqual([]);
  });

  it('n이 음수이면 원본 배열을 그대로 반환해야 한다', () => {
    expect(drop(mockArray, -1)).toEqual([1, 2, 3, 4, 5]);
  });

  it('빈 배열에 대해 호출하면 빈 배열을 반환해야 한다', () => {
    expect(drop([], 5)).toEqual([]);
  });

  it('원본 배열을 수정하지 않아야 한다 (불변성 체크)', () => {
    const original = [1, 2, 3];
    drop(original, 1);
    expect(original).toEqual([1, 2, 3]);
  });
});