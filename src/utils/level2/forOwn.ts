// ### 1. 개요
// 객체의 열거 가능한 고유 속성(Own Enumerable Properties)을 순회하며 각 속성에 대해 콜백 함수(iteratee)를 실행하는 `forOwn` 함수를 구현합니다.

// ### 2. 목적
// - 자바스크립트의 기본 `for...in` 문은 객체가 상속받은 프로토타입 체인의 속성까지 순회할 위험이 있습니다.
// - `forOwn`은 `Object.prototype.hasOwnProperty`를 활용하여 오직 객체 자체가 직접 소유한 데이터만 안전하게 다루기 위해 사용합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 순회할 대상 객체(`object`)를 받습니다.
// - 두 번째 인자로 각 요소마다 실행할 콜백 함수(`iteratee`)를 받습니다.
// - 콜백 함수는 `(value, key, object)` 세 개의 인자를 전달받아야 합니다.
// - 순회가 끝나면 첫 번째 인자로 받은 객체(`object`)를 그대로 반환합니다.

// ### 4. 핵심 로직 및 타입 힌트
// - **타입 챌린지**: 콜백 함수의 `key` 인자가 단순히 `string`이 아니라, 객체 `T`가 실제 가지고 있는 키들의 집합(`keyof T`)으로 추론되어야 합니다.
// - **값의 타입 추론**: 결정된 키 타입(`K`)을 바탕으로 해당 위치의 값 타입(`T[K]`)이 정확히 매칭되어야 콜백 내부에서 타입 안전성이 보장됩니다.
// - **구현**: `Object.keys()`를 사용하거나 `for...in` 루프 내부에 `hasOwnProperty` 체크 로직을 포함하여 구현합니다.

export function forOwn<T extends object, K extends keyof T>(
  object: T,
  iteratee: (value: T[K], key: K, object: T) => void
): T {
  // 1. 객체의 고유 키들을 뽑아냅니다. (Object.keys 활용)
  let keys = Object.keys(object) as K[];
  // 2. 루프를 돌며 iteratee를 실행합니다.
  for(const key of keys){
    const value = object[key];
    iteratee(value, key, object);
  }
  // 3. object를 반환합니다.
  return object;
}