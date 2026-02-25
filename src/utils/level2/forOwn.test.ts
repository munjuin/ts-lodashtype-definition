import { describe, it, expect, vi } from 'vitest';
import { forOwn } from './forOwn';

describe('forOwn 함수 테스트', () => {
  it('객체의 모든 고유 속성을 순회해야 한다', () => {
    const object = { a: 1, b: 2 };
    const result: any[] = [];

    forOwn(object, (value, key) => {
      result.push([key, value]);
    });

    expect(result).toEqual([['a', 1], ['b', 2]]);
  });

  it('상속받은 속성은 순회하지 않아야 한다', () => {
    const parent = { inherited: true };
    const child = Object.create(parent);
    child.own = 'yes';

    const keys: string[] = [];
    forOwn(child, (value, key) => {
      keys.push(key as string);
    });

    // inherited는 나오지 않아야 함
    expect(keys).toEqual(['own']);
    expect(keys).not.toContain('inherited');
  });
});