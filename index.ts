// index.ts

import { groupBy, debounce, get } from 'my-lodash';

/**
 * [환경 설정 검증]
 * lodash.d.ts에 정의한 'my-lodash' 모듈이 제대로 인식되는지 확인합니다.
 */

console.log('TypeScript 마스터리 미션 환경 설정 중...');

// 1. groupBy 연결 확인
const numbers = [1, 2, 3, 4];
groupBy(numbers, (n) => (n % 2 === 0 ? 'even' : 'odd'));

// 2. debounce 연결 확인
const sayHi = () => console.log('Hi');
debounce(sayHi, 1000);

// 3. get 연결 확인
get({ a: 1 }, 'a');

console.log('✅ 환경 설정 및 모듈 연결 성공!');