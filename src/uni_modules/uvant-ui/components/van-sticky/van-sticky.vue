<template>
    <template v-if="disabled">
        <slot></slot>
    </template>
    <template v-else>
        <view
            :class="[bem(), stickySelector]"
            :style="styles">
            <view :style="innerStyles">
                <slot></slot>
            </view>
        </view>
    </template>
</template>

<script setup>
import { computed, getCurrentInstance, onMounted, watch, reactive } from 'vue'
import {
    addUnit,
    getRect,
    getSizeStyle,
    getSystemInfoSync,
    createUniqueSelector,
    createNamespace,
    makeStringProp,
    makeNumericProp,
    isFunction,
} from '../utils'

const props = defineProps({
    position: makeStringProp('top'),
    offset: makeNumericProp(0),
    zIndex: makeNumericProp(99),
    container: Function,
    disabled: Boolean,
    pageScroll: { type: Function, default: () => {} },
})
const emits = defineEmits(['scroll', 'change'])
const scrollTop = defineModel('scrollTop', { type: Number, default: null })

const instance = getCurrentInstance()
const { name, bem } = createNamespace('sticky')
const [stickySelector] = createUniqueSelector(name)

const state = reactive({
    width: 0,
    height: 0,
    transform: 0,
    fixed: false,
})

const isTop = computed(() => props.position === 'top')
const currentOffset = computed(() => {
    const { offset } = props
    const { windowTop, windowBottom = 0 } = getSystemInfoSync()
    return isTop.value ? offset + windowTop : offset + windowBottom
})
const styles = computed(() => {
    if (!state.fixed) {
        return
    }

    return {
        height: state.fixed ? addUnit(state.height) : '',
        zIndex: props.zIndex,
    }
})
const innerStyles = computed(() => {
    if (!state.fixed) {
        return
    }

    return {
        zIndex: props.zIndex,
        [props.position]: addUnit(currentOffset.value),
        position: 'fixed',
        transform: state.transform ? `translate3d(0, ${addUnit(state.transform)}, 0)` : '',
        ...getSizeStyle([state.width, state.height]),
    }
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
    if (props.disabled) {
        state.fixed = false
        state.transform = 0
        return
    }

    scrollTop.value = _scrollTop || scrollTop.value

    const rootRect = await getRect(instance.proxy, `.${stickySelector}`)
    const containerRect = await getContainerRect()
    const { windowTop = 0, windowHeight: clientHeight } = getSystemInfoSync()

    state.width = rootRect.width
    state.height = rootRect.height

    if (isTop.value) {
        if (containerRect) {
            const difference = containerRect.bottom - currentOffset.value - state.height + windowTop
            state.fixed = currentOffset.value > rootRect.top + windowTop && containerRect.bottom > 0
            state.transform = difference < 0 ? difference : 0
        } else {
            state.fixed = currentOffset.value > rootRect.top + windowTop
        }
    } else {
        if (containerRect) {
            const difference = clientHeight - containerRect.top - currentOffset.value - state.height - windowTop
            state.fixed =
                clientHeight - currentOffset.value < rootRect.bottom + windowTop && clientHeight > containerRect.top
            state.transform = difference < 0 ? -difference : 0
        } else {
            state.fixed = clientHeight - currentOffset.value < rootRect.bottom
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
