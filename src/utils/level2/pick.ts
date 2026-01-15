/**
 * pick 구현
 * 객체에서 지정된 키들만 선택하여 새로운 객체를 반환합니다.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): { [P in K]: T[P] } {
  const result = {} as { [P in K]: T[P] };
  keys.forEach((key) => {
    (result as any)[key] = obj[key];
  });
  return result;
}