export { noop, extend, pick, omit, uniqueId, isEqual, defaultTo, debounce, get } from 'lodash-es'

export const isObject = (value) => typeof value === 'object' && value !== null

export const isDef = (value) => value !== undefined && value !== null && value !== ''

export const isFunction = (val) => typeof val === 'function'

export const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch)

export const isDate = (val) => Object.prototype.toString.call(val) === '[object Date]' && !Number.isNaN(val.getTime())

export function isMobile(value) {
    value = value.replace(/[^-|\d]/g, '')
    return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value)
}

export const isNumeric = (val) => typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)

export const isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue)

export const toArray = (item) => (Array.isArray(item) ? item : [item])

export const flat = (arr) => arr.reduce((acc, val) => acc.concat(val), [])

export function isImageUrl(url) {
    return /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i.test(url)
}

export function isVideoUrl(url) {
    return /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i.test(url)
}

export function isBoolean(value) {
    return typeof value === 'boolean'
}

export function requestAnimationFrame(cb) {
    return setTimeout(() => {
        cb()
    }, 1000 / 30)
}
