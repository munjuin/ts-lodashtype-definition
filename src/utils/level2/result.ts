// ### 1. 개요
// 객체에서 지정된 경로의 속성 값을 가져오되, 만약 그 값이 함수(Function)라면 해당 함수를 실행한 결과값을 반환하고, 아니면 값 자체를 반환하는 `result` 함수를 구현합니다.

// ### 2. 목적
// - 객체의 속성이 정적인 데이터일 수도 있고, 동적으로 계산되는 메서드일 수도 있는 상황에서 일관된 방식으로 값을 얻기 위해 사용합니다.
// - 예: `obj.a`가 `10`이면 `10`을, `obj.a`가 `() => 10`이면 실행 결과인 `10`을 반환.

// ### 3. 요구사항
// - 첫 번째 인자: 소스 객체 (`object`).
// - 두 번째 인자: 값을 찾을 경로 (`path`). (Level 2에서는 일단 단일 키 문자열로 시작합니다.)
// - 세 번째 인자: 경로에 해당하는 값이 없을 경우 반환할 기본값 (`defaultValue`).
// - 만약 찾은 값이 함수라면, `object`를 `this`로 바인딩하여 호출합니다.
// - 함수가 아닌 일반 값이라면 그대로 반환합니다.

// ### 4. 핵심 로직 및 타입 힌트
// - **타입 챌린지**: 반환 타입이 `T[K]` 그 자체가 될 수도 있고, 만약 `T[K]`가 함수라면 그 함수의 반환 타입(`ReturnType<T[K]>`)이 되어야 합니다.
// - **조건부 타입 활용**: `T[K] extends (...args: any[]) => infer R ? R : T[K]` 형식을 고민해 보세요.
// - **구현**: `typeof value === 'function'` 체크를 통해 분기 처리를 수행합니다.

export function result<T extends object, K extends keyof T>(
  object: T,
  path: K,
  defaultValue?: any
): T[K] extends (...args: any[]) => infer R ? R : T[K]{
  const value = object[path];

  if(value === undefined){
    return defaultValue;
  }

  if(typeof value === 'function'){
    return value.call(object);
  }
  return value as any;
}