// **1. 개요**
// 배열을 전달받은 `size`만큼의 길이를 가진 여러 개의 작은 배열(chunk)로 나누어 새로운 2차원 배열을 반환하는 `chunk` 함수를 구현합니다.

// **2. 목적**
// - 대량의 데이터를 페이지네이션(Pagination) 처리하거나, 데이터를 일정한 묶음으로 배치 처리(Batch processing)할 때 필수적입니다.
// - 그리드 레이아웃(예: 한 줄에 3개씩 배치)을 구성할 때 유용합니다.

// **3. 요구사항**
// - 첫 번째 인자로 대상 배열(`array`)을 받고, 두 번째 인자로 각 덩어리의 크기(`size`)를 받습니다.
// - `size`의 기본값은 1로 설정합니다.
// - `size`가 1보다 작으면 빈 배열(`[]`)을 반환합니다.
// - 마지막 덩어리는 남은 요소의 개수가 `size`보다 적더라도 포함되어야 합니다.
// - 원본 배열을 수정하지 않는 불변성을 유지해야 합니다.

// **4. 핵심 로직**
// - `for` 루프를 `size` 단위로 건너뛰며 순회합니다.
// - 각 단계에서 `array.slice(i, i + size)`를 사용하여 덩어리를 추출합니다.
export function chunk<T>(array: T[], size: number = 1): T[][] {
  if (size < 1) {
    // 빈 배열을 반환할 때도 타입을 캐스팅해주면 안전합니다.
    return [] as T[][];
  }

  // ★ 핵심: result의 타입을 T[][]로 명시합니다.
  const result: T[][] = []; 

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}