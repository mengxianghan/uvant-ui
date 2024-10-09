/**
 * 添加单位
 * @param value
 * @returns {*|string}
 */
export function addUnit(value) {
    return /[a-zA-Z%]+$/.test(value) ? value : `${value}px`
}

export function isDef(value) {
    return value !== undefined && value !== null
}

export function isFunction(value) {
    return typeof value === 'function'
}

export function isObject(value) {
    return value !== null && typeof value === 'object'
}

export function isNumberic(value) {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value)
}

export function isMobile(value) {
    value = value.replace(/[^-|\d]/g, '')
    return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

export function isEmpty(value) {
    return value === '' || value === undefined || value === null
}

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
