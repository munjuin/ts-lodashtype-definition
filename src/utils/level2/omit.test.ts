import { describe, it, expect } from 'vitest';
import { omit } from './omit';

describe('omit 함수 테스트 (Level 2)', () => {
  const object = { 'a': 1, 'b': '2', 'c': 3 };

  it('지정된 키들을 제외한 나머지 속성들만 포함해야 한다', () => {
    const result = omit(object, ['a', 'c']);
    expect(result).toEqual({ 'b': '2' });
    expect(result).not.toHaveProperty('a');
    expect(result).not.toHaveProperty('c');
  });

  it('객체에 존재하지 않는 키를 제외하려고 해도 나머지는 정상 반환해야 한다', () => {
    // @ts-expect-error: 의도적으로 존재하지 않는 키 'z'를 넣음
    const result = omit(object, ['z']);
    expect(result).toEqual({ 'a': 1, 'b': '2', 'c': 3 });
  });

  it('빈 배열을 전달하면 원본과 동일한 내용의 새 객체를 반환해야 한다', () => {
    const result = omit(object, []);
    expect(result).toEqual(object);
    expect(result).not.toBe(object); // 참조가 달라야 함
  });

  it('원본 객체를 수정하지 않아야 한다 (불변성)', () => {
    const copy = { ...object };
    omit(object, ['a']);
    expect(object).toEqual(copy);
  });

  it('타입스크립트 Omit 유틸리티 타입이 올바르게 적용되어야 한다', () => {
    const result = omit(object, ['a', 'b']);
    // result의 타입은 { c: number }로 추론되어야 합니다.
    expect(result.c).toBe(3);
    // @ts-expect-error: 'a'는 제거되었으므로 접근 시 타입 에러 발생
    console.log(result.a);
  });
});