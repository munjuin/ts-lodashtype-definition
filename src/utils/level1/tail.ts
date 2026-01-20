/**
 * tail 구현
 * 배열의 첫 번째 요소를 제외한 나머지 요소들로 구성된 새 배열을 반환합니다.
 */
// slice 사용 방식
// 최상
// 메모리 최적화됨
export function tail<T>(array: T[]): T[] {
  // return array.length > 0 ? array.slice(1) : [];
  if(array.length > 0){
    return array.slice(1);
  } else {
    console.log('빈 배열입니다');
    return [];
  }
}

// destructuring 사용 방식
// 중상
// 메모리 효율 양호함
// export function tail<T>(array: T[]): T[] {
//   // 첫 번째 요소는 _(언더스코어)로 무시하고, 나머지를 rest 배열에 담습니다.
//   const [_, ...rest] = array;
//   return rest;
// }

// filter 사용 방식
// 하
// 메모리 효율 낮음(전체 순회)
// export function tail<T>(array: T[]): T[] {
//   // 인덱스(i)가 0이 아닌 것들만 골라냅니다.
//   return array.filter((_, i) => i !== 0);
// }