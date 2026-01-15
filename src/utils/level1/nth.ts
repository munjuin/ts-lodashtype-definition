/**
 * nth 구현
 * 배열의 n번째 인덱스에 있는 요소를 반환합니다.
 */
export function nth<T>(array: T[], n: number): T | undefined {
  if(n >= 0){
    return n < array.length ? array[n] : undefined;
  } else {
    const index = array.length + n;
    return index >= 0 ? array[index] : undefined;
  }
}