import { defaultTo } from 'lodash-es'

export const extend = Object.assign

export function noop() {}

/**
 * @param {*} value
 * @returns
 */
export function isDef(value) {
    return value !== undefined && value !== null
}

/**
 * @param {*} value
 * @returns
 */
export function isFunction(value) {
    return typeof value === 'function'
}

/**
 * @param {*} value
 * @returns
 */
export function isObject(value) {
    return value !== null && typeof value === 'object'
}

/**
 * @param {*} value
 * @returns
 */
export function isNumber(value) {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value)
}

/**
 * @param {*} value
 * @returns
 */
export function isMobile(value) {
    value = value.replace(/[^-|\d]/g, '')
    return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

/**
 * @param {*} value
 * @returns
 */
export function isEmpty(value) {
    return value === '' || value === undefined || value === null
}

/**
 * @param {*} value
 * @returns
 */
export function isArray(value) {
    return Array.isArray(value)
}

/**
 * @param {*} val
 * @returns
 */
export function isPromise(val) {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

/**
 * @returns
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

let systemInfo = null
export function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = uni.getSystemInfoSync()
    }

    return systemInfo
}

/**
 * @param {*} v1
 * @param {*} v2
 * @returns
 */
function compareVersion(v1, v2) {
    v1 = v1.split('.')
    v2 = v2.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
        v1.push('0')
    }
    while (v2.length < len) {
        v2.push('0')
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i], 10)
        const num2 = parseInt(v2[i], 10)

        if (num1 > num2) {
            return 1
        }
        if (num1 < num2) {
            return -1
        }
    }

    return 0
}

function gte(version) {
    const system = getSystemInfoSync()

    return compareVersion(system.SDKVersion, version) >= 0
}

export function canIUseCanvas2d() {
    return gte('2.9.0')
}

/**
 * @param {*} context
 * @param {*} selector
 * @returns
 */
export function getRect(context, selector) {
    return new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect((data) => {
                resolve(data)
            })
            .exec()
    })
}

export function mergeClassNames(...args) {
    const classNames = []
    args.forEach((item) => {
        if (item && typeof item === 'string') {
            classNames.push(item)
        }
        if (Array.isArray(item)) {
            classNames.push(...mergeClassNames(item))
        }
        if (isObject(item)) {
            for (const key in item) {
                if (item[key]) {
                    classNames.push(key)
                }
            }
        }
    })

    return classNames.join(' ')
}

/**
 * @param {*} object
 * @param {string} path
 * @returns {*}
 */
export function get(object, path) {
    const keys = path.split('.')
    let result = object

    keys.forEach((key) => {
        result = isObject(result) ? defaultTo(result[key], '') : ''
    })

    return result
}
