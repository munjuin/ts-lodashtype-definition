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