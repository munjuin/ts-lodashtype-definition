// lodash.d.ts

declare module 'my-lodash' {
  // 이슈 #2에서 설계할 groupBy (임시로 any 처리)
  export function groupBy<T>(collection: T[], iteratee: (value: T) => string | number): any;

  // 이슈 #3에서 설계할 debounce
  export function debounce(func: Function, wait: number): any;

  // 이슈 #4에서 설계할 get
  export function get(object: object, path: string, defaultValue?: any): any;
}