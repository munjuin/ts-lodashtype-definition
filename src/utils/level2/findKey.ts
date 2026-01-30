// ### 1. 개요
// 객체를 순회하며 콜백 함수(predicate)의 조건을 만족하는 첫 번째 키(Key)를 찾아 반환하는 `findKey` 함수를 구현합니다.

// ### 2. 목적
// - 객체 내에서 특정 조건을 충족하는 데이터의 '식별자(Key)'를 확보해야 할 때 사용합니다.
// - 배열의 `findIndex`와 유사한 역할을 객체 단위에서 수행하기 위함입니다.

// ### 3. 요구사항
// - 첫 번째 인자로 대상 객체(object)를, 두 번째 인자로 조건 검사 함수(predicate)를 받습니다.
// - 콜백 함수는 `(value, key, object)` 형태의 인자를 지원해야 합니다.
// - 조건을 만족하는 키를 찾으면 즉시 해당 키를 반환하고 순회를 종료합니다.
// - 만족하는 키가 없으면 `undefined`를 반환합니다.
// - 원본 객체의 불변성을 유지하며, 타입스크립트 제네릭을 통해 반환되는 키의 타입을 `keyof T | undefined`로 정확히 추론합니다.

// ### 4. 핵심 로직
// - `Object.keys()`를 사용하여 객체의 키 목록을 배열로 가져옵니다.
// - `for...of` 루프 또는 `find` 메서드를 사용하여 각 키를 순회합니다.
// - 각 순회 단계에서 `predicate(object[key], key, object)`를 실행하여 결과가 `true`인지 확인합니다.
// - 일치하는 항목 발견 시 즉시 `return key`를 실행합니다

export function findKey<T extends object>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T, collection: T) => boolean
): keyof T | undefined {
  // 1. 방어 코드: 객체가 아니거나 null인 경우 안전하게 undefined 반환
  if (!object || typeof object !== 'object' || Array.isArray(object)) {
    return undefined;
  }

  // 2. Object.keys를 사용하여 객체의 모든 키를 배열로 가져옵니다.
  // 이때 타입스크립트가 키의 타입을 정확히 알 수 있도록 'as Array<keyof T>'로 단언해줍니다.
  const keys = Object.keys(object) as Array<keyof T>;

  // 3. 키 배열을 순회합니다. (for...of 루프 사용)
  // for...of는 중간에 return을 만나면 즉시 함수를 종료하므로 성능상 유리합니다.
  for (const key of keys) {
    const value = object[key];

    // 4. 콜백 함수(predicate)를 실행하여 조건에 맞는지 확인합니다.
    // 요구사항에 따라 (값, 키, 전체객체)를 인자로 전달합니다.
    if (predicate(value, key, object)) {
      // 조건을 만족하는 첫 번째 키를 발견하면 즉시 반환하고 종료!
      return key;
    }
  }

  // 5. 끝까지 돌았는데도 만족하는 키가 없다면 undefined를 반환합니다.
  return undefined;
}