import { describe, it, expect } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys 함수 테스트 (Level 2)', () => {
  it('객체의 키를 지정된 규칙에 따라 변형해야 한다', () => {
    const object = { 'a': 1, 'b': 2 };
    // 모든 키 앞에 'key_'를 붙이는 규칙
    const result = mapKeys(object, (value, key) => 'key_' + key);
    
    expect(result).toEqual({ 'key_a': 1, 'key_b': 2 });
  });

  it('키를 숫자로 변형해도 정상적으로 작동해야 한다', () => {
    const object = { '1': 'a', '2': 'b' };
    // 키 문자열을 숫자로 바꾸는 규칙
    const result = mapKeys(object, (value, key) => Number(key) * 10);
    
    expect(result).toEqual({ 10: 'a', 20: 'b' });
  });

  it('빈 객체를 전달하면 빈 객체를 반환해야 한다', () => {
    expect(mapKeys({}, (v, k) => k)).toEqual({});
  });

  it('객체가 null이나 undefined인 경우 빈 객체를 반환해야 한다', () => {
    expect(mapKeys(null as any, (v, k) => k)).toEqual({});
    expect(mapKeys(undefined as any, (v, k) => k)).toEqual({});
  });

  it('원본 객체를 수정하지 않아야 한다 (불변성)', () => {
    const object = { a: 1 };
    mapKeys(object, (v, k) => k + '!');
    expect(object).toEqual({ a: 1 });
  });

  it('타입 추론이 정확하게 이루어져야 한다', () => {
    const object = { a: 1 };
    const result = mapKeys(object, () => 'newKey' as const);
    
    // result의 값은 원본의 값 타입인 number여야 합니다.
    const val: number = result.newKey;
    expect(val).toBe(1);
  });
});