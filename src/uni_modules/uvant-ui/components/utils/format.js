import { isDef } from './index'

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

/**
 * @param {Number} zIndex
 * @returns
 */
export function getZIndexStyle(zIndex) {
    const style = {}
    if (zIndex !== undefined) {
        style.zIndex = +zIndex
    }
    return style
}
