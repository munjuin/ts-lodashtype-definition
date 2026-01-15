/**
 * tail 구현
 * 배열의 첫 번째 요소를 제외한 나머지 요소들로 구성된 새 배열을 반환합니다.
 */
export function tail<T>(array: T[]): T[] {
  // return array.length > 0 ? array.slice(1) : [];
  if(array.length > 0){
    return array.slice(1);
  } else {
    console.log('빈 배열입니다');
    return [];
  }
}