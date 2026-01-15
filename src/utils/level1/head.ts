/**
 * head 구현
 * 배열의 첫 번째 요소를 반환합니다. 빈 배열이면 undefined를 반환합니다.
 */
export function head<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}