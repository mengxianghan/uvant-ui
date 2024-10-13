/**
 * 添加单位
 * @param value
 * @returns {*|string}
 */
export function addUnit(value) {
    return /[a-zA-Z%]+$/.test(value) ? value : `${value}px`
}

/**
 * 是否定义
 * @param {*} value
 * @returns
 */
export function isDef(value) {
    return value !== undefined && value !== null
}

/**
 * 是否函数
 * @param {*} value
 * @returns
 */
export function isFunction(value) {
    return typeof value === 'function'
}

/**
 * 是否对象
 * @param {*} value
 * @returns
 */
export function isObject(value) {
    return value !== null && typeof value === 'object'
}

/**
 * 是否数字
 * @param {*} value
 * @returns
 */
export function isNumber(value) {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value)
}

/**
 * 是否手机号
 * @param {*} value
 * @returns
 */
export function isMobile(value) {
    value = value.replace(/[^-|\d]/g, '')
    return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

/**
 * 是否为空
 * @param {*} value
 * @returns
 */
export function isEmpty(value) {
    return value === '' || value === undefined || value === null
}

/**
 * 是否数组
 * @param {*} value
 * @returns
 */
export function isArray(value) {
    return Array.isArray(value)
}

/**
 * uuid
 * @returns
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

/**
 * 获取系统信息
 * @returns
 */
let systemInfo = null
export function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = uni.getSystemInfoSync()
    }

    return systemInfo
}

/**
 * 版本号对比
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
 * 获取 DOMRect
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
