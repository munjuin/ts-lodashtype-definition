// 1. 개요
// 배열 내부의 배열(중첩 배열)을 한 단계만 평탄화(Flatten)하여 새로운 배열을 반환하는 flatten 함수를 구현합니다.

// 2. 목적

// 다차원 배열을 일차원 배열로 변환하거나, 중첩된 데이터 구조를 단순화할 때 사용합니다.
// 복잡한 데이터 매핑 과정에서 발생하는 중첩 구조를 정리하는 데 유용합니다.
// 3. 요구사항

// 첫 번째 인자로 대상 배열(array)을 받습니다.
// 배열의 깊이를 **단 한 단계(Shallow)**만 낮춥니다. (재귀적으로 끝까지 펴는 flattenDeep과는 다릅니다.)
// 원본 배열을 수정하지 않는 불변성을 유지해야 합니다.
// 빈 배열이나 중첩되지 않은 배열이 들어와도 안전하게 작동해야 합니다.
// 4. 핵심 로직

// Array.prototype.flat(1)을 사용하거나, reduce와 concat을 조합하여 구현할 수 있습니다

// export function flatten<T>(array: any[]): any[]{
//   if(!Array.isArray(array)){
//     return []
//   }
//   return array.flat(1);
// }
// 이렇게 any 타입으로 타입을 정의하는건 타입스크립트를 쓰는 이유가 없는것 같음

export function flatten<T>(array: T[]): (T extends (infer U)[] ? U : T)[] {
  if (!Array.isArray(array)) {
    return [];
  }

  // 내부적으로는 flat(1)을 사용하지만, 반환 타입은 위에서 정의한 복잡한 추론을 따릅니다.
  // 이 방식은 'any'를 남발하지 않고도 가장 정확한 타입을 사용자에게 제공합니다.
  return array.flat(1) as any; 
  // ※ 여기서 'as any'를 살짝 쓰는 이유는 flat(1)의 복잡한 내장 타입과 
  // 우리가 만든 깔끔한 추론 타입을 일치시키기 위한 라이브러리 제작자의 작은 '다리'입니다.
  // 사용자는 이 'any'를 절대 보지 못하며, 완벽하게 추론된 타입만 받게 됩니다.
}