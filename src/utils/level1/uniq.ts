/**
 * [Issue] feat: uniq 구현
 * 배열에서 중복된 요소를 제거한 고유한 배열을 반환합니다.
 */

// Set 사용 버전
// 최상
// 해시 세트 알고리즘을 사용하여 값을 찾고 저장 하는 속도가 매우 빠름
export function uniq<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

// for문 사용 버전
// 보통
// includes 메서드가 매번 배열을 처음부터 끝까지 뒤져야함
// export function uniq<T>(arr: T[]): T[] {
//   const result: T[] = [];
//   for (let i = 0; i < arr.length; i++){
//     if(!result.includes(arr[i])){
//       result.push(arr[i]);
//     }
//   }
//   return result;
// }

// forEach 사용 버전
// 보통
// includes 메서드가 매번 배열을 처음부터 끝까지 뒤져야함
// export function uniq<T>(arr: T[]): T[] {
//   const result:T[] = [];
//   arr.forEach((item)=>{
//     if(!result.includes(item)){
//       result.push(item);
//     }
//   })
//   return result
// }

// map filter 사용 버전
// 최악
// 연산을 두번 수행하며 중간에 null 값이 담긴 불필요한 배열을 하나 더 생성하기때문에 비효율적임
// export function uniq<T>(arr: T[]): T[] {
//   return arr.map((item, index) => (arr.indexOf(item) === index ? item : null)).filter((item): item is T => item !== null);
// }