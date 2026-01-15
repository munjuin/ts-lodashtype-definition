/**
 * get 구현용 재귀 타입
 */
type GetType<T, P extends string> = 
  P extends `${infer Left}.${infer Right}`
    ? Left extends keyof T
      ? GetType<T[Left], Right>
      : any
    : P extends keyof T
      ? T[P]
      : any;

/**
 * get 구현
 * 점('.')으로 구분된 경로를 통해 객체의 깊은 곳에 있는 값을 안전하게 가져옵니다.
 */
export function get<T extends object, P extends string>(
  obj: T,
  path: P
): GetType<T, P>;

export function get(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : undefined;
  }, obj);
}