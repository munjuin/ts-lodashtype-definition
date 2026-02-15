// ### 1. 개요
// 객체의 각 속성값(Value)을 `iteratee` 함수를 통해 변형하고, 기존의 키와 변형된 값을 가진 새로운 객체를 생성하는 `mapValues` 함수를 구현합니다.

// ### 2. 목적
// - 객체의 구조(키)는 유지하면서 내부 데이터만 일괄적으로 가공해야 할 때 사용합니다.
// - 예를 들어 API 응답 객체의 모든 가격 데이터에 통화를 붙이거나, 날짜 문자열을 Date 객체로 변환할 때 유용합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 소스 객체(`object`)를, 두 번째 인자로 변형 로직이 담긴 함수(`iteratee`)를 받습니다.
// - `iteratee`는 `(value, key, object)`를 인자로 받으며, 새로운 값으로 사용할 결과를 반환해야 합니다.
// - 원본 객체를 수정하지 않는 불변성을 유지하며, 새로운 객체를 반환합니다.
// - 타 함수(`has`, `mapKeys` 등)에 의존하지 않는 **독립적인 코드**로 구현합니다.
// - 타입스크립트의 **Mapped Types**를 활용하여, 변형된 값의 타입을 정확히 추론합니다.

// ### 4. 핵심 로직
// - `Object.keys()`를 사용하여 객체의 모든 키를 가져옵니다.
// - `for...of` 또는 `forEach`를 사용하여 각 키에 대해 `iteratee`를 실행합니다.
// - 기존 키를 그대로 사용하고, `iteratee`의 결과값을 해당 키의 새로운 값으로 할당합니다.
// - 결과 객체의 타입은 `{[K in keyof T]: R}` 형식을 사용하여 원본의 키 구조를 보존합니다.

export function mapValues<T extends object, R>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => R
): { [K in keyof T]: R } {
  // 1. 결과물을 담을 빈 객체 생성 (타입 캐스팅을 통해 결과 구조 명시)
  const result = {} as { [K in keyof T]: R };

  // 2. 방어 코드: 객체가 유효하지 않으면 즉시 빈 결과 반환
  if (object == null || typeof object !== 'object' || Array.isArray(object)) {
    return result;
  }

  // 3. 원본 객체의 모든 키를 수집합니다.
  const keys = Object.keys(object) as Array<keyof T>;

  // 4. 키 배열을 순회하며 로직 실행
  for (const key of keys) {
    const value = object[key];
    
    // 5. 기존 키를 그대로 사용하고, 값만 iteratee의 결과(R)로 할당합니다.
    result[key] = iteratee(value, key, object);
  }

  return result;
}