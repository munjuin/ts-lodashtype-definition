/**
 * [Issue] feat: without 구현
 * 배열에서 지정된 값들을 제외한 새로운 배열을 반환합니다.
 * * @param array - 원본 배열
 * @param values - 제외하고 싶은 값들 (가변 인자)
 * @returns 제외된 요소가 없는 새로운 배열
 */

// filter inclues 사용 방식
// 코드가 짧고 가독성이 좋지만 데이터양이 많아질수록 고민이 필요함
// 대량의 데이터가 들어오는 경우 속도가 느리지만
// 메모리 추가 할당이 적어 메모리 효율이 좋음
// export function without<T>(arr: T[], ...values: T[]): T[] {
//   return arr.filter((item) => !values.includes(item));
// }

// for문 사용 방식
// 메모리효율은 가장 좋음 함수 호출비용도 없음 다만 로직이 길고 복잡함
// export function without<T>(arr: T[], ...values: T[]): T[]{
//   const result: T[] = [];
//   for (let i = 0; i < arr.length; i++){
//     const item = arr[i];
//     let shouldExclude = false;
//     for(let j = 0; j < values.length; j++){
//       if(item === values[j]){
//         shouldExclude = true;
//         break;
//       }
//     }
//     if (!shouldExclude){
//       result.push(item);
//     }
//   }
//   return result;
// }

// set 사용 방식
// 대량의 데이터를 처리할때 가장 좋음
// 메모리 사용량이 극도로 제한된 특수사항이 아니라면 가장 추천되는 방법임
export function without<T>(array: T[], ...values: T[]): T[] {
  // 1. 제외할 값들로 Set을 만듭니다. (중복 제거 및 조회 최적화)
  const valuesSet = new Set(values);
  
  // 2. Set.has()는 O(1)의 속도를 가집니다.
  return array.filter(item => !valuesSet.has(item));
}

// reduce 사용 방식
// 복합적인 상태변환이 동시에 필요할때 사용하면 좋음
// export function without<T>(array: T[], ...values: T[]): T[] {
//   return array.reduce((acc: T[], item) => {
//     if (!values.includes(item)) {
//       acc.push(item);
//     }
//     return acc;
//   }, []);
// }