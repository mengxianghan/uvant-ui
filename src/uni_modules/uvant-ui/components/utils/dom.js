export function stopPropagation(event) {
    return event.stopPropagation()
}

export function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault()
    }

    if (isStopPropagation) {
        stopPropagation(event)
    }
}

export function querySelector(selector) {
    return uni.createSelectorQuery().select(selector)
}
