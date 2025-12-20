// lodash.d.ts

declare module 'my-lodash' {
  /**
   * 1. 함수(Iteratee)를 사용하여 그룹화하는 경우
   * @param collection 타입을 추적할 배열 <T>
   * @param iteratee 각 요소를 받아 키(string/number)를 반환하는 함수
   */
  export function groupBy<T>(
    collection: T[],
    iteratee: (value: T) => string | number
  ): { [key: string]: T[] };

  /**
   * 2. 객체의 속성 이름(Key)을 사용하여 그룹화하는 경우
   * @template T 배열 요소 타입 (객체여야 함)
   * @template K T 객체의 키 이름 중 하나
   */
  export function groupBy<T extends object, K extends keyof T>(
    collection: T[],
    iteratee: K
  ): { [key: string]: T[] };
}