/**
 * feat: mapKeys 구현
 * 객체의 키를 콜백 함수의 결과로 변환하여 새로운 객체를 반환합니다.
 */
export function mapKeys<T extends object>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => string
): { [key: string]: T[keyof T] } {
  // 1. 결과물을 담을 빈 객체 생성 (인덱스 시그니처 적용)
  const result: { [key: string]: T[keyof T] } = {};

  // 2. 원본 객체의 키들을 순회 (as를 통한 타입 단언)
  const keys = Object.keys(obj) as (keyof T)[];

  keys.forEach((key) => {
    const value = obj[key];
    
    // 3. 새로운 키 이름 생성
    const newKey = iteratee(value, key, obj);
    
    // 4. 새로운 키 위치에 원본 값 할당
    result[newKey] = value;
  });

  return result;
}