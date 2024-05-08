// 缓存 Object.prototype.toString
export const objectToString = Object.prototype.toString

// 返回 Object.prototype.toString 的结果
export const toTypeString = (value: unknown): string => objectToString.call(value)

/**
 * 解析出 Object.prototype.toString 的具体 type
 * @param value 需要判断的参数
 * @returns extract "RawType" from strings like "[object RawType]"
 */
export const toRawType = (value: unknown): string => toTypeString(value).slice(8, -1)

// 是否为数组
export const isArray = Array.isArray

// 是否为 Map
export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'

// 是否为 Set
export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'

// 是否为 Date
export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'

// 是否为正则表达式
export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'

// 是否为函数
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

// 是否为字符串
export const isString = (val: unknown): val is string => typeof val === 'string'

// 是否为 Symbol
export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

// 是否为对象
export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

// 是否为 Promise
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return (
    toTypeString(val) === '[object Promise]'
    || (isObject(val) || isFunction(val))
      && isFunction((val as any).then)
      && isFunction((val as any).catch)
  )
}