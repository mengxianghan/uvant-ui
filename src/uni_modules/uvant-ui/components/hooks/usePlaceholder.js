import { getCurrentInstance, onMounted, onUpdated, ref } from 'vue'
import { uuid } from '../utils'

export default () => {
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
        uni.createSelectorQuery()
            .in(instance.proxy)
            .select(`.${placeholderClassName.value}`)
            .boundingClientRect((data) => {
                if (!data) return
                placeholderHeight.value = data.height
            })
            .exec()
    }

    return {
        placeholderClassName,
        placeholderHeight,
    }
}
