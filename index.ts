// index.ts
import { groupBy, debounce, get, head, compact, omit, pick, last, tail } from 'my-lodash'; // 라이브러리처럼 호출


// groupBy 테스트 코드-----------------------------
// interface User {
//   name: string;
//   age: number;
// }

// const users: User[] = [
//   { name: 'Alice', age: 20 },
//   { name: 'Bob', age: 25 },
//   { name: 'Charlie', age: 20 },
// ];

// console.log('--- 실행 결과 ---');
// console.log(groupBy(users, 'age'));
// console.log(groupBy(users, (user)=>user.name));

//devounce 테스트용 코드-------------------------------
// 테스트용 함수: 이름(string)과 횟수(number)를 받음
// function logMessage(name: string, count: number) {
//   console.log(`[로그] ${name}님에게 ${count}번째 메시지 발송`);
// }

// // 1. 데바운스 생성 (1초 대기)
// const debouncedLog = debounce(logMessage, 1000);

// console.log("--- 테스트 시작 ---");

// // 2. 연속 호출: 마지막 호출인 "민수"만 1초 뒤에 출력되어야 함
// debouncedLog("철수", 1);
// debouncedLog("영희", 2);
// debouncedLog("민수", 3);

// // 3. 타입스크립트의 감시 확인 (인자 오류 내보기)
// // 아래 주석을 풀면 빨간 줄이 생깁니다. (원본 함수 타입을 그대로 가져왔기 때문!)
// // debouncedLog(123, "이름");
// // debouncedLog("미리");

// // 4. 취소 테스트
// const cancelTest = debounce((msg: string) => console.log("이건 안 보여야 함: " + msg), 500);
// cancelTest("헬로");
// cancelTest.cancel(); // 0.5초가 되기 전에 취소해서 아무것도 안 찍힘

// // 5. 즉시 실행 테스트
// const flushTest = debounce((msg: string) => console.log("즉시 실행: " + msg), 5000);
// flushTest("너무 급해!");
// flushTest.flush(); // 5초 안 기다리고 바로 실행됨


// // get 함수 테스트 코드-----------------------------
// const nestedData = {
//   user: {
//     profile: {
//       name: 'Alice',
//       details: {
//         age: 28,
//         city: 'Seoul'
//       }
//     }
//   },
//   settings: {
//     theme: 'dark'
//   }
// };

// // 테스트 1: 깊은 경로 호출
// // 마우스를 올리면 nameValue의 타입이 string으로 정확히 추론됩니다!
// const nameValue = get(nestedData, 'user.profile.name');
// console.log('이름:', nameValue);

// // 테스트 2: 더 깊은 숫자 타입 호출
// // ageValue의 타입은 number로 추론됩니다.
// const ageValue = get(nestedData, 'user.profile.details.age');
// console.log('나이:', ageValue);

// // 테스트 3: 없는 경로 (any 혹은 undefined)
// const unknown = get(nestedData, 'user.unknown.path');
// console.log('없는 경로:', unknown);

// head 함수 테스트 코드-----------------------------
// const numbers: string[] = [];// 타입추론 때문에 오류가 생김 
// const firstNumber = head(numbers);
// console.log(firstNumber);

// last 함수 테스트 코드-----------------------------
// const 변수: string[] = ['a', 'b', 'c'];
// const 마지막요소 = last(변수);
// console.log(마지막요소);

// tail 함수 테스트 코드-----------------------------
// const 배열: number[] = [];
// const 꼬리요소들 = tail(배열);
// console.log(꼬리요소들);

// compact 함수 테스트 코드-----------------------------
// const mixedList = [0, 1, 'apple', '', false, true, null, undefined, NaN];
// const cleanedList = compact(mixedList);
// console.log(cleanedList);

// const users = [
//   { id: 1, name: 'Alice' },
//   null,
//   { id: 2, name: 'Bob' },
//   undefined
// ];
// const validUsers = compact(users);
// console.log(validUsers);

// omit 함수 테스트 코드-----------------------------
// const user = {
//   id: 1,
//   name: 'Alice',
//   age: 25,
//   email: 'alice@example.com'
// };

// // 1. 정상 작동 테스트
// const userWithoutSensitiveInfo = omit(user, ['id', 'email']);

// console.log('--- omit 테스트 ---');
// console.log('원본 유저:', user);
// console.log('정제된 유저:', userWithoutSensitiveInfo); // { name: 'Alice', age: 25 }

// // 2. 타입 체크 포인트
// // userWithoutSensitiveInfo.id; // <- 이 코드의 주석을 풀었을 때 에러가 나야 성공입니다!

// pick 함수 테스트 코드-----------------------------
// const smartphone = {
//   brand: 'Apple',
//   model: 'iPhone 15',
//   price: 1250000,
//   stock: 100,
//   color: 'Black'
// };

// console.log('--- pick 테스트 시작 ---');

// // 1. 특정 속성만 골라내기
// const simpleInfo = pick(smartphone, ['model', 'price']);

// /**
//  * [타입 체크 포인트]
//  * simpleInfo에 마우스를 올렸을 때 
//  * { model: string; price: number; } 로 정확히 추론되는지 확인하세요.
//  */
// console.log('원본 기기:', smartphone);
// console.log('골라낸 정보:', simpleInfo); // { model: 'iPhone 15', price: 1250000 }


// // 2. 존재하지 않는 키 입력 시 에러 확인 (주석 해제 후 확인)
// // const errorCase = pick(smartphone, ['weight']); 
// // -> Argument of type '"weight"' is not assignable to ... 에러 발생!


// // 3. 골라내지 않은 속성에 접근 시 에러 확인
// // console.log(simpleInfo.brand); 
// // -> Property 'brand' does not exist on type '{ model: string; price: number; }' 에러 발생!