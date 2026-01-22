// 1. 개요
// 배열의 처음부터 n개의 요소를 제외한 나머지 요소들로 구성된 새로운 배열을 반환하는 drop 함수를 구현합니다.

// 2. 목적

// 데이터의 앞부분 일부를 건너뛰고 나머지 부분을 처리해야 할 때 사용합니다.
// 페이지네이션 로직이나 특정 헤더 데이터를 제외할 때 유용합니다.
// 3. 요구사항

// 첫 번째 인자로 대상 배열(array)을 받고, 두 번째 인자로 제거할 개수(n)를 받습니다.
// n의 기본값은 1로 설정합니다.
// n이 0 이하인 경우 원본 배열의 복사본을 반환합니다.
// n이 배열의 길이보다 크거나 같은 경우 빈 배열([])을 반환합니다.
// 원본 배열은 수정하지 않는 불변성을 유지합니다.
// 4. 핵심 로직

// Array.prototype.slice() 메서드를 활용하여 효율적으로 구현합니다

// slice() 사용 구현
// 메모리 최적화가 좋고 속도도 빠름
// export function drop <T>(array: T[], n: number = 1): T[] {
//   const dropCount = n < 0 ? 0 : n;
//   return array.slice(dropCount)
// }

// filter() 사용 구현
// 전체 요소를 순회하기때문에 느리고, 메모리효율도 낮음(함수 호출 비용)
// export function drop<T>(array: T[], n: number = 1): T[]{
//   const dropCount = n < 0 ? 0 : n;
//   return array.filter((_, index)=> index >= dropCount)
// }

export function drop<T>(array: T[], n: number = 1): T[] {
  const dropCount = n < 0 ? 0 : n;
  const result: T[] = [];
  // dropCount 인덱스부터 시작하여 새로운 배열에 push합니다.
  for (let i = dropCount; i < array.length; i++) {
    result.push(array[i]);
  }
  return result;
}

