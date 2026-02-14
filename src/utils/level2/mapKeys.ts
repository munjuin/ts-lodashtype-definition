// ### 1. 개요
// 객체의 각 속성(Key)을 `iteratee` 함수를 통해 변형하고, 변형된 키와 기존의 값을 가진 새로운 객체를 생성하는 `mapKeys` 함수를 구현합니다.

// ### 2. 목적
// - 객체의 키 형식을 일괄적으로 변경해야 할 때 사용합니다. (예: snake_case를 camelCase로 변환)
// - 기존 데이터를 유지하면서 식별자만 가공하여 새로운 데이터 구조를 만들 때 유용합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 소스 객체(`object`)를, 두 번째 인자로 변형 로직이 담긴 함수(`iteratee`)를 받습니다.
// - `iteratee`는 `(value, key, object)`를 인자로 받으며, 새로운 키로 사용할 값을 반환해야 합니다.
// - 원본 객체를 수정하지 않는 불변성을 유지하며, 새로운 객체를 반환합니다.
// - 타 함수에 의존하지 않는 **독립적인 코드**로 구현합니다.
// - 타입스크립트의 제네릭을 활용하여, 변형된 키의 타입과 기존 값의 타입을 정확히 연결합니다.

// ### 4. 핵심 로직
// - `Object.keys()`를 사용하여 객체의 모든 키를 배열로 가져옵니다.
// - `forEach` 또는 `reduce`를 사용하여 각 키에 대해 `iteratee`를 실행합니다.
// - `iteratee`가 반환한 새로운 값을 키로, 기존 객체의 값을 값으로 하여 결과 객체에 할당합니다.
// - 결과 객체의 타입은 `Record<PropertyKey, any>` 형식을 기반으로 하되, 가능한 한 정교하게 추론합니다.

export function mapKeys<T extends object, K2 extends PropertyKey>(
  object: T | null | undefined,
  iteratee: (value: T[keyof T], key: keyof T, object: T)=>K2
): Record<K2, T[keyof T]>{
  const result = {} as Record<K2, T[keyof T]>;

  if(object == null || typeof object !== 'object' || Array.isArray(object)){
    return result;
  }

  const keys = Object.keys(object) as Array<keyof T>;

  for(const key of keys){
    const value = object[key];

    const newKey = iteratee(value, key, object);

    result [newKey] = value;
  }

  return result;
}