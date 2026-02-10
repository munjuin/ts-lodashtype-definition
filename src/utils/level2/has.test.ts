import { describe, it, expect } from 'vitest';
import { has } from './has';

describe('has 함수 테스트 (Level 2)', () => {
  it('객체가 직접 소유한 속성에 대해 true를 반환해야 한다', () => {
    const object = { a: 1, b: 2 };
    expect(has(object, 'a')).toBe(true);
    expect(has(object, 'b')).toBe(true);
  });

  it('객체에 없는 속성에 대해 false를 반환해야 한다', () => {
    const object = { a: 1 };
    expect(has(object, 'c')).toBe(false);
  });

  it('상속받은 속성(Prototype)에 대해서는 false를 반환해야 한다', () => {
    const object = { a: 1 };
    // toString은 모든 객체가 상속받는 속성이지만, 직접 소유한 것은 아닙니다.
    expect(has(object, 'toString')).toBe(false);
    expect(has(object, 'hasOwnProperty')).toBe(false);
  });

  it('null이나 undefined가 입력되면 false를 반환해야 한다', () => {
    expect(has(null, 'a')).toBe(false);
    expect(has(undefined, 'a')).toBe(false);
  });

  it('심볼(Symbol) 키도 정확히 인식해야 한다', () => {
    const sym = Symbol('test');
    const object = { [sym]: 'value' };
    expect(has(object, sym)).toBe(true);
  });

  it('타입 가드(Type Guard)가 정상 작동해야 한다', () => {
    const obj: { a?: number } = { a: 1 };
    
    if (has(obj, 'a')) {
      // 이 블록 안에서 obj.a는 확실히 존재하는 값이 됩니다.
      const val: number = obj.a; 
      expect(val).toBe(1);
    }
  });
});