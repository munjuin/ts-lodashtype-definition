import { describe, it, expect } from 'vitest';
import { mapValues } from './mapValues';

describe('mapValues 함수 테스트 (Level 2)', () => {
  const users = {
    'fred': { 'user': 'fred', 'age': 40 },
    'pebbles': { 'user': 'pebbles', 'age': 1 }
  };

  it('객체의 값을 지정된 규칙에 따라 변형해야 한다', () => {
    // 나이값만 뽑아내는 규칙
    const result = mapValues(users, (o) => o.age);
    expect(result).toEqual({ 'fred': 40, 'pebbles': 1 });
  });

  it('숫자 값을 계산하여 변형할 수 있어야 한다', () => {
    const scores = { 'math': 80, 'english': 90 };
    const result = mapValues(scores, (n) => n + 10);
    expect(result).toEqual({ 'math': 90, 'english': 100 });
  });

  it('빈 객체를 전달하면 빈 객체를 반환해야 한다', () => {
    expect(mapValues({}, (v) => v)).toEqual({});
  });

  it('null이나 undefined가 입력되면 빈 객체를 반환해야 한다', () => {
    expect(mapValues(null as any, (v) => v)).toEqual({});
    expect(mapValues(undefined as any, (v) => v)).toEqual({});
  });

  it('원본 객체를 수정하지 않아야 한다 (불변성)', () => {
    const object = { a: 1 };
    mapValues(object, (n) => n * 2);
    expect(object).toEqual({ a: 1 });
  });

  it('타입 추론이 정확하게 유지되어야 한다', () => {
    const object = { a: 'hello' };
    const result = mapValues(object, (v) => v.length);
    
    // result.a의 타입은 원본 키 'a'를 유지하면서 값은 number(length)여야 함
    const val: number = result.a;
    expect(val).toBe(5);
  });
});