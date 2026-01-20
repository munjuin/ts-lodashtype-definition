import { describe, it, expect } from 'vitest';
import { uniq } from 'my-lodash';

describe('uniq 함수 테스트', () => {
  it('1. 숫자 중복을 제거해야 한다', () => {
    const input = [1, 2, 2, 3, 4, 4, 5];
    const result = uniq(input);
    
    // console.log 대신 expect를 사용해 검증합니다.
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('2. 문자열 중복을 제거해야 한다', () => {
    const input = ['ring', 'necklace', 'ring', 'earring'];
    const result = uniq(input);
    
    expect(result).toEqual(['ring', 'necklace', 'earring']);
  });

  it('3. 혼합 타입 중복을 제거해야 한다', () => {
    const input = [1, '1', 'apple', true, 'apple'];
    const result = uniq(input);
    
    expect(result).toEqual([1, '1', 'apple', true]);
  });

  it('4. 객체 배열은 참조가 다르면 중복으로 보지 않는다 (기본 uniq의 특징)', () => {
    const input = [
      { name: 'Gold Ring', price: 50000 },
      { name: 'Silver Ring', price: 30000 },
      { name: 'Silver Ring', price: 30000 }
    ];
    const result = uniq(input);
    
    // 객체는 내용이 같아도 참조가 다르면 별개로 취급됩니다.
    expect(result.length).toBe(3);
  });
});