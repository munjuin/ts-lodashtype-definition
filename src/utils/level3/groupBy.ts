/**
 * groupBy 구현
 * 콜백 함수 또는 객체의 키를 기준으로 데이터를 그룹화합니다.
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