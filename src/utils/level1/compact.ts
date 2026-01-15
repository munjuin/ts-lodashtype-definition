/**
 * compact 구현
 * 배열에서 falsy 값(null, 0, "", undefined 등)을 제거합니다.
 * Type Predicate(item is T)를 사용하여 타입을 좁힙니다.
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(
    (item): item is T => Boolean(item)
  );
}