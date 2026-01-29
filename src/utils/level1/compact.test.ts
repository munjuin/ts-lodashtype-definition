import { describe, it, expect } from 'vitest';
import { compact } from './compact';

describe('compact 함수 테스트', () => {
  it('배열에서 모든 falsy 값(false, null, 0, "", undefined, NaN)을 제거해야 한다', () => {
    const input = [0, 1, false, 2, '', 3, null, undefined, NaN];
    expect(compact(input)).toEqual([1, 2, 3]);
  });

  it('모든 요소가 truthy인 경우 원본과 동일한 요소를 가진 새 배열을 반환해야 한다', () => {
    const input = [1, 'hello', true];
    const result = compact(input);
    expect(result).toEqual([1, 'hello', true]);
    expect(result).not.toBe(input); // 불변성 확인
  });

  it('빈 배열 입력 시 빈 배열을 반환해야 한다', () => {
    expect(compact([])).toEqual([]);
  });
});