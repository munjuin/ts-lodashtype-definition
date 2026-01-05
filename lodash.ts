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
  // return array.length > 0 ? array.slice(1) : [];
  if(array.length > 0){
    return array.slice(1);
  } else {
    console.log('빈 배열입니다');
    return [];
  }
}

/**
 * initial 구현
 * 배열의 마지막 요소를 제외한 나머지 요소들로 구성된 새 배열을 반환합니다.
 */
export function initial<T>(array: T[]): T[] {
  return array.length > 0 ? array.slice(0, -1) : [];
}

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
// export function omit<T extends object, K extends keyof T>(
//   obj: T,
//   keys: K[]
// ): Omit<T, K> {
//   const result = { ...obj } as any;
//   for (const key of keys) {
//     delete result[key];
//   }
//   return result;
// }

export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  // 1. 결과물을 담을 빈 객체 생성
  // 최종적으로 Omit<T, K> 타입이 될 것이라고 타입 단언(as)을 합니다.
  const result = {} as Omit<T, K>;

  // 2. 원본 객체의 모든 키를 가져옵니다.
  const allKeys = Object.keys(obj) as (keyof T)[];

  // 3. 전체 키 중에서 제외할 키(keys)에 포함되지 않은 것만 골라냅니다.
  allKeys.forEach((key) => {
    // keys 배열에 현재 key가 포함되어 있지 않다면 (제외 대상이 아니라면)
    if (!keys.includes(key as any)) {
      // 4. 결과 객체에 값을 복사합니다.
      // 타입 안전성을 위해 as any를 사용하여 값을 할당합니다.
      (result as any)[key] = obj[key];
    }
  });

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
 * mapValues 구현
 * 객체의 각 속성 값을 콜백 함수를 통해 변환하여 새로운 객체를 반환합니다.
 */
export function mapValues<T extends object, V>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => V
): { [K in keyof T]: V } {
  // 1. 결과물을 담을 빈 객체를 만듭니다. 
  // 아직 비어있지만 결국 설계도대로 완성될 것이라고 타입스크립트에게 알려줍니다(as).
  const result = {} as { [K in keyof T]: V };

  // 2. 객체의 키 목록을 뽑아서 순회합니다.
  // Object.keys는 string[]을 뱉기 때문에, T의 키라는 것을 명시해줍니다(as).
  const keys = Object.keys(obj) as (keyof T)[];

  keys.forEach((key) => {
    const value = obj[key];
    // 3. 콜백 함수를 실행해서 나온 새로운 값을 결과 객체에 담습니다.
    result[key] = iteratee(value, key, obj);
  });

  return result;
}

/**
 * feat: mapKeys 구현
 * 객체의 키를 콜백 함수의 결과로 변환하여 새로운 객체를 반환합니다.
 */
export function mapKeys<T extends object>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => string
): { [key: string]: T[keyof T] } {
  // 1. 결과물을 담을 빈 객체 생성 (인덱스 시그니처 적용)
  const result: { [key: string]: T[keyof T] } = {};

  // 2. 원본 객체의 키들을 순회 (as를 통한 타입 단언)
  const keys = Object.keys(obj) as (keyof T)[];

  keys.forEach((key) => {
    const value = obj[key];
    
    // 3. 새로운 키 이름 생성
    const newKey = iteratee(value, key, obj);
    
    // 4. 새로운 키 위치에 원본 값 할당
    result[newKey] = value;
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