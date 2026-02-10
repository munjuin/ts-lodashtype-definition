import { describe, it, expect } from 'vitest';
import { defaults } from './defaults';

describe('defaults 함수 상세 테스트', () => {
  it('기본 동작: 없는 속성을 채워주어야 한다', () => {
    const object = { a: 1 };
    const source = { b: 2 };
    expect(defaults(object, source)).toEqual({ a: 1, b: 2 });
  });

  it('기존 값 보호: 이미 값이 있는 속성은 덮어쓰지 않아야 한다', () => {
    const object = { a: 1 };
    const source = { a: 10, b: 2 };
    expect(defaults(object, source)).toEqual({ a: 1, b: 2 });
  });

  it('undefined 처리: 값이 undefined인 경우는 비어있다고 판단하고 채워야 한다', () => {
    const object = { a: undefined };
    const source = { a: 1 };
    expect(defaults(object, source)).toEqual({ a: 1 });
  });

  it('다중 소스: 여러 소스 객체가 올 때 먼저 나온 쪽이 우선순위를 가진다', () => {
    const object = { a: 1 };
    const source1 = { b: 2 };
    const source2 = { b: 100, c: 3 };
    // b는 source1에서 먼저 채워지므로 source2의 100은 무시됩니다.
    expect(defaults(object, source1, source2)).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('불변성: 원본 객체는 변함이 없어야 한다', () => {
    const object = { a: 1 };
    const result = defaults(object, { b: 2 });
    expect(result).not.toBe(object); // 서로 다른 객체여야 함
    expect(object).toEqual({ a: 1 }); // 원본 유지 확인
  });
});