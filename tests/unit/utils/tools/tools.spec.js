import { vi, describe, expect, test, it, beforeEach } from 'vitest'
import {
  // 是否为空数据 (空字符串，空数组，空对象)
  isEmpty,
  // 伪强等判断
  isEqual,
  // 深层判断两个数据是否相等
  isDeepEqual,
  // 节流函数
  throttle,
  // 防抖函数
  debounce
} from 'lib/tools'


describe('lib/tools.ts', () => {
  // 是否为空数据 (空字符串，空数组，空对象)
  test('isEmpty', () => {
    expect(isEmpty({})).toBeTruthy()
    expect(isEmpty([])).toBeTruthy()
    expect(isEmpty('')).toBeTruthy()
    expect(isEmpty(null)).toBeTruthy()
    expect(isEmpty(undefined)).toBeTruthy()
    expect(isEmpty({a: 1})).toBeFalsy()
    expect(isEmpty([1, 2, 3])).toBeFalsy()
    expect(isEmpty('df')).toBeFalsy()
    expect(isEmpty(0)).toBeFalsy()
    expect(isEmpty(1)).toBeFalsy()
    expect(isEmpty(false)).toBeFalsy()
  })

  // 伪强等判断
  test('should return true for equal values', () => {
    expect(isEqual(1, 1)).toBeTruthy()
    expect(isEqual('a', 'a')).toBeTruthy()
    expect(isEqual(true, true)).toBeTruthy()
    expect(isEqual({}, {})).toBeTruthy()
    expect(isEqual([], [])).toBeTruthy()
  })

  test('should return false for non-equal values', () => {
    expect(isEqual(1, 2)).toBeFalsy()
    expect(isEqual('a', 'b')).toBeFalsy()
    expect(isEqual(true, false)).toBeFalsy()
    expect(isEqual({}, { a: 1 })).toBeFalsy()
    expect(isEqual([], [1])).toBeFalsy()
  })

  test('should return true for equal symbols', () => {
    const sym1 = Symbol()
    const sym2 = Symbol()
    expect(isEqual(sym1, sym1)).toBeTruthy()
    expect(isEqual(sym1, sym2)).toBeFalsy()
  })

  test('should return true for equal dates', () => {
    const date1 = new Date(2021, 0, 1)
    const date2 = new Date(2021, 0, 1)
    expect(isEqual(date1, date1)).toBeTruthy()
    expect(isEqual(date1, date2)).toBeTruthy()
    expect(isEqual(date1, new Date(2022, 0, 1))).toBeFalsy()
  })

  test('should return true for deep equal arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 3])).toBeTruthy()
    expect(isDeepEqual([1, [2, 3]], [1, [2, 3]])).toBeTruthy()
    expect(isDeepEqual([{ a: 1 }], [{ a: 1 }])).toBeTruthy()
  })

  test('should return false for deep non-equal arrays', () => {
    expect(isDeepEqual([1, 2, 3], [1, 2, 4])).toBeFalsy()
    expect(isDeepEqual([1, [2, 3]], [1, [2, 4]])).toBeFalsy()
    expect(isDeepEqual([{ a: 1 }], [{ b: 1 }])).toBeFalsy()
  })

  test('should return true for deep equal objects', () => {
    expect(isDeepEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBeTruthy()
    expect(isDeepEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBeTruthy()
  })

  test('should return false for deep non-equal objects', () => {
    expect(isDeepEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBeFalsy()
    expect(isDeepEqual({ a: { b: 2 } }, { a: { c: 2 } })).toBeFalsy()
  })
})

// 节流函数
describe('lib/tools.ts => throttle', () => {
  let mockFn
  let throttledFn
  const delay = 100

  beforeEach(() => {
    mockFn = vi.fn()
    throttledFn = throttle(mockFn, delay)
  })

  it('should call the passed function only once within the specified delay', () => {
    const t0 = performance.now()
    throttledFn()
    throttledFn()
    throttledFn()

    setTimeout(() => {
      const t1 = performance.now()

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(t1 - t0).toBeGreaterThanOrEqual(delay)
    }, delay)
  })

  it('should call the passed function with the correct arguments', () => {
    const arg1 = 'test1'
    const arg2 = 'test2'
    throttledFn(arg1, arg2)
    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledWith(arg1, arg2)
    }, delay)
  })

  it('should not call the passed function if called again within the delay', () => {
    throttledFn()

    setTimeout(() => {
      throttledFn()

      setTimeout(() => {
        expect(mockFn).toHaveBeenCalledTimes(1)
      }, delay / 2)
    }, delay / 2)

  })

  it('should call the passed function again after the delay', () => {
    throttledFn()
    setTimeout(() => {
      throttledFn()
    }, delay)

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(2)
    }, delay)
  })
})

// 防抖函数
describe('lib/tools.ts => debounce', () => {
  let originalFn
  let debouncedFn
  const delay = 100

  beforeEach(() => {
    originalFn = vi.fn()
    debouncedFn = debounce(originalFn, delay)
  })

  it('debounced function is delayed', async () => {
    debouncedFn()

    // Fast-forward time by 90ms
    setTimeout(() => {
      expect(originalFn).not.toHaveBeenCalled()

      // Fast-forward time by 10ms to reach 100ms
      setTimeout(() => {
        expect(originalFn).toHaveBeenCalledTimes(1)
      }, 10)
    }, delay - 10)
  })

  it('debounced function is called only once when triggered multiple times within delay', () => {
    debouncedFn()
    debouncedFn()
    debouncedFn()

    setTimeout(() => {
      expect(originalFn).toHaveBeenCalledTimes(1)
    }, delay)
  })

  it('debounced function is called multiple times when triggered after delay', () => {
    debouncedFn()

    setTimeout(() => {
      debouncedFn()

      setTimeout(() => {
        expect(originalFn).toHaveBeenCalledTimes(2)
      }, delay)

    }, delay)
  })

  it('debounced function call is cancelled when called again before delay', () => {
    debouncedFn()
    // Fast-forward time by 50ms
    setTimeout(() => {
      debouncedFn()

      // Fast-forward time by 50ms to reach 100ms
      setTimeout(() => {
        expect(originalFn).toHaveBeenCalledTimes(1)
      }, 50)
    }, delay - 50)
  })
})