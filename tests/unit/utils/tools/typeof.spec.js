import { describe, expect, test } from 'vitest'
import {
  // 缓存 Object.prototype.toString
  objectToString,
  // 返回 Object.prototype.toString 的结果
  toTypeString,
  // Object.prototype.toString 的具体 type
  toRawType,
  // 是否为数组
  isArray,
  // 是否为 Map
  isMap,
  // 是否为 Set
  isSet,
  // 是否为 Date
  isDate,
  // 是否为正则表达式
  isRegExp,
  // 是否为函数
  isFunction,
  // 是否为字符串
  isString,
  // 是否为 Symbol
  isSymbol,
  // 是否为对象
  isObject,
  // 是否为 Promise
  isPromise
} from 'lib/typeof'


describe('lib/typeof.ts', () => {
  // 缓存 Object.prototype.toString
  test('objectToString', () => {
    expect(objectToString).toEqual(Object.prototype.toString)
  })

  // 返回 Object.prototype.toString 的结果
  test('toTypeString', () => {
    expect(toTypeString({})).toBe('[object Object]')
    expect(toTypeString([])).toBe('[object Array]')
    expect(toTypeString(/\s/)).toBe('[object RegExp]')
    expect(toTypeString(Promise.resolve(1))).toBe('[object Promise]')
    expect(toTypeString(new Map())).toBe('[object Map]')
    expect(toTypeString(new Set())).toBe('[object Set]')
    expect(toTypeString(new Date())).toBe('[object Date]')
  })

  // Object.prototype.toString 的具体 type
  test('toRawType', () => {
    expect(toRawType({})).toBe('Object')
    expect(toRawType([])).toBe('Array')
    expect(toRawType(/\s/)).toBe('RegExp')
    expect(toRawType(Promise.resolve(1))).toBe('Promise')
    expect(toRawType(new Map())).toBe('Map')
    expect(toRawType(new Set())).toBe('Set')
    expect(toRawType(new Date())).toBe('Date')
  })

  // 是否为数组
  test('isArray', () => {
    expect(isArray([])).toBe(true)
  })

  // 是否为 Map
  test('isMap', () => {
    expect(isMap(new Map)).toBe(true)
  })

  // 是否为 Set
  test('isSet', () => {
    expect(isSet(new Set)).toBe(true)
  })

  // 是否为 Date
  test('isDate', () => {
    expect(isDate(new Date)).toBe(true)
  })

  // 是否为正则表达式
  test('isRegExp', () => {
    expect(isRegExp(/\s/)).toBe(true)
  })

  // 是否为函数
  test('isFunction', () => {
    const noop = function () {}
    expect(isFunction(noop)).toBe(true)
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
  })

  // 是否为字符串
  test('isString', () => {
    expect(isString('string')).toBe(true)
  })

  // 是否为 Symbol
  test('isSymbol', () => {
    expect(isSymbol(Symbol('Symbol'))).toBe(true)
    expect(isSymbol(Symbol.for('Symbol'))).toBe(true)
  })

  // 是否为对象
  test('isObject', () => {
    expect(isObject({})).toBe(true)
    expect(isObject({key: 1})).toBe(true)
  })

  // 是否为 Promise
  test('isPromise', () => {
    const defer = new Promise((resolve, reject) => {resolve(1)})
    expect(isPromise(defer)).toBe(true)
    expect(isPromise(Promise.resolve(1))).toBe(true)
  })
})
