import { describe, it, expect } from 'vitest';
import { chunk } from './chunk';

describe('chunk 함수 테스트', () => {
  const mockArray = [1, 2, 3, 4, 5];

  it('기본값(size=1)으로 배열을 하나씩 나누어야 한다', () => {
    expect(chunk(mockArray)).toEqual([[1], [2], [3], [4], [5]]);
  });

  it('지정된 size만큼 배열을 나누어야 한다', () => {
    expect(chunk(mockArray, 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk(mockArray, 3)).toEqual([[1, 2, 3], [4, 5]]);
  });

  it('size가 배열의 길이보다 크면 배열 전체를 하나의 덩어리로 반환해야 한다', () => {
    expect(chunk(mockArray, 10)).toEqual([[1, 2, 3, 4, 5]]);
  });

  it('size가 0이나 음수이면 빈 배열을 반환해야 한다', () => {
    expect(chunk(mockArray, 0)).toEqual([]);
    expect(chunk(mockArray, -5)).toEqual([]);
  });

  it('빈 배열이 들어오면 빈 배열을 반환해야 한다', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it('다양한 데이터 타입에 대해서도 올바르게 작동해야 한다', () => {
    const stringArray = ['a', 'b', 'c', 'd'];
    expect(chunk(stringArray, 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  it('원본 배열을 수정하지 않아야 한다 (불변성 체크)', () => {
    const original = [1, 2, 3];
    chunk(original, 1);
    expect(original).toEqual([1, 2, 3]);
  });
});