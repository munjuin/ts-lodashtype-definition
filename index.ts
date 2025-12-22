// index.ts
import { groupBy, debounce } from 'my-lodash'; // 라이브러리처럼 호출

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 20 },
];

// console.log('--- 실행 결과 ---');
// console.log(groupBy(users, 'age'));
// console.log(groupBy(users, (user)=>user.name));


// 테스트용 함수: 이름(string)과 횟수(number)를 받음
function logMessage(name: string, count: number) {
  console.log(`[로그] ${name}님에게 ${count}번째 메시지 발송`);
}

// 1. 데바운스 생성 (1초 대기)
const debouncedLog = debounce(logMessage, 1000);

console.log("--- 테스트 시작 ---");

// 2. 연속 호출: 마지막 호출인 "민수"만 1초 뒤에 출력되어야 함
debouncedLog("철수", 1);
debouncedLog("영희", 2);
debouncedLog("민수", 3);

// 3. 타입스크립트의 감시 확인 (인자 오류 내보기)
// 아래 주석을 풀면 빨간 줄이 생깁니다. (원본 함수 타입을 그대로 가져왔기 때문!)
// debouncedLog(123, "이름");
// debouncedLog("미리");

// 4. 취소 테스트
const cancelTest = debounce((msg: string) => console.log("이건 안 보여야 함: " + msg), 500);
cancelTest("헬로");
cancelTest.cancel(); // 0.5초가 되기 전에 취소해서 아무것도 안 찍힘

// 5. 즉시 실행 테스트
const flushTest = debounce((msg: string) => console.log("즉시 실행: " + msg), 5000);
flushTest("너무 급해!");
flushTest.flush(); // 5초 안 기다리고 바로 실행됨