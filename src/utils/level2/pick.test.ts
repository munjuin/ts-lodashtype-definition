import { describe, it, expect } from 'vitest';
import { pick } from './pick';

describe('pick 함수 테스트 (Level 2)', () => {
  const object = { 'a': 1, 'b': '2', 'c': 3 };

  it('지정된 키들에 해당하는 속성만 선택해야 한다', () => {
    const result = pick(object, ['a', 'c']);
    expect(result).toEqual({ 'a': 1, 'c': 3 });
    expect(result).not.toHaveProperty('b');
  });

  it('객체에 존재하지 않는 키는 무시해야 한다', () => {
    // @ts-expect-error: 의도적으로 잘못된 키를 넣는 테스트
    const result = pick(object, ['a', 'z']);
    expect(result).toEqual({ 'a': 1 });
  });

  it('빈 배열을 전달하면 빈 객체를 반환해야 한다', () => {
    expect(pick(object, [])).toEqual({});
  });

  it('원본 객체를 수정하지 않아야 한다 (불변성)', () => {
    const copy = { ...object };
    pick(object, ['a']);
    expect(object).toEqual(copy);
  });

  it('타입스크립트 Pick 유틸리티 타입이 올바르게 적용되어야 한다', () => {
    const result = pick(object, ['a']);
    // result의 타입은 { a: number }로 추론되어야 합니다.
    // 주인님, 여기서 result.b에 접근하려고 하면 타입 에러가 발생하게 됩니다!
    expect(result.a).toBe(1);
  });
});