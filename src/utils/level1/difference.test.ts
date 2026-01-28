import { describe, it, expect } from 'vitest';
import { difference } from './difference';

describe('difference 함수 테스트', () => {
  it('기본적인 숫자 배열의 차집합을 구해야 한다', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
  });

  it('여러 개의 제외 배열이 주어져도 모두 제외해야 한다', () => {
    // [1, 2, 3, 4]에서 [2], [3]을 제외하면 [1, 4]가 남아야 함
    expect(difference([1, 2, 3, 4], [2], [3])).toEqual([1, 4]);
  });

  it('중복된 요소가 있어도 기준 배열의 순서와 중복을 유지하며 제외해야 한다', () => {
    // 기준 배열의 1이 두 개일 때, 제외 대상에 1이 있으면 모두 사라짐
    expect(difference([1, 1, 2], [2])).toEqual([1, 1]);
  });

  it('제외할 배열이 비어있으면 원본의 복사본을 반환해야 한다', () => {
    const input = [1, 2, 3];
    const result = difference(input, []);
    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(input); // 불변성 확인
  });

  it('다양한 타입이 섞인 경우에도 정확히 비교해야 한다', () => {
    expect(difference<string | number>([1, 'a', 2], [1, 'b'])).toEqual(['a', 2]);
  });

  it('결과가 없을 경우 빈 배열을 반환해야 한다', () => {
    expect(difference([1, 2], [1, 2, 3])).toEqual([]);
  });
});