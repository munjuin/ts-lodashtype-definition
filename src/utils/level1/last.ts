/**
 * last 구현
 * 배열의 마지막 요소를 반환합니다. 빈 배열이면 undefined를 반환합니다.
 */
export function last<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}
