export {
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
} from './typeof.ts'

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  element.addEventListener('click', () => setCounter(++counter))
  setCounter(0)
}
