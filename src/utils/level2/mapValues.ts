/**
 * mapValues 구현
 * 객체의 각 속성 값을 콜백 함수를 통해 변환하여 새로운 객체를 반환합니다.
 */
export function mapValues<T extends object, V>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => V
): { [K in keyof T]: V } {
  // 1. 결과물을 담을 빈 객체를 만듭니다. 
  // 아직 비어있지만 결국 설계도대로 완성될 것이라고 타입스크립트에게 알려줍니다(as).
  const result = {} as { [K in keyof T]: V };

  // 2. 객체의 키 목록을 뽑아서 순회합니다.
  // Object.keys는 string[]을 뱉기 때문에, T의 키라는 것을 명시해줍니다(as).
  const keys = Object.keys(obj) as (keyof T)[];

  keys.forEach((key) => {
    const value = obj[key];
    // 3. 콜백 함수를 실행해서 나온 새로운 값을 결과 객체에 담습니다.
    result[key] = iteratee(value, key, obj);
  });

  return result;
}