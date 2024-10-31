import { isDef, isNumeric } from './index'

export function addUnit(value) {
    if (isDef(value)) {
        return isNumeric(value) ? `${value}px` : String(value)
    }
    return undefined
}

export function getSizeStyle(originSize) {
    if (isDef(originSize)) {
        if (Array.isArray(originSize)) {
            return {
                width: addUnit(originSize[0]),
                height: addUnit(originSize[1]),
            }
        }
        const size = addUnit(originSize)
        return {
            width: size,
            height: size,
        }
    }
}

export function getZIndexStyle(zIndex) {
    const style = {}
    if (zIndex !== undefined) {
        style.zIndex = +zIndex
    }
    return style
}

const camelizeRE = /-(\w)/g

export const camelize = (str) => str.replace(camelizeRE, (_, c) => c.toUpperCase())

export const kebabCase = (str) =>
    str
        .replace(/([A-Z])/g, '-$1')
        .toLowerCase()
        .replace(/^-/, '')

export const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

function trimExtraChar(value, char, regExp) {
    const index = value.indexOf(char)

    if (index === -1) {
        return value
    }

    if (char === '-' && index !== 0) {
        return value.slice(0, index)
    }

    return value.slice(0, index + 1) + value.slice(index).replace(regExp, '')
}

export function formatNumber(value, allowDot = true, allowMinus = true) {
    if (allowDot) {
        value = trimExtraChar(value, '.', /\./g)
    } else {
        value = value.split('.')[0]
    }

    if (allowMinus) {
        value = trimExtraChar(value, '-', /-/g)
    } else {
        value = value.replace(/-/, '')
    }

    const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g

    return value.replace(regExp, '')
}

// add num and avoid float number
export function addNumber(num1, num2) {
    const cardinal = 10 ** 10
    return Math.round((num1 + num2) * cardinal) / cardinal
}
