import { describe, it, expect } from 'vitest';
import { nth } from './nth'; // 혹은 'my-lodash' 별칭 사용

describe('nth 함수 테스트', () => {
  const mockArray = [10, 20, 30, 40, 50];

  it('양수 인덱스가 주어지면 앞에서부터 해당 요소를 반환해야 한다', () => {
    expect(nth(mockArray, 0)).toBe(10);
    expect(nth(mockArray, 2)).toBe(30);
    expect(nth(mockArray, 4)).toBe(50);
  });

  it('음수 인덱스가 주어지면 뒤에서부터 해당 요소를 반환해야 한다', () => {
    expect(nth(mockArray, -1)).toBe(50);
    expect(nth(mockArray, -3)).toBe(30);
    expect(nth(mockArray, -5)).toBe(10);
  });

  it('인덱스가 배열의 범위를 양수 쪽으로 벗어나면 undefined를 반환해야 한다', () => {
    expect(nth(mockArray, 10)).toBe(undefined);
  });

  it('인덱스가 배열의 범위를 음수 쪽으로 벗어나면 undefined를 반환해야 한다', () => {
    expect(nth(mockArray, -10)).toBe(undefined);
  });

  it('빈 배열인 경우 어떤 인덱스든 undefined를 반환해야 한다', () => {
    expect(nth([], 0)).toBe(undefined);
    expect(nth([], -1)).toBe(undefined);
  });

  it('다양한 데이터 타입에 대해서도 제네릭이 올바르게 작동해야 한다', () => {
    const stringArray = ['a', 'b', 'c'];
    const objectArray = [{ id: 1 }, { id: 2 }];

    expect(nth(stringArray, 1)).toBe('b');
    expect(nth(objectArray, -1)).toEqual({ id: 2 });
  });
});