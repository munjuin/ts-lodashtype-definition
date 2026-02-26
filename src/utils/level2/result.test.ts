import { describe, it, expect } from 'vitest';
import { result } from './result'; // 우리가 만든 함수를 가져옵니다.

describe('result 함수 테스트', () => {
  
  // [테스트 1] 일반적인 값을 가져오는 경우
  it('객체의 일반 속성 값을 그대로 반환해야 한다', () => {
    const object = { a: 1, b: 'hello' };
    
    // a를 요청하면 1이 나와야 함
    expect(result(object, 'a')).toBe(1);
    // b를 요청하면 'hello'가 나와야 함
    expect(result(object, 'b')).toBe('hello');
  });

  // [테스트 2] 함수가 들어있는 경우 (핵심!)
  it('속성 값이 함수라면 실행한 결과를 반환해야 한다', () => {
    const object = { 
      a: () => 10,
      b: (x: number) => x + 5 // 사실 lodash의 result는 인자를 넘기지 않지만, 함수인지만 체크합니다.
    };
    
    // a는 함수이므로 실행 결과인 10이 나와야 함
    expect(result(object, 'a')).toBe(10);
  });

  // [테스트 3] this 바인딩 확인 (매우 중요!)
  it('함수 실행 시 this가 해당 객체를 가리켜야 한다', () => {
    const object = {
      name: '주인님',
      greet: function() {
        return '안녕, ' + this.name;
      }
    };
    
    // .call(object) 덕분에 '안녕, 주인님'이 나와야 함
    expect(result(object, 'greet')).toBe('안녕, 주인님');
  });

  // [테스트 4] 기본값(defaultValue) 처리
  it('해당 경로에 값이 없으면 기본값을 반환해야 한다', () => {
    const object = { a: 1 };
    
    // 'b'는 없으므로 세 번째 인자인 'default'가 나와야 함
    expect(result(object, 'b' as any, 'default')).toBe('default');
  });

  // [테스트 5] 타입 추론 확인 (TypeScript 전용)
  it('반환 값의 타입이 올바르게 추론되어야 한다', () => {
    const object = {
      count: 100,
      getCount: () => 200
    };

    // result(object, 'count')의 타입은 number여야 함
    const count = result(object, 'count');
    // result(object, 'getCount')의 타입도 (함수가 아닌) number여야 함
    const getCount = result(object, 'getCount');

    expect(typeof count).toBe('number');
    expect(typeof getCount).toBe('number');
  });
});