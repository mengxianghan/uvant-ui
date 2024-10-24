<template>
    <view
        :class="[
            'van-floating-panel',
            {
                'van-safe-area-bottom': safeAreaInsetBottom,
            },
        ]"
        :style="rootStyles"
        @touchstart="(e) => (props.contentDraggable ? onTouchstart(e) : '')"
        @touchmove="(e) => (props.contentDraggable ? onTouchmove(e) : '')"
        @touchend="(e) => (props.contentDraggable ? onTouchend(e) : '')"
        @touchcancel="(e) => (props.contentDraggable ? onTouchend(e) : '')">
        <view
            class="van-floating-panel__header"
            @touchstart="(e) => (!props.contentDraggable ? onTouchstart(e) : '')"
            @touchmove="(e) => (!props.contentDraggable ? onTouchmove(e) : '')"
            @touchend="(e) => (!props.contentDraggable ? onTouchend(e) : '')"
            @touchcancel="(e) => (!props.contentDraggable ? onTouchend(e) : '')">
            <slot name="header">
                <view class="van-floating-panel__header-bar"></view>
            </slot>
        </view>
        <scroll-view
            :scroll-y="open"
            :class="['van-floating-panel__content']"
            @scroll="onScroll">
            <slot></slot>
        </scroll-view>
    </view>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { getSystemInfoSync, addUnit, closest, preventDefault } from '../utils'
import { useTouch } from '../composables/useTouch'

const props = defineProps({
    anchors: { type: Array, default: () => [] },
    duration: { type: [String, Number], default: 0.3 },
    contentDraggable: { type: Boolean, default: true },
    safeAreaInsetBottom: { type: Boolean, default: true },
})
const emits = defineEmits(['heightChange'])
const height = defineModel('height', { type: Number, default: 0 })
const open = defineModel('open', { type: Boolean, default: false })

const touch = useTouch()

let startY
let maxScroll = -1
const DAMP = 0.2
const dragging = ref(false)
const scrollTop = ref(0)

const boundary = computed(() => {
    const { windowHeight } = getSystemInfoSync()
    return {
        min: props.anchors[0] ?? 100,
        max: props.anchors[props.anchors.length - 1] ?? Math.round(windowHeight * 0.6),
    }
})
const anchors = computed(() => (props.anchors.length >= 2 ? props.anchors : [boundary.value.min, boundary.value.max]))
const rootStyles = computed(() => ({
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
