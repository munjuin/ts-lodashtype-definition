import { describe, it, expect } from 'vitest';
import { invert } from './invert';

describe('invert 함수 테스트 (Level 2)', () => {
  
  it('객체의 키와 값을 성공적으로 뒤바꾸어야 한다', () => {
    const input = { a: '1', b: '2', c: '3' };
    const result = invert(input);
    
    // 결과 확인: 값들이 키가 되고, 키들이 값이 됨
    expect(result).toEqual({ '1': 'a', '2': 'b', '3': 'c' });
  });

  it('숫자 형태의 값을 문자열 키로 변환해야 한다 (요구사항 3-4)', () => {
    const input = { a: 1, b: 2 };
    const result = invert(input);
    
    // JS 객체 특성상 키는 무조건 문자열이 됨
    expect(result).toEqual({ '1': 'a', '2': 'b' });
    expect(Object.keys(result)[0]).toBe('1'); // 키의 타입이 문자열인지 확인
  });

  it('중복된 값이 있을 경우 나중에 나온 키가 이겨야 한다 (요구사항 3-3: Last-in-wins)', () => {
    const input = { a: 1, b: 1, c: 2 };
    const result = invert(input);
    
    // '1'이라는 값에 대해 'a'가 먼저 들어왔지만 'b'가 덮어씌움
    expect(result).toEqual({ '1': 'b', '2': 'c' });
  });

  it('원본 객체를 수정하지 않는 불변성을 유지해야 한다 (요구사항 3-5)', () => {
    const input = { a: 1 };
    const result = invert(input);
    
    expect(result).not.toBe(input); // 참조값이 달라야 함
    expect(input).toEqual({ a: 1 }); // 원본은 그대로여야 함
  });

  it('비정상적인 입력(배열, null 등)에 대해 빈 객체를 반환해야 한다 (방어 코드)', () => {
    // @ts-ignore: 테스트를 위해 잘못된 타입 주입
    expect(invert(null)).toEqual({});
    // @ts-ignore
    expect(invert([1, 2, 3])).toEqual({});
    // @ts-ignore
    expect(invert('string')).toEqual({});
  });

  it('타입스크립트 추론이 올바르게 되는지 확인 (컴파일 시점 체크)', () => {
    const user = { name: '주인', age: 25 };
    const result = invert(user);
    
    // 이 부분은 테스트 실행 시점이 아니라 코드 작성 시점에 
    // result['주인']에 마우스를 올리면 'name' | 'age'라고 떠야 합니다.
    const value: 'name' | 'age' = result['주인'];
    expect(['name', 'age']).toContain(value);
  });
});