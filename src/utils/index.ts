// 辅助函数类型定义

/**
 * 检查是否是原始值（不可变值）
 */
type Primitive = string | number | boolean | bigint | symbol | null | undefined

export function isPrimitive(value: unknown): value is Primitive {
  const type = typeof value
  return (
    value === null ||
    type === 'string' ||
    type === 'number' ||
    type === 'boolean' ||
    type === 'undefined' ||
    type === 'bigint' ||
    type === 'symbol'
  )
}

/**
 * 检查是否是日期对象
 */
export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]'
}

/**
 * 检查是否是正则表达式
 */
export function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

/**
 * 检查是否是 ArrayBuffer
 */
export function isArrayBuffer(value: unknown): value is ArrayBuffer {
  return Object.prototype.toString.call(value) === '[object ArrayBuffer]'
}

/**
 * 检查是否是普通对象（非特殊对象）
 */
export function isPlainObject(value: unknown): value is object {
  if (typeof value !== 'object' || value === null) return false

  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null || Object.getPrototypeOf(proto) === null
}

/**
 * 严格类型检查函数
 */
export function isFunction(value: unknown): value is (...arg: unknown[]) => unknown {
  return typeof value === 'function'
}

/**
 * 安全数组检测（替代方案兼容iframe边界情况）
 */
export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value)
}

/**
 * Map对象检测
 */
export function isMap<K, V>(value: unknown): value is Map<K, V> {
  return Object.prototype.toString.call(value) === '[object Map]'
}

/**
 * Set对象检测
 */
export function isSet<T>(value: unknown): value is Set<T> {
  return Object.prototype.toString.call(value) === '[object Set]'
}

/**
 * Error类型检测（包含所有继承Error的派生类）
 */
export function isError(value: unknown): value is Error {
  return Object.prototype.toString.call(value) === '[object Error]'
}

/**
 * 空对象检测（排除数组/函数/null等）
 */
export function isEmptyObject(value: unknown): value is Record<string, never> {
  return isPlainObject(value) && Object.keys(value).length === 0
}

/**
 * 严格数字检测（排除NaN和Infinity）
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * 可序列化的普通对象（排除特殊对象和类实例）
 */
export function isSerializableObject(value: unknown): value is Record<string, unknown> {
  return isPlainObject(value) && !isDate(value) && !isRegExp(value) && !isArrayBuffer(value)
}

/**
 * 深克隆任何类型的值
 * @param val - 需要克隆的值
 * @returns 深克隆后的副本
 */
export function deepClone<T>(val: T): T {
  // 使用 WeakMap 跟踪循环引用
  const CACHE = new WeakMap<object, unknown>()

  /**
   * 递归克隆函数
   * @param value - 要克隆的值
   * @returns 克隆后的值
   */
  function clone<V>(value: V): V {
    // 处理基本类型和函数
    if (isPrimitive(value) || isFunction(value)) return value
    // 特殊对象类型处理
    if (isDate(value)) return new Date(value.getTime()) as V
    if (isRegExp(value)) return new RegExp(value.source, value.flags) as V

    if (isMap(value)) {
      const map = new Map<unknown, unknown>()
      for (const [key, val] of value.entries()) {
        map.set(clone(key), clone(val))
      }
      return map as V
    }

    if (isSet(value)) {
      const set = new Set<unknown>()
      for (const val of value.values()) {
        set.add(clone(val))
      }
      return set as V
    }

    // 检查循环引用
    if (CACHE.has(value as object)) {
      return CACHE.get(value as object) as V
    }

    // 创建新对象/数组
    let newVal: Record<PropertyKey, unknown> | unknown[]
    if (Array.isArray(value)) {
      newVal = []
      CACHE.set(value as object, newVal)
      value.forEach((item, index) => {
        ;(newVal as unknown[])[index] = clone(item)
      })
    } else {
      newVal = Object.create(Object.getPrototypeOf(value))
      CACHE.set(value as object, newVal)

      // 克隆所有自有属性
      const descriptors = Object.getOwnPropertyDescriptors(value)
      for (const key in descriptors) {
        if (descriptors[key].value !== undefined) {
          ;(newVal as Record<PropertyKey, unknown>)[key] = clone(
            (value as Record<PropertyKey, unknown>)[key],
          )
        } else {
          // 处理 getter/setter
          Object.defineProperty(newVal, key, {
            get: descriptors[key].get,
            set: descriptors[key].set,
            enumerable: descriptors[key].enumerable,
            configurable: descriptors[key].configurable,
          })
        }
      }

      // 克隆 Symbol 属性
      const symbolKeys = Object.getOwnPropertySymbols(value)
      symbolKeys.forEach((sym) => {
        ;(newVal as Record<PropertyKey, unknown>)[sym] = clone(
          (value as Record<PropertyKey, unknown>)[sym],
        )
      })
    }

    return newVal as V
  }

  return clone(val)
}
