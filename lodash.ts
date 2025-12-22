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
/**
 * [이슈 #4] get 함수를 위한 재귀적 경로 타입 설계
 */

// 1. 문자열 경로를 해석해서 타입을 찾아내는 마법의 타입 (재귀)
type GetType<T, P extends string> = 
  P extends `${infer Left}.${infer Right}` // 1단계: 'a.b.c'를 'a'와 'b.c'로 쪼갭니다.
    ? Left extends keyof T                  // 2단계: 'a'가 객체 T의 키인지 확인합니다.
      ? GetType<T[Left], Right>             // 3단계: 맞다면 'b.c'를 가지고 더 깊이 들어갑니다 (재귀).
      : any                                 // 키가 없으면 any를 반환합니다.
    : P extends keyof T                     // 쪼갤 게 없으면(마지막 단계), 해당 키가 있는지 확인합니다.
      ? T[P]                                // 있으면 그 타입을 반환!
      : any;                                // 없으면 any.

// 2. get 함수 설계 (오버로딩 생략하고 하나로 합친 버전)
export function get<T extends object, P extends string>(
  obj: T,
  path: P
): GetType<T, P>;

// 3. get 함수 구현 (알맹이)
export function get(obj: any, path: string): any {
  // 'a.b.c'를 ['a', 'b', 'c'] 배열로 바꾼 뒤 하나씩 타고 들어갑니다.
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, obj);
}

// head 함수 설계 및 구현
export function head<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

// compact 함수 설계 및 구현
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(
    (item): item is T => Boolean(item)
  )
}

// omit 함수 걸계 및 구현
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj } as any;
  for (const key of keys){
    delete result[key];
  }
  return result;
}