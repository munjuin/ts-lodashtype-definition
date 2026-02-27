// ### 1. 개요
// 객체가 가진 열거 가능한 고유 속성(Own Enumerable Properties)의 값들만 뽑아내어 새로운 배열로 반환하는 `values` 함수를 구현합니다.

// ### 2. 목적
// - 객체에 담긴 데이터를 리스트 형태로 변환하여, 배열 메서드(`map`, `filter`, `reduce` 등)를 활용한 데이터 가공을 쉽게 하기 위함입니다.
// - `for...in` 루프와 달리 프로토타입 체인에 있는 상속된 값들은 제외하고 오직 객체 자신의 데이터만 안전하게 추출합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 대상 객체(`object`)를 받습니다.
// - 객체의 모든 고유 속성 값들을 포함하는 새로운 배열을 반환합니다.
// - 인자가 `null`이나 `undefined`인 경우 빈 배열 `[]`을 반환해야 합니다.

// ### 4. 핵심 로직 및 타입 힌트
// - **타입 챌린지**: 반환되는 배열의 타입은 객체의 모든 밸류 타입들의 합집합(Union) 배열이어야 합니다.
// - **타입 표현**: `T[keyof T][]`를 사용하여 `T`의 키들에 해당하는 모든 값의 타입을 추론합니다.
// - **구현**: `Object.values(object)`를 직접 사용하거나, `Object.keys()`로 키를 먼저 뽑은 뒤 루프를 돌며 값을 채우는 방식으로 구현합니다.

export function values<T extends object>(
  object: T,
): T[keyof T][] {
  if(object == null){
    return [];
  } 
  return Object.values(object) as T[keyof T][];
}