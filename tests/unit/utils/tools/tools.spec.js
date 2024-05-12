import { describe, expect, test } from 'vitest'
import {
  // 是否为空数据 (空字符串，空数组，空对象)
  isEmpty,
  // 伪强等判断
  isEqual,
  // 深层判断两个数据是否相等
  isDeepEqual
} from 'lib/tools'


describe('lib/tools.ts', () => {
  // 是否为空数据 (空字符串，空数组，空对象)
  test('isEmpty', () => {
    expect(isEmpty({})).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty(null)).toBe(true)
    expect(isEmpty(undefined)).toBe(true)
    expect(isEmpty({a: 1})).toBe(false)
    expect(isEmpty([1, 2, 3])).toBe(false)
    expect(isEmpty('df')).toBe(false)
    expect(isEmpty(0)).toBe(false)
    expect(isEmpty(1)).toBe(false)
    expect(isEmpty(false)).toBe(false)
  })

  // 伪强等判断
  test('should return true for equal values', () => {
    expect(isEqual(1, 1)).toBeTruthy();
    expect(isEqual('a', 'a')).toBeTruthy();
    expect(isEqual(true, true)).toBeTruthy();
    expect(isEqual({}, {})).toBeTruthy();
    expect(isEqual([], [])).toBeTruthy();
  });

  test('should return false for non-equal values', () => {
    expect(isEqual(1, 2)).toBeFalsy();
    expect(isEqual('a', 'b')).toBeFalsy();
    expect(isEqual(true, false)).toBeFalsy();
    expect(isEqual({}, { a: 1 })).toBeFalsy();
    expect(isEqual([], [1])).toBeFalsy();
  });

  test('should return true for equal symbols', () => {
    const sym1 = Symbol();
    const sym2 = Symbol();
    expect(isEqual(sym1, sym1)).toBeTruthy();
    expect(isEqual(sym1, sym2)).toBeFalsy();
  });

  test('should return true for equal dates', () => {
    const date1 = new Date(2021, 0, 1);
    const date2 = new Date(2021, 0, 1);
    expect(isEqual(date1, date1)).toBeTruthy();
    expect(isEqual(date1, date2)).toBeTruthy();
    expect(isEqual(date1, new Date(2022, 0, 1))).toBeFalsy();
  });

  test('should return true for deep equal arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
    expect(isDeepEqual([1, [2, 3]], [1, [2, 3]])).toBeTruthy();
    expect(isDeepEqual([{ a: 1 }], [{ a: 1 }])).toBeTruthy();
  });

  test('should return false for deep non-equal arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 4])).toBeFalsy();
    expect(isDeepEqual([1, [2, 3]], [1, [2, 4]])).toBeFalsy();
    expect(isDeepEqual([{ a: 1 }], [{ b: 1 }])).toBeFalsy();
  });

  test('should return true for deep equal objects', () => {
    expect(isDeepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy();
    expect(isDeepEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBeTruthy();
  });

  test('should return false for deep non-equal objects', () => {
    expect(isDeepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBeFalsy();
    expect(isDeepEqual({ a: { b: 2 } }, { a: { c: 2 } })).toBeFalsy();
  });
})
