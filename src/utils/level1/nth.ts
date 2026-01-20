/**
 * nth 구현
 * 배열의 n번째 인덱스에 있는 요소를 반환합니다.
 */

// if-else 방식
// 상
// export function nth<T>(array: T[], n: number): T | undefined {
//   if(n >= 0){
//     return n < array.length ? array[n] : undefined;
//   } else {
//     const index = array.length + n;
//     return index >= 0 ? array[index] : undefined;
//   }
// }

// at() 방식(ES2022 이상 지원)
// 최상
// export function nth<T>(array: T[], n: number): T | undefined {
//   // array.at(n)은 n이 음수면 뒤에서부터, 양수면 앞에서부터 요소를 찾아줍니다.
//   return array.at(n);
// }

// 인덱스 정규화 방식
// 상
export function nth<T>(array: T[], n: number): T | undefined {
  // 1. n이 0 이상이면 n 그대로, 음수이면 뒤에서부터 계산한 인덱스를 타겟으로 잡습니다.
  const targetIndex = n >= 0 ? n : array.length + n;

  // 2. 계산된 인덱스가 배열의 실제 유효 범위 내에 있는지 확인합니다.
  // (0보다 작거나, 배열의 길이와 같거나 크면 범위를 벗어난 것입니다.)
  if (targetIndex < 0 || targetIndex >= array.length) {
    return undefined;
  }

  // 3. 안전한 범위 내의 요소만 반환합니다.
  return array[targetIndex];
}