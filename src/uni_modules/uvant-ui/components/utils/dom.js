import { useWindowSize } from '../composables'

export const stopPropagation = (event) => event.stopPropagation()

export function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault()
    }

    if (isStopPropagation) {
        stopPropagation(event)
    }
}

export const getRect = (context, selector) =>
    new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect((rect) => {
                resolve(rect)
            })
            .exec()
    })

export const getAllRect = (context, selector) =>
    new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect((rect) => {
                resolve(rect)
            })
            .exec()
    })

export const { width: windowWidth, height: windowHeight } = useWindowSize()
