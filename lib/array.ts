import { deepCopy, isFunction, isEqual } from './index.js'

/**
 * 模拟 Array.push,并返回新数组
 * @type Function
 * @param {Array}      array  数组数据
 * @param {Arguments}  args   Array.push 的参数
 */
export function arrPush (array, ...args) {
  return [...array, ...args]
}

/**
 * 模拟 Array.Unshift,并返回新数组
 * @type Function
 * @param {Array}      array  数组数据
 * @param {Arguments}  args   Array.Unshift 的参数
 */
export function arrUnshift (array, ...args) {
  return [...args, ...array]
}

/**
 * 模拟 Array.shift,并返回新数组
 * @type Function
 * @param {Array}    array  数组数据
 */
export function arrShift (array) {
  // 浏览器支持 toSpliced 的时候(不改变原数组的 splice 方法)
  if (isFunction(Array.prototype.toSpliced)) {
    return array.toSpliced(0, 1)
  }

  return array.slice(1)
}

/**
 * 模拟 Array.pop,并返回新数组
 * @type Function
 * @param {Array}    array  数组数据
 */
export function arrPop (array) {
  // 浏览器支持 toSpliced 的时候(不改变原数组的 splice 方法)
  if (isFunction(Array.prototype.toSpliced)) {
    return array.toSpliced(array.length - 1, 1)
  }

  return array.slice(1, -1)
}

/**
 * 返回数组第一个深拷贝后的数组
 * @param {Array}    array  数组数据
 */
export function firstChild (array) {
  return deepCopy(array[0])
}

/**
 * 返回数组最后一个深拷贝后的数组
 * @param {Array}    array  数组数据
 */
export function lastChild (array) {
  return deepCopy(array[array.length - 1])
}

/**
 * 根据 index 插入节点
 * @param {Array}      array  数组数据
 * @param {Number}     index  插入的 index
 * @param {Arguments}  nodes  插入的数据
 */
export function insertChild (array, index, ...nodes) {
  // 浏览器支持 toSpliced 的时候(不改变原数组的 splice 方法)
  if (isFunction(Array.prototype.toSpliced)) {
    return array.toSpliced(index, 0, ...nodes)
  }

  const left = array.slice(0, index)
  const right = array.slice(index)

  return [...left, ...nodes, ...right]
}

/**
 * 根据 index 上移节点
 * @param {Array}   array  数组数据
 * @param {Number}  index  目标的 index
 */
export function moveUpByIndex (array, index) {
  if (!index || index === 0) {
    return array
  }

  const item = array[index]
  const newArr = removeByIndex(array, index)

  return insertChild(newArr, index - 1, item)
}

/**
 * 根据 value 上移节点
 * @param {Array}   array  数组数据
 * @param {Any}     value  标识的 value
 */
export function moveUpByValue (array, value) {
  const index = array.findIndex(item => isEqual(item, value))

  if (index < 0) {
    console.warn('<moveUpByValue> array is not find node by key')

    return array
  }

  return moveUpByIndex(array, index)
}

/**
 * 根据标识上移节点
 * @param {Array}   array  数组数据
 * @param {Any}     key    标识的 key
 * @param {Any}     value  标识的 value
 */
export function moveUpByAlias (array, key, value) {
  const index = array.findIndex(item => isEqual(item[key], value))

  if (index < 0) {
    console.warn('<moveUpByAlias> array is not find node by key')

    return array
  }

  return moveUpByIndex(array, index)
}

/**
 * 根据 index 下移节点
 * @param {Array}   array  数组数据
 * @param {Number}  index  目标的 index
 */
export function moveDownByIndex (array, index) {
  if (index === array.length - 1) {
    return array
  }

  const item = array[index]
  const newArr = removeByIndex(array, index)

  return insertChild(newArr, index + 1, item)
}

/**
 * 根据 value 下移节点
 * @param {Array}   array  数组数据
 * @param {Any}     value  标识的 value
 */
export function moveDownByValue (array, value) {
  const index = array.findIndex(item => isEqual(item, value))

  if (index < 0) {
    console.warn('<moveDownByValue> array is not find node by key')

    return array
  }

  return moveDownByIndex(array, index)
}

/**
 * 根据标识下移节点
 * @param {Array}   array  数组数据
 * @param {Any}     key    标识的 key
 * @param {Any}     value  标识的 value
 */
export function moveDownByAlias (array, key, value) {
  const index = array.findIndex(item => isEqual(item[key], value))

  if (index < 0) {
    console.warn('<moveDownByAlias> array is not find node by key')

    return array
  }

  return moveDownByIndex(array, index)
}

/**
 * 根据值删除节点，用于值为非对象类型的数组
 * @param {Array}   array  数组数据
 * @param {Any}     value  标识的 value
 */
export function removeByValue (array, value) {
  return array.filter(item => !isEqual(item, value))
}

/**
 * 根据 index 删除节点
 * @param {Array}   array  数组数据
 * @param {Number}  index  插入的 index
 * @param {Number}  count  需要删除的节点数量
 */
export function removeByIndex (array, index, count = 1) {
  // 浏览器支持 toSpliced 的时候(不改变原数组的 splice 方法)
  if (isFunction(Array.prototype.toSpliced)) {
    return array.toSpliced(index, count)
  }

  const left = array.slice(0, index)
  const right = array.slice(index + count)

  return [...left, ...right]
}

/**
 * 根据标识删除节点
 * @param {Array}   array  数组数据
 * @param {Any}     key    标识的 key
 * @param {Any}     value  标识的 value
 * @param {Number}  count  需要删除的节点数量
 */
export function removeByAlias (array, key, value, count = 1) {
  const index = array.findIndex(item => isEqual(item[key], value))

  if (index < 0) {
    console.warn('<removeByAlias> array is not find node by key')

    return array
  }

  return removeByIndex(array, index, count)
}

/**
 * 根据 index 更新节点
 * @param {Array}         array  数组数据
 * @param {Number}        index  更新的 index
 * @param {Any|Function}  node   更新的数据
 */
export function updateByIndex (array, index, node) {
  node = isFunction(node)
    ? node(deepCopy(array[index]))
    : node

  // 浏览器支持 toSpliced 的时候(不改变原数组的 splice 方法)
  if (isFunction(Array.prototype.toSpliced)) {
    return array.toSpliced(index, 1, node)
  }

  const left = array.slice(0, index)
  const right = array.slice(index + 1)

  return [...left, node, ...right]
}

/**
 * 根据标识更新节点
 * @param {Array}         array  数组数据
 * @param {Any}           key    标识的 key
 * @param {Any}           value  标识的 value
 * @param {Any}           node   更新的数据
 */
export function updateByAlias (array, key, value, node) {
  const index = array.findIndex(item => isEqual(item[key], value))

  if (index < 0) {
    console.warn('<updateByAlias> array is not find node by key')

    return array
  }

  return updateByIndex(array, index, node)
}

export default {
  /** 模拟 Array.push,并返回新数组 */
  unshift: arrUnshift,
  /** 模拟 Array.push,并返回新数组 */
  push: arrPush,
  /** 模拟 Array.unshift,并返回新数组 */
  shift: arrShift,
  /** 模拟 Array.pop,并返回新数组 */
  pop: arrPop,
  /** 返回数组第一个深拷贝后的数组  */
  firstChild,
  /** 返回数组最后一个深拷贝后的数组  */
  lastChild,
  /** 根据 index 插入节点 */
  insert: insertChild,
  /** 根据 index 删除节点 */
  remove: removeByIndex,
  /** 根据 value 删除节点 */
  removeByValue,
  /** 根据 index 删除节点 */
  removeByIndex,
  /** 根据标识删除节点 */
  removeByAlias,
  /** 根据 index 更新节点 */
  updateByIndex,
  /** 根据标识更新节点 */
  updateByAlias
}
