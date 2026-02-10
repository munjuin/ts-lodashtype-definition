// ### 1. 개요
// 객체가 특정 속성(Key)을 상속받은 프로토타입 체인이 아닌, 자기 자신이 직접 소유하고 있는지 확인하는 `has` 함수를 구현합니다.

// ### 2. 목적
// - 자바스크립트의 `in` 연산자는 상속받은 속성까지 `true`를 반환하므로, 이를 방지하고 객체 본인의 고유한 데이터인지 검증하기 위함입니다.
// - 객체 내 특정 키의 존재 여부를 런타임에서 안전하게 확인하여 타입 안전성을 확보합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 대상 객체(`object`)를, 두 번째 인자로 확인할 키(`key`)를 받습니다.
// - 객체가 해당 키를 직접 소유(`Own Property`)하고 있다면 `true`, 아니면 `false`를 반환합니다.
// - `null`이나 `undefined`가 인자로 들어올 경우 에러 없이 `false`를 반환해야 합니다.
// - 타입스크립트의 **Type Guard**(`is` 키워드)를 활용하여, 함수가 `true`를 반환할 경우 해당 블록 내에서 객체에 키가 존재함을 타입 시스템이 인지하도록 설계합니다.

// ### 4. 핵심 로직
// - `Object.prototype.hasOwnProperty.call(object, key)`를 사용하여 객체 자체에 `hasOwnProperty` 메서드가 덮어씌워진 경우에도 안전하게 작동하도록 구현합니다.
// - 반환 타입을 `key is keyof T`로 정의하여 조건문 통과 시 타입 추론이 가능하게 합니다.
// - 객체 유효성 검사(null/undefined 체크)를 선행합니다.

export function has<T extends object, K extends PropertyKey>(
  object: T | null | undefined,
  key: K
): object is T & { [P in K]: Exclude<T[Extract<P, keyof T>], undefined> } {
  // 1. 객체가 null/undefined이면 false
  if (object == null) {
    return false;
  }

  // 2. 존재 여부 체크
  const result = Object.prototype.hasOwnProperty.call(object, key);

  // 3. 결과 반환
  // 이 함수가 true를 리턴하면, 타입스크립트는 이제 'object[key]'가 
  // undefined가 아님을 확신하게 됩니다.
  return result;
}