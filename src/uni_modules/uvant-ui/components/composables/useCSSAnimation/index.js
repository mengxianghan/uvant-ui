import { ref, computed } from 'vue'
import { isDef, isNullOrEmpty } from '../../utils'
import { isFunction, defaultTo } from 'lodash-es'

/**
 * @typedef Option
 * @property {string} name - 动画名称（预设动画），可选：【fade;slide-up;slide-down;slide-left;slide-right;】
 * @property {number | string} [duration]
 * @property {function} [onBeforeEnter]
 * @property {function} [onEnter]
 * @property {function} [onAfterEnter]
 * @property {function} [onBeforeLeave]
 * @property {function} [onLeave]
 * @property {function} [onAfterLeave]
 */

/**
 * @param {Option} _options
 * @returns
 */
export function useCSSAnimation(_options = {}) {
    const options = ref({
        ..._options,
    })
    const classes = ref(null)
    const display = ref(false)
    const visible = ref(false)

    const styles = computed(() => {
        return {
            animationDuration: !isNullOrEmpty(options.value.duration) ? `${options.value.duration}s` : '',
            display: display.value ? 'block' : 'none',
            zIndex: defaultTo(options.value.zIndex),
        }
    })

    /**
     * @param {Option} _options
     * @returns
     */
    function open(_options) {
        setOption(_options)
        if (!isDef(options.value.name)) {
            return
        }
        visible.value = true
        display.value = true
        dispatch('onBeforeEnter')
        classes.value = getClassNames('enter')
    }

    function close() {
        if (!isDef(options.value.name)) {
            return
        }
        visible.value = false
        dispatch('onBeforeLeave')
        classes.value = getClassNames('leave')
    }

    function getClassNames(key) {
        const classes = {
            enter: `${options.value.name}-enter-from ${options.value.name}-enter-active`,
            'enter-to': `${options.value.name}-enter-to ${options.value.name}-enter-active`,
            leave: `${options.value.name}-leave-from ${options.value.name}-leave-active`,
            'leave-to': `${options.value.name}-leave-to ${options.value.name}-leave-active`,
        }

        return classes[key]
    }

    function onAnimationstart() {
        if (visible.value) {
            classes.value = getClassNames('enter-to')
            dispatch('onEnter')
        } else {
            classes.value = getClassNames('leave-to')
            dispatch('onLeave')
        }
    }

    function onAnimationend() {
        classes.value = null
        display.value = visible.value

        if (visible.value) {
            dispatch('onAfterEnter')
        } else {
            dispatch('onAfterLeave')
        }
    }

    /**
     * @param {Option} _options
     */
    function setOption(_options = {}) {
        options.value = {
            ...options.value,
            ..._options,
        }
    }

    function dispatch(name) {
        if (isFunction(options.value[name])) {
            options.value[name]()
        }
    }

    return { classes, styles, onAnimationstart, onAnimationend, open, close, setOption, visible }
}
