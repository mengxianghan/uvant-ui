<template>
    <view
        :class="[
            bem(),
            {
                'van-safe-area-bottom': safeAreaInsetBottom,
            },
        ]"
        :style="styles"
        @touchstart="(e) => (props.contentDraggable ? onTouchstart(e) : '')"
        @touchmove="(e) => (props.contentDraggable ? onTouchmove(e) : '')"
        @touchend="(e) => (props.contentDraggable ? onTouchend(e) : '')"
        @touchcancel="(e) => (props.contentDraggable ? onTouchend(e) : '')">
        <view
            :class="bem('header')"
            @touchstart="(e) => (!props.contentDraggable ? onTouchstart(e) : '')"
            @touchmove="(e) => (!props.contentDraggable ? onTouchmove(e) : '')"
            @touchend="(e) => (!props.contentDraggable ? onTouchend(e) : '')"
            @touchcancel="(e) => (!props.contentDraggable ? onTouchend(e) : '')">
            <slot name="header">
                <view :class="bem('header-bar')"></view>
            </slot>
        </view>
        <scroll-view
            :scroll-y="open"
            :class="bem('content')"
            @scroll="onScroll">
            <slot></slot>
        </scroll-view>
    </view>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import {
    getSystemInfoSync,
    addUnit,
    closest,
    preventDefault,
    createNamespace,
    makeArrayProp,
    makeNumericProp,
    truthProp,
    makeNumberProp,
} from '../utils'
import { useTouch } from '../composables/useTouch'
import { defaultTo } from 'lodash-es'

const props = defineProps({
    anchors: makeArrayProp(),
    duration: makeNumericProp(0.3),
    contentDraggable: truthProp,
    safeAreaInsetBottom: truthProp,
})
const emits = defineEmits(['heightChange'])
const height = defineModel('height', makeNumberProp(0))
const open = defineModel('open', { type: Boolean })

const touch = useTouch()
const { bem } = createNamespace('floating-panel')

let startY
let maxScroll = -1
const DAMP = 0.2
const dragging = ref(false)
const scrollTop = ref(0)

const boundary = computed(() => {
    const { windowHeight } = getSystemInfoSync()
    return {
        min: defaultTo(props.anchors[0], 100),
        max: defaultTo(props.anchors[props.anchors.length - 1], Math.round(windowHeight * 0.6)),
    }
})
const anchors = computed(() => (props.anchors.length >= 2 ? props.anchors : [boundary.value.min, boundary.value.max]))
const styles = computed(() => ({
    height: addUnit(boundary.value.max),
    transform: `translateY(calc(100% + ${addUnit(-height.value)}))`,
    transition: !dragging.value ? `transform ${props.duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28)` : 'none',
}))

watch(
    boundary,
    () => {
        height.value = closest(anchors.value, height.value)
    },
    { immediate: true }
)

onMounted(() => {
    if (open.value) {
        toggle(open.value)
    }
})

function ease(moveY) {
    const absDistance = Math.abs(moveY)
    const { min, max } = boundary.value

    if (absDistance > max) {
        return -(max + (absDistance - max) * DAMP)
    }

    if (absDistance < min) {
        return -(min - (min - absDistance) * DAMP)
    }

    return moveY
}

function onTouchstart(e) {
    touch.start(e)
    dragging.value = true
    startY = -height.value
    maxScroll = -1
}

function onTouchmove(e) {
    touch.move(e)

    maxScroll = Math.max(maxScroll, scrollTop.value)

    if (-startY < boundary.value.max) {
        preventDefault(e, true)
    } else if (!(scrollTop.value <= 0 && touch.deltaY.value > 0) || maxScroll > 0) {
        return
    }

    const moveY = touch.deltaY.value + startY
    height.value = -ease(moveY)
}

function onTouchend() {
    maxScroll = -1
    dragging.value = false
    height.value = closest(anchors.value, height.value)

    if (height.value !== -startY) {
        emits('heightChange', { height: height.value })
    }

    open.value = height.value !== boundary.value.min
}

function onScroll(e) {
    console.log(e)
    scrollTop.value = e.detail.scrollTop
}

function toggle(_open = !open.value) {
    height.value = _open ? boundary.value.max : boundary.value.min
    open.value = _open
    emits('heightChange', { height: height.value })
}

defineExpose({ toggle })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
