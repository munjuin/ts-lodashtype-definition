// ### 1. 개요
// 하나 이상의 소스 객체(`sources`)들로부터 모든 열거 가능한 고유 속성을 대상 객체(`object`)에 복사하여 병합된 결과를 반환하는 `assign` 함수를 구현합니다.

// ### 2. 목적
// - 여러 개의 객체를 하나로 합쳐 새로운 데이터 구조를 만들 때 사용합니다.
// - `defaults` 함수와는 반대로, 동일한 키가 존재할 경우 **나중에 오는 소스 객체의 값이 이전 값을 덮어써야** 합니다. (Configuration override 등에 필수적입니다.)

// ### 3. 요구사항
// - 첫 번째 인자로 대상 객체(`object`)를 받습니다.
// - 두 번째 인자부터는 가변 인자(`...sources`)를 통해 여러 개의 소스 객체를 받을 수 있어야 합니다.
// - 뒤에 오는 객체의 속성이 우선순위를 가지며, 원본 객체를 수정하지 않는 불변성을 유지해야 합니다.
// - 타 함수에 의존하지 않는 **독립적인 코드**로 구현합니다.

// ### 4. 핵심 로직 및 타입 힌트
// - **타입 챌린지**: 런타임에서는 여러 객체가 합쳐지지만, 타입 시스템에서도 이를 하나로 합쳐진 타입(Intersection)으로 인식하게 만드는 것이 핵심입니다.
// - **가변 인자 처리**: `...sources`는 배열 형태로 들어오게 됩니다. 이 배열 안의 타입들을 어떻게 하나로 합쳐서 반환 타입에 반영할지 고민해 보세요.
// - **구현**: `Object.keys()`와 반복문을 사용하여 소스 객체들을 순차적으로 순회하며 결과 객체에 할당합니다.

// S[] 대신 any[]를 사용하거나, 제네릭 S를 소스 전체가 아닌 '개별 객체'로 취급해야 합니다.
// 하지만 가장 깔끔한 해결책은 sources에 대해 타입을 조금 양보하는 것입니다.

// /**
//  * 1. 마법의 도구: IntersectAll
//  * 배열(튜플)로 들어온 모든 타입들을 하나하나 꺼내서 '&'로 합쳐줍니다.
//  * 이 정의가 없으면 'IntersectAll 이름을 찾을 수 없습니다' 에러가 발생합니다.
//  */
// type IntersectAll<T extends any[]> = T extends [infer Head, ...infer Tail]
//   ? Head & IntersectAll<Tail>
//   : unknown;

// /**
//  * 2. 완벽한 assign 함수
//  * 이제 인자가 몇 개가 들어오든 IntersectAll이 모든 타입을 추적해서 합쳐줍니다.
//  */
// export function assign<T extends object, S extends object[]>(
//   target: T,
//   ...sources: S
// ): T & IntersectAll<S> {
//   // 불변성을 위해 대상 객체를 복사합니다.
//   // 내부 로직은 동적이므로 'as any'를 사용하여 유연하게 처리합니다.
//   const result = { ...target } as any;

//   for (const source of sources) {
//     // 소스가 유효한 객체인 경우에만 병합을 진행합니다.
//     if (source == null || typeof source !== 'object') continue;

//     const keys = Object.keys(source);
//     for (const key of keys) {
//       // 나중에 오는 값이 이전 값을 덮어씁니다.
//       result[key] = (source as any)[key];
//     }
//   }

//   // 최종 결과물을 우리가 정의한 타입으로 확정해서 반환합니다.
//   return result as T & IntersectAll<S>;
// }

// 원본객체 하나가 들어오고 소스로 랜덤갯수의 객체가 들어오면 그걸 하나로 합치는 타입함수
// 원본은 건들이면 안되고 key값이 동일한경우 뒤에 들어온 객체가 덮어쓴다

///////////////////////////////////////////////////////////////////

/**
 * [타입 설계 단계]
 * 마법의 도구: IntersectAll
 * * 1. 목적: 인자로 들어온 여러 객체의 타입을 하나로 합치기 위함입니다.
 * 2. 원리:
 * - T가 [첫 번째 타입, ...나머지 타입들] 형태인지 확인합니다 (추론: infer).
 * - 맞다면, 첫 번째 타입과 '나머지 타입들을 합친 결과'를 & (Intersection)로 엮습니다.
 * - 더 이상 꺼낼 타입이 없으면 unknown을 반환하여 재귀를 종료합니다.
 */
type IntersectAll<T extends any[]> = T extends [infer Head, ...infer Tail]
  ? Head & IntersectAll<Tail>
  : unknown;

/**
 * [함수 구현 단계]
 * assign 함수: 여러 객체를 병합하여 하나의 결과물을 만듭니다.
 * * @param object - 병합의 기준이 되는 대상 객체 (T)
 * @param sources - 병합할 소스 객체들의 리스트 (S: 튜플 타입으로 캡처됨)
 * @returns T와 모든 S가 합쳐진 타입의 새로운 객체
 */
export function assign<T extends object, S extends any[]>(
  object: T,
  ...sources: S
): T & IntersectAll<S> {
  
  // [순서 1] 원본 객체의 복사본 만들기 (불변성 유지)
  // - 원본 object를 수정하지 않기 위해 Spread 연산자(...)를 사용해 새 객체를 생성합니다.
  // - 내부에서 동적으로 속성을 추가해야 하므로 'as any'로 타입을 잠시 유연하게 둡니다.
  const result = { ...object } as any;

  // [순서 2] 가변 인자로 들어온 소스 객체들을 하나씩 꺼내기
  // - sources는 [s1, s2, s3...] 형태의 튜플이므로 for...of 루프를 사용합니다.
  for (const source of sources) {
    // [방어 코드] 소스가 null이거나 undefined인 경우 병합을 건너뜁니다.
    if (source == null || typeof source !== 'object') continue;

    // [순서 3] 각 소스 객체가 가진 고유한 키(이름표)들을 추출하기
    // - Object.keys()를 사용해 해당 소스 객체의 모든 키 배열을 가져옵니다.
    const keys = Object.keys(source);

    // [순서 4] 추출한 키를 하나씩 순회하며 복사본에 집어넣기
    // - 배열(keys)을 순회하므로 for...of를 사용합니다.
    for (const key of keys) {
      // [핵심 로직] 나중에 오는 소스의 값이 이전 값을 덮어쓰게 됩니다.
      // - result[key]에 현재 source의 값을 할당합니다.
      result[key] = (source as any)[key];
    }
  }

  // [순서 5] 모든 병합이 완료된 최종 결과물 반환
  // - 런타임 결과물인 result를 설계한 타입인 'T & IntersectAll<S>'로 확정하여 반환합니다.
  return result as T & IntersectAll<S>;
}