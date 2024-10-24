export const stopPropagation = (event) => event.stopPropagation()

export function preventDefault(event, isStopPropagation) {
    if (typeof event.cancelable !== 'boolean' || event.cancelable) {
        event.preventDefault()
    }

    if (isStopPropagation) {
        stopPropagation(event)
    }
}
