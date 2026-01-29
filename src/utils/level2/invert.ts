// 1. 개요
// 객체의 키(Key)와 값(Value)을 서로 뒤바꾼 새로운 객체를 반환하는 invert 함수를 구현합니다.

// 2. 목적
// 데이터의 키와 값을 반전시켜 역방향 조회가 필요한 경우 사용합니다.
// 예를 들어, 특정 설정값이나 매핑 테이블에서 값(Value)을 통해 키(Key)를 찾아야 할 때 유용합니다.

// 3. 요구사항
// 첫 번째 인자로 반전시킬 대상 객체(object)를 받습니다.

// 객체의 값을 새로운 객체의 키로, 객체의 키를 새로운 객체의 값으로 할당합니다.
  // 여기서 자바스크립트 엔진의 한계로 객체의 key로 사용할 수 있는 값의 타입은 string, number, symbol뿐이다
  // 그래서 <T extends Record<string, string | number | symbol>>형태가 새로운 객체를 생성하는 경우 객체의 타입이 됨

// 중복 값 처리: 여러 키가 동일한 값을 가질 경우, 나중에 순회되는 키가 해당 값을 최종적으로 차지합니다. (Last-in-wins)

// 결과 객체는 항상 문자열 형태의 키를 가진 객체로 반환됩니다. (JS 객체 키 특성상 숫자가 들어와도 문자열로 변환됨)
  // 여기서 항상 문자열 형태의 키를 갖는다고 되어있기 때문에 key의 타입은 string으로 확정

// 원본 객체를 수정하지 않고 새로운 객체를 반환하는 불변성을 유지합니다.

// 4. 핵심 로직
// Object.entries()를 통해 원본 객체의 [key, value] 쌍을 추출합니다.

// reduce 또는 forEach를 사용하여 새로운 객체에 result[value] = key 형태로 데이터를 저장합니다.

// 타입스크립트 제네릭을 사용하여 입력 객체의 키와 값 타입을 기반으로 결과 타입을 추론합니다.

export function invert<T extends Record<string, string | number | symbol>>(
  object: T
): Record<string, keyof T>{
  const result = {} as Record<string, keyof T>;
  
  if(!object || typeof object !== 'object' || Array.isArray(object)){
    return result;
  };

  Object.entries(object).forEach(([key, value])=>{
    const newKey = String(value);
    result[newKey] = key as keyof T;
  });

  return result;
}