import { getCurrentInstance, onMounted, onUpdated, ref } from 'vue'
import { uuid } from '../utils'

/**
 * @param {object} options
 * @param {boolean} options.show
 */
export default (options = {}) => {
    const { show = false } = options
    const instance = getCurrentInstance()
    const placeholderClassName = ref(`van-placeholder--${uuid()}`)
    const placeholderHeight = ref(0)

    onMounted(() => {
        init()
    })

    onUpdated(() => {
        init()
    })

    function init() {
        if (!show) return

        uni.createSelectorQuery()
            .in(instance.proxy)
            .select(`.${placeholderClassName.value}`)
            .boundingClientRect((data) => {
                placeholderHeight.value = data.height
            })
            .exec()
    }

    return {
        placeholderClassName,
        placeholderHeight,
    }
}
