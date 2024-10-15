import { isDef } from './index'

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

export function addUnit(value) {
    return /[a-zA-Z%]+$/.test(value) ? value : `${value}px`
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

export function addNumber(num1, num2) {
    const cardinal = 10 ** 10
    return Math.round((num1 + num2) * cardinal) / cardinal
}
