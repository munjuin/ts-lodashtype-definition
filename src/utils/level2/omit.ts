/**
 * omit 구현
 * 객체에서 특정 키들을 제외한 새로운 객체를 반환합니다.
 */
// export function omit<T extends object, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ): Omit<T, K> {
//   const result = { ...obj } as any;
//   for (const key of keys) {
//     delete result[key];
//   }
//   return result;
// }

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  // 1. 결과물을 담을 빈 객체 생성
  // 최종적으로 Omit<T, K> 타입이 될 것이라고 타입 단언(as)을 합니다.
  const result = {} as Omit<T, K>;

  // 2. 원본 객체의 모든 키를 가져옵니다.
  const allKeys = Object.keys(obj) as (keyof T)[];

  // 3. 전체 키 중에서 제외할 키(keys)에 포함되지 않은 것만 골라냅니다.
  allKeys.forEach((key) => {
    // keys 배열에 현재 key가 포함되어 있지 않다면 (제외 대상이 아니라면)
    if (!keys.includes(key as any)) {
      // 4. 결과 객체에 값을 복사합니다.
      // 타입 안전성을 위해 as any를 사용하여 값을 할당합니다.
      (result as any)[key] = obj[key];
    }
  });

  return result;
}