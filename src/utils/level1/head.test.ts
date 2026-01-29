import { describe, it, expect } from 'vitest';
import { head } from './head'; // 프로젝트 파일명에 따라 수정

describe('head (first) 함수 테스트', () => {
  it('배열의 첫 번째 요소를 정확히 반환해야 한다', () => {
    expect(head([1, 2, 3])).toBe(1);
    expect(head(['a', 'b'])).toBe('a');
  });

  it('빈 배열 입력 시 undefined를 반환해야 한다', () => {
    expect(head([])).toBeUndefined();
  });
});