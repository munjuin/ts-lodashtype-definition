// ### 1. 개요
// 전달받은 객체에서 지정된 키(Key)들에 해당하는 속성만 선택하여 새로운 객체를 생성하는 `pick` 함수를 구현합니다.

import { has } from './has';

// ### 2. 목적
// - 거대한 객체에서 필요한 데이터만 추출하여 가벼운 객체를 만들 때 사용합니다.
// - API 요청 시 불필요한 필드를 제거하거나, 특정 뷰에 필요한 데이터만 거를 때 매우 유용합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 소스 객체(`object`)를 받습니다.
// - 두 번째 인자로 선택할 키들의 배열(`paths`)을 받습니다.
// - 원본 객체를 수정하지 않고, 선택된 키들만 포함된 새로운 객체를 반환합니다.
// - 존재하지 않는 키가 배열에 포함된 경우, 해당 키는 무시하고 존재하는 것만 담습니다.
// - 타입스크립트의 `Pick` 유틸리티 타입을 활용하여 반환되는 객체의 타입을 정확하게 추론합니다.

// ### 4. 핵심 로직
// - `reduce` 메서드를 사용하여 선택된 키들을 순회하며 결과 객체를 구성합니다.
// - `has` 함수(이전에 만든 것)를 활용하여 실제 존재하는 키인지 검사 후 할당합니다.
// - 제네릭 `T`와 `K extends keyof T`를 사용하여 타입 안전성을 확보합니다.

// export function pick<T extends object, K extends keyof T>(
//   object: T | null | undefined,
//   paths: K[]
// ): Pick<T,K>{
//   const result = {} as Pick<T,K>;
  
//   if(object == null){
//     return result;
//   }
  
//   return paths.reduce((acc, key)=>{
//     if(has(object, key)){
//       (acc as any)[key] = object[key];
//     }
//     return acc;
//   }, result);
// }

// has 함수 타입의 의존성을 제거한 방법
export function pick<T extends object, K extends keyof T>(
  object: T | null | undefined,
  paths: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;

  if (object == null) {
    return result;
  }

  for (const key of paths) {
    // 외부 has 함수 대신 자바스크립트 표준 메서드를 직접 사용합니다.
    // 이렇게 하면 pick.ts 파일 하나만으로도 완벽하게 동작합니다.
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      (result as any)[key] = (object as any)[key];
    }
  }

  return result;
}