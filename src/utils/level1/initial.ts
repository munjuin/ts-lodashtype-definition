/**
 * initial 구현
 * 배열의 마지막 요소를 제외한 나머지 요소들로 구성된 새 배열을 반환합니다.
 */
export function initial<T>(array: T[]): T[] {
  return array.length > 0 ? array.slice(0, -1) : [];
}