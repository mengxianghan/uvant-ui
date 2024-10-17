import { isDef, isObject } from './basic'

const { hasOwnProperty } = Object.prototype

/**
 *
 * @param {object} to
 * @param {object} from
 * @param {string} key
 * @returns
 */
function assignKey(to, from, key) {
    const val = from[key]

    if (!isDef(val)) {
        return
    }

    if (!hasOwnProperty.call(to, key) || !isObject(val)) {
        to[key] = val
    } else {
        to[key] = deepAssign(Object(to[key]), val)
    }
}

/**
 * @param {object} to
 * @param {object} from
 * @returns
 */
export function deepAssign(to, from) {
    Object.keys(from).forEach((key) => {
        assignKey(to, from, key)
    })

    return to
}
