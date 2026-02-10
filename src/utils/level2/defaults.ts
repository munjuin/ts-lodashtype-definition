// ### 1. 개요
// 대상 객체(object)에 없는 속성이나 값이 `undefined`인 속성을 소스 객체(source objects)의 값으로 채워주는 `defaults` 함수를 구현합니다.

// ### 2. 목적
// - 설정(Options)이나 환경 설정(Configuration) 객체를 다룰 때, 사용자가 입력하지 않은 필수 항목들을 기본값(Default values)으로 안전하게 보완하기 위해 사용합니다.
// - 이미 값이 있는 경우에는 덮어쓰지 않고, '비어 있는 곳'만 찾아 채우는 것이 핵심입니다.

// ### 3. 요구사항
// - 첫 번째 인자로 대상 객체(`object`)를 받습니다.
// - 두 번째 인자부터는 하나 이상의 소스 객체(`...sources`)를 가변 인자로 받습니다.
// - **할당 조건**: 대상 객체의 특정 키 값이 `undefined`인 경우에만 소스 객체의 해당 값을 가져와 할당합니다. (이미 값이 있다면 유지)
// - 여러 개의 소스 객체가 들어올 경우, 먼저 들어온 소스 객체의 값이 우선순위를 가집니다.
// - 원본 객체를 직접 수정하지 않고 새로운 객체를 반환하여 불변성을 유지합니다. (Lodash 원본은 수정을 하지만, 학습을 위해 불변성 버전으로 구현)

// ### 4. 핵심 로직
// - `rest parameter`(`...sources`)를 사용하여 여러 소스 객체를 배열로 받습니다.
// - `reduce` 또는 `forEach`를 사용하여 소스 객체들을 순회합니다.
// - `Object.keys()`를 통해 각 소스 객체의 키를 추출하고, 대상 객체에 해당 키가 `undefined`인지 체크합니다.
// - 타입스크립트 제네릭을 사용하여 대상 객체와 소스 객체들의 타입이 합쳐진 결과 타입을 추론합니다.

export function defaults<T extends object, S extends object[]>(
  object: T,
  ...source: S
): T & S[number] {
  // if문 사용하지 않고 삼항연산자를 사용
  const result = (!object || typeof object !== 'object' || Array.isArray(object))
  ? {}
  : { ...object }

  source.forEach((source)=>{
    if(!source || typeof source !== 'object' || Array.isArray(source)){
      return;
    }
    (Object.keys(source) as Array<keyof typeof source>).forEach((key)=>{
      if((result as any)[key] === undefined){
        (result as any)[key] = source[key];
      }
    })
  })
  return result as T & S[number];
}