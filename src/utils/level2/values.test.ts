import { describe, it, expect } from 'vitest';
import { values } from './values'; // 작성하신 values 함수 경로

describe('values 함수 테스트', () => {
  
  // [테스트 1] 기본적인 동작 확인
  it('객체의 모든 고유 속성 값들을 배열로 반환해야 한다', () => {
    const object = { a: 1, b: 'hello', c: true };
    const result = values(object);
    
    // 결과 배열에 값들이 포함되어 있는지 확인
    expect(result).toEqual([1, 'hello', true]);
    expect(result).toHaveLength(3);
  });

  // [테스트 2] 빈 객체 처리
  it('빈 객체가 주어지면 빈 배열을 반환해야 한다', () => {
    const object = {};
    const result = values(object);
    
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  // [테스트 3] null 및 undefined 처리 (방어 코드 확인)
  it('null이나 undefined가 주어지면 빈 배열을 반환해야 한다', () => {
    // 타입스크립트의 제약을 피해 테스트하기 위해 as any 사용
    expect(values(null as any)).toEqual([]);
    expect(values(undefined as any)).toEqual([]);
  });

  // [테스트 4] 상속받은 속성 제외 확인
  it('프로토타입 체인을 통해 상속받은 속성은 포함하지 않아야 한다', () => {
    const parent = { inherited: 'parent' };
    const child = Object.create(parent);
    child.own = 'child';

    const result = values(child);
    
    // 'own' 속성 값만 있어야 하며, 'inherited'는 없어야 함
    expect(result).toEqual(['child']);
    expect(result).not.toContain('parent');
  });

  // [테스트 5] 타입 추론 확인 (TypeScript 전용)
  it('반환된 배열의 타입이 Union 타입으로 잘 추론되어야 한다', () => {
    const object = {
      id: 1,
      name: 'Ju-in'
    };

    const result = values(object);

    // 이 시점에서 result의 타입은 (number | string)[] 이어야 합니다.
    // 테스트 코드 상에서는 값의 타입들을 확인합니다.
    result.forEach(value => {
      expect(['number', 'string']).toContain(typeof value);
    });
  });
});