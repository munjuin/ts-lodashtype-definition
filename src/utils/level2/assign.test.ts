import { describe, it, expect } from 'vitest';
import { assign } from './assign';

describe('assign 함수 테스트 (Level 2)', () => {
  it('두 객체를 하나로 합쳐야 한다', () => {
    const object = { a: 1 };
    const source = { b: 2 };
    const result = assign(object, source);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('동일한 키가 있을 경우 나중에 오는 소스가 앞의 값을 덮어써야 한다', () => {
    const object = { a: 1, b: 1 };
    const source = { b: 2 };
    const result = assign(object, source);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('여러 개의 소스 객체를 한꺼번에 합칠 수 있어야 한다', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { c: 3, a: 0 };
    
    // a는 source2에 의해 0으로 덮어씌워져야 함
    const result = assign(object, source1, source2);

    expect(result).toEqual({ a: 0, b: 2, c: 3 });
  });

  it('원본 객체를 수정하지 않아야 한다 (불변성 유지)', () => {
    const object = { a: 1 };
    const source = { b: 2 };
    assign(object, source);

    // 원본은 그대로 { a: 1 }이어야 함
    expect(object).toEqual({ a: 1 });
  });

  it('소스가 null이나 undefined인 경우 무시하고 진행해야 한다', () => {
    const object = { a: 1 };
    // @ts-ignore: 의도적인 테스트
    const result = assign(object, null, undefined, { b: 2 });

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('결과물은 원본 객체와 참조가 다른 새로운 객체여야 한다', () => {
    const object = { a: 1 };
    const result = assign(object, {});

    expect(result).not.toBe(object);
  });

  it('타입스크립트 자동 완성이 병합된 키들을 인식해야 한다', () => {
    const object = { name: '주인' };
    const source = { age: 25 };
    const result = assign(object, source);

    // 테스트 코드 상에서 타입 에러가 나지 않는지 확인하는 용도
    expect(result.name).toBe('주인');
    expect(result.age).toBe(25);
  });
});