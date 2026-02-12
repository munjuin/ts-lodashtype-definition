// ### 1. 개요
// 전달받은 객체에서 지정된 키(Key)들에 해당하는 속성을 제외한 나머지 속성들로만 구성된 새로운 객체를 생성하는 `omit` 함수를 구현합니다.

// ### 2. 목적
// - 객체에서 특정 필드(민감 정보나 불필요한 데이터)를 제거하여 보안성을 높이거나 데이터 구조를 최적화하기 위함입니다.
// - `pick`과 반대되는 로직을 제공하여 객체 변형의 유연성을 확보합니다.

// ### 3. 요구사항
// - 첫 번째 인자로 소스 객체(`object`)를, 두 번째 인자로 제외할 키들의 배열(`paths`)을 받습니다.
// - 원본 객체를 수정하지 않는 불변성을 유지해야 합니다.
// - 타 함수(`has`, `pick` 등)를 임포트하지 않는 **독립적인 코드**로 구현합니다.
// - 존재하지 않는 키가 배열에 포함되더라도 에러 없이 무시하고 진행합니다.
// - 타입스크립트의 `Omit` 유틸리티 타입을 활용하여 반환 타입을 정확히 정의합니다.

// ### 4. 핵심 로직
// - `Object.keys()`를 활용하여 객체의 전체 키 목록을 가져옵니다.
// - `paths` 배열에 포함되지 않은 키들만 `filter`를 통해 걸러냅니다.
// - 걸러진 키들을 `reduce`나 루프를 통해 새로운 객체에 할당합니다.
// - `Exclude`나 `Omit` 타입을 활용해 제네릭을 구성합니다.

export function omit<T extends object, K extends keyof T>(
  object: T,
  paths: K[]
): Omit<T, K> {
  const result = {} as any;
  
  if(object == null){
    return result as Omit<T, K>;
  }

  const allKeys = Object.keys(object) as Array<keyof T>;

  for(const key of allKeys){
    if(!paths.includes(key as unknown as K)){
      result[key] = object[key];
    }
  }
  return result as Omit<T, K>;
}