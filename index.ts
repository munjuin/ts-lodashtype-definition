// index.ts

import { groupBy } from 'my-lodash';

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 20 },
];

/**
 * 테스트 1: 함수 기반 그룹화
 * 결과의 타입이 { [key: string]: User[] } 로 정확히 추론되어야 합니다.
 */
const byAgeFn = groupBy(users, (user) => user.age);
console.log('함수 기반 테스트 통과');

/**
 * 테스트 2: 키(Property) 기반 그룹화
 * 'age'는 User의 키이므로 정상 작동해야 합니다.
 */
const byAgeKey = groupBy(users, 'age');
console.log('키 기반 테스트 통과');

/**
 * 테스트 3: 존재하지 않는 키 입력 (에러 검증)
 * 아래 코드의 주석을 해제했을 때 빨간 줄(에러)이 떠야 성공입니다!
 */
// const errorCase = groupBy(users, 'salary'); // Error: 'salary'는 User의 키에 없습니다.