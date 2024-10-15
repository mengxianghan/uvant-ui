<template>
    <view
        class="van-sticky"
        :class="cpClass"
        :style="cpStyle">
        <view :style="cpInnerStyle">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
import { computed, getCurrentInstance, ref, onMounted, watch, reactive } from 'vue'
import { addUnit, getRect, getSystemInfoSync, isFunction } from '../utils'
import { uniqueId } from 'lodash-es'

const props = defineProps({
    position: { type: String, default: 'top', validator: (value) => ['top', 'bottom'].includes(value) },
    offset: { type: [Number, String], default: 0 },
    zIndex: { type: [Number, String], default: 99 },
    container: Function,
    disabled: { type: Boolean, default: false },
    pageScroll: { type: Function, default: () => {}, required: true },
})
const emits = defineEmits(['scroll', 'change'])
const scrollTop = defineModel('scrollTop', { type: Number, default: null })

const instance = getCurrentInstance()
const stickySelector = ref(uniqueId('van-sticky-'))

const state = reactive({
    width: 0,
    height: 0,
    transform: 0,
    fixed: false,
})

const cpIsTop = computed(() => props.position === 'top')
const cpOffset = computed(() => {
    const { offset } = props
    const { windowTop, windowBottom = 0 } = getSystemInfoSync()
    return cpIsTop.value ? offset + windowTop : offset + windowBottom
})
const cpClass = computed(() => {
    return {
        [`${stickySelector.value}`]: true,
    }
})
const cpStyle = computed(() => {
    if (!state.fixed) {
        return
    }

    return {
        height: state.fixed ? addUnit(state.height) : '',
        zIndex: props.zIndex,
    }
})
const cpInnerStyle = computed(() => {
    const { zIndex, position } = props

    if (!state.fixed) {
        return
    }

    const style = {
        zIndex,
        [position]: addUnit(cpOffset.value),
        width: addUnit(state.width),
        height: addUnit(state.height),
        position: 'fixed',
        transform: state.transform ? `translate3d(0, ${addUnit(state.transform)}, 0)` : '',
    }

    return style
})

watch([() => scrollTop.value, () => props.disabled, () => props.position], () => {
    onScroll({ scrollTop: scrollTop.value })
})
watch(
    () => state.fixed,
    (value) => {
        emits('change', value)
    }
)

onMounted(() => {
    onScroll()

    if (isFunction(props.pageScroll)) {
        props.pageScroll((e) => {
            onScroll({ scrollTop: e.scrollTop })
        })
    }
})

async function onScroll({ scrollTop: _scrollTop } = {}) {
    const { disabled } = props

    if (disabled) {
        state.fixed = false
        state.transform = 0
        return
    }

    scrollTop.value = _scrollTop || scrollTop.value

    const rootRect = await getRect(instance.proxy, `.${stickySelector.value}`)
    const containerRect = await getContainerRect()
    const { windowTop = 0, windowHeight: clientHeight } = getSystemInfoSync()

    state.width = rootRect.width
    state.height = rootRect.height

    if (cpIsTop.value) {
        if (containerRect) {
            const difference = containerRect.bottom - cpOffset.value - state.height + windowTop
            state.fixed = cpOffset.value > rootRect.top + windowTop && containerRect.bottom > 0
            state.transform = difference < 0 ? difference : 0
        } else {
            state.fixed = cpOffset.value > rootRect.top + windowTop
        }
    } else {
        if (containerRect) {
            const difference = clientHeight - containerRect.top - cpOffset.value - state.height - windowTop
            state.fixed =
                clientHeight - cpOffset.value < rootRect.bottom + windowTop && clientHeight > containerRect.top
            state.transform = difference < 0 ? -difference : 0
        } else {
            state.fixed = clientHeight - cpOffset.value < rootRect.bottom + windowTop
        }
    }

    emits('scroll', { scrollTop, isFixed: state.fixed })
}

function getContainerRect() {
    const nodesRef = props.container?.()

    if (!nodesRef) {
        return Promise.resolve(null)
    }

    return new Promise((resolve) => nodesRef.boundingClientRect(resolve).exec())
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
