import { describe, it, expect } from 'vitest';
import { findKey } from './findKey';

describe('findKey 함수 테스트 (Level 2)', () => {
  const users = {
    'barney':  { 'age': 36, 'active': true },
    'fred':    { 'age': 40, 'active': false },
    'pebbles': { 'age': 1,  'active': true }
  };

  it('조건을 만족하는 첫 번째 키를 반환해야 한다', () => {
    // 나이가 40미만인 첫 번째 사용자 찾기 (barney)
    const result = findKey(users, (o) => o.age < 40);
    expect(result).toBe('barney');
  });

  it('조건을 만족하는 항목이 없으면 undefined를 반환해야 한다', () => {
    // 나이가 100세 이상인 사용자 찾기 (없음)
    const result = findKey(users, (o) => o.age > 100);
    expect(result).toBeUndefined();
  });

  it('콜백 함수에 (value, key, object) 인자가 정확히 전달되어야 한다', () => {
    const obj = { a: 1 };
    findKey(obj, (value, key, collection) => {
      expect(value).toBe(1);
      expect(key).toBe('a');
      expect(collection).toBe(obj);
      return true;
    });
  });

  it('객체의 값뿐만 아니라 키 이름을 조건으로 사용할 수 있어야 한다', () => {
    // 키 이름이 'f'로 시작하는 첫 번째 항목 찾기
    const result = findKey(users, (_, key) => key.startsWith('f'));
    expect(result).toBe('fred');
  });

  it('원본 객체를 수정하지 않아야 한다 (불변성)', () => {
    const copy = JSON.parse(JSON.stringify(users));
    findKey(users, (o) => o.active);
    expect(users).toEqual(copy);
  });

  it('빈 객체가 입력되면 undefined를 반환해야 한다', () => {
    expect(findKey({}, () => true)).toBeUndefined();
  });

  it('타입스크립트 추론이 올바르게 되는지 확인 (컴파일 시점 체크)', () => {
    const result = findKey(users, (o) => o.active);
    
    // result의 타입은 'barney' | 'fred' | 'pebbles' | undefined 여야 합니다.
    // 주인님, 이 부분은 실제 코드 에디터에서 result에 마우스를 올리면 확인 가능합니다!
    const validKeys: (keyof typeof users)[] = ['barney', 'fred', 'pebbles'];
    if (result) {
      expect(validKeys).toContain(result);
    }
  });
});