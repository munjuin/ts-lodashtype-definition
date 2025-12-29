/**
 * ==========================================
 * [Level 1: 기초] 배열 및 기본 제네릭 활용
 * ==========================================
 */

/**
 * head 구현
 * 배열의 첫 번째 요소를 반환합니다. 빈 배열이면 undefined를 반환합니다.
 */
export function head<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

/**
 * last 구현
 * 배열의 마지막 요소를 반환합니다. 빈 배열이면 undefined를 반환합니다.
 */
export function last<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[array.length - 1] : undefined;
}

/**
 * tail 구현
 * 배열의 첫 번째 요소를 제외한 나머지 요소들로 구성된 새 배열을 반환합니다.
 */
export function tail<T>(array: T[]): T[] {
  return array.length > 0 ? array.slice(1) : [];
}

/**
 * compact 구현
 * 배열에서 falsy 값(null, 0, "", undefined 등)을 제거합니다.
 * Type Predicate(item is T)를 사용하여 타입을 좁힙니다.
 */
export function compact<T>(array: (T | null | undefined | false | 0 | '')[]): T[] {
  return array.filter(
    (item): item is T => Boolean(item)
  );
}

/**
 * ==========================================
 * [Level 2: 중급] 객체 변형 및 키 매핑
 * ==========================================
 */

/**
 * omit 구현
 * 객체에서 특정 키들을 제외한 새로운 객체를 반환합니다.
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj } as any;
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * pick 구현
 * 객체에서 지정된 키들만 선택하여 새로운 객체를 반환합니다.
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): { [P in K]: T[P] } {
  const result = {} as { [P in K]: T[P] };
  keys.forEach((key) => {
    (result as any)[key] = obj[key];
  });
  return result;
}

/**
 * ==========================================
 * [Level 3: 상급] 함수 오버로딩 및 복합 제네릭
 * ==========================================
 */

/**
 * groupBy 구현
 * 콜백 함수 또는 객체의 키를 기준으로 데이터를 그룹화합니다.
 */
export function groupBy<T>(
  collection: T[],
  iteratee: (value: T) => string | number
): { [key: string]: T[] };

export function groupBy<T extends object, K extends keyof T>(
  collection: T[],
  iteratee: K
): { [key: string]: T[] };

export function groupBy(collection: any[], iteratee: any): any {
  return collection.reduce((result, value) => {
    const key = typeof iteratee === 'function' ? iteratee(value) : value[iteratee];
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(value);
    return result;
  }, {});
}

/**
 * ==========================================
 * [Level 4: 고수] 함수 시그니처 보존 및 인터섹션
 * ==========================================
 */

/**
 * debounce 구현
 * 원본 함수의 타입 정보를 보존하면서 cancel/flush 메서드를 추가한 하이브리드 타입을 반환합니다.
 */
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  wait: number
): F & { cancel(): void; flush(): void };

export function debounce(func: (...args: any[]) => any, wait: number): any {
  let timeoutId: any = null;
  let lastArgs: any[] = [];

  const debounced = function (this: any, ...args: any[]) {
    lastArgs = args;
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, lastArgs);
      timeoutId = null;
    }, wait);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  debounced.flush = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
    func.apply(null, lastArgs);
  };

  return debounced;
}

/**
 * ==========================================
 * [Level 5: 전설] 재귀적 템플릿 리터럴 및 infer
 * ==========================================
 */

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