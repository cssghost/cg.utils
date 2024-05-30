import { isArray, isObject, isString, isSymbol, isDate } from './typeof'

/**
 * 是否为空数据 (空字符串，空数组，空对象)
 * @param {String|Array|Object}   value  判断的数据
 */
export function isEmpty (value: any): boolean {
  if ((isArray(value) || isString(value)) && !value.length) {
    return true
  }

  if (isObject(value) && !Object.keys(value).length) {
    return true
  }

  return value === undefined || value === null
}


/**
 * 伪强等判断
 * 把对比值转为 字符串判断是否相等，主要是转化数字型参数
 * @param {Any} value     参考值
 * @param {Any} contrast  对比值
 * @return 判断两个值在转为 String 型后是否相等
 */
export function isEqual (value: any, contrast: any): boolean {
  if (value === contrast) {
    return true
  }

  let valueValidType = isSymbol(value)
  let contrastValidType = isSymbol(contrast)

  if (valueValidType || contrastValidType) {
    return value === contrast
  }

  valueValidType = isDate(value)
  contrastValidType = isDate(contrast)

  if (valueValidType || contrastValidType) {
    return valueValidType && contrastValidType ? value.getTime() === contrast.getTime() : false
  }

  valueValidType = isArray(value)
  contrastValidType = isArray(contrast)

  if (valueValidType || contrastValidType) {
    return valueValidType && contrastValidType ? isDeepEqual(value, contrast) : false
  }

  valueValidType = isObject(value)
  contrastValidType = isObject(contrast)

  if (valueValidType || contrastValidType) {
    return valueValidType && contrastValidType ? isDeepEqual(value, contrast) : false
  }

  return String(value) === String(contrast)
}

/**
 * 深层判断两个数据是否相等
 * @param {Any} value     参考值
 * @param {Any} contrast  对比值
 * @return 判断两个值在转为 String 型后是否相等
 */
export function isDeepEqual (value: any, contrast: any) {
  if (isArray(value) && isArray(contrast)) {
    if (value.length !== contrast.length) {
      return false
    }

    // 不考虑顺序问题
    for (let i = 0; i < value.length; i++) {
      if (!isEqual(value[i], contrast[i])) {
        return false
      }
    }

    return true
  }

  if (isObject(value) && isObject(contrast)) {
    const keys = Object.keys(value)

    if (keys.length !== Object.keys(contrast).length) {
      return false
    }

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (!(key in contrast) || !isEqual(value[key], contrast[key])) {
        return false
      }
    }

    return true
  }

  return isEqual(value, contrast)
}

/**
 * 节流函数
 */
export function throttle (fn: Function, delay: number) {
  let timer: any = null
  return function (...args: any[]) {
    if (timer) {
      return
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

/**
 * 防抖函数
 */
export function debounce (fn: Function, delay: number) {
  let timer: any = null
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}