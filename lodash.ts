/**
 * [이슈 #2] groupBy
 */
export function groupBy<T>(
  collection: T[],
  iteratee: (value: T) => string | number
): { [key: string]: T[] };

export function groupBy<T extends object, K extends keyof T>(
  collection: T[],
  iteratee: K
): { [key: string]: T[] };

export function groupBy(collection: any[], iteratee: any): any {
  return collection.reduce((result, value) => {
    const key = typeof iteratee === 'function' ? iteratee(value) : value[iteratee];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
    return result;
  }, {});
}

/**
 * [이슈 #3] debounce 설계 및 구현
 * * 1. <F extends (...args: any[]) => any>: 
 * - F라는 변수에 "원본 함수의 모든 정보(인자 타입, 개수, 리턴 타입)"를 통째로 저장합니다.
 * * 2. 리턴 타입 F & { cancel(): void; flush(): void }:
 * - 결과물은 원본 함수(F)의 모습이면서 동시에 두 개의 메서드를 가진 '하이브리드' 타입입니다.
 */

export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): F & { cancel(): void; flush(): void };

// 실제 일하는 알맹이 (Implementation)
export function debounce(func: (...args: any[]) => any, wait: number): any {
  let timeoutId: any = null;
  let lastArgs: any[] = [];

  // 원본 함수의 인자를 그대로 받아내는 래퍼 함수
  const debounced = function (this: any, ...args: any[]) {
    lastArgs = args;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, lastArgs);
      timeoutId = null;
    }, wait);
  };

  // 취소 기능 추가
  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  // 즉시 실행 기능 추가
  debounced.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    func.apply(null, lastArgs);
  };

  return debounced;
}
