<template>
    <view
        v-show="show"
        :class="[bem(), rootSelector]"
        :style="rootStyles"
        @touchstart.passive="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        @click.capture="onClick">
        <slot>
            <view :class="bem('icon')">
                <van-icon :name="icon"></van-icon>
            </view>
        </slot>
    </view>
</template>

<script setup>
import {
    addUnit,
    closest,
    createNamespace,
    createUniqueSelector,
    getRect,
    makeNumberProp,
    makeStringProp,
    pick,
    windowWidth,
    windowHeight,
} from '../utils'
import { computed, nextTick, ref, onMounted, getCurrentInstance, watch } from 'vue'
import { useTouch } from '../composables'

const props = defineProps({
    gap: makeNumberProp(24),
    icon: String,
    axis: makeStringProp('y'),
    magnetic: String,
})
const emits = defineEmits(['click', 'offsetChange'])
const offset = defineModel('offset', {
    type: Object,
    default: () => ({ x: -1, y: -1 }),
})

const { bem, name } = createNamespace('floating-bubble')
const [rootSelector] = createUniqueSelector(name)
const touch = useTouch()
const instance = getCurrentInstance()

let prevX = 0
let prevY = 0
let initialized = false
const show = ref(true)
const state = ref({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
})
const dragging = ref(false)

const rootStyles = computed(() => {
    const style = {}

    const x = addUnit(state.value.x)
    const y = addUnit(state.value.y)
    style.transform = `translate3d(${x}, ${y}, 0)`

    if (dragging.value || !initialized) {
        style.transition = 'none'
    }

    return style
})
const boundary = computed(() => {
    return {
        top: props.gap,
        right: windowWidth.value - state.value.width - props.gap,
        bottom: windowHeight.value - state.value.height - props.gap,
        left: props.gap,
    }
})

watch([windowWidth, windowHeight, () => props.gap], updateState, { deep: true })

onMounted(() => {
    nextTick(() => {
        updateState()
    })
})

function onTouchStart(e) {
    touch.start(e)
    dragging.value = true

    prevX = state.value.x
    prevY = state.value.y
}

function onTouchMove(e) {
    e.preventDefault()

    touch.move(e)

    if (props.axis === 'lock') return

    if (!touch.isTap.value) {
        if (props.axis === 'x' || props.axis === 'xy') {
            let nextX = prevX + touch.deltaX.value
            if (nextX < boundary.value.left) nextX = boundary.value.left
            if (nextX > boundary.value.right) nextX = boundary.value.right
            state.value.x = nextX
        }

        if (props.axis === 'y' || props.axis === 'xy') {
            let nextY = prevY + touch.deltaY.value
            if (nextY < boundary.value.top) nextY = boundary.value.top
            if (nextY > boundary.value.bottom) nextY = boundary.value.bottom
            state.value.y = nextY
        }

        offset.value = pick(state.value, ['x', 'y'])
        updateState()
    }
}

function onTouchEnd() {
    dragging.value = false

    nextTick(() => {
        if (props.magnetic === 'x') {
            state.value.x = closest([boundary.value.left, boundary.value.right], state.value.x)
        }
        if (props.magnetic === 'y') {
            state.value.y = closest([boundary.value.top, boundary.value.bottom], state.value.y)
        }

        if (!touch.isTap.value) {
            const _offset = pick(state.value, ['x', 'y'])
            offset.value = _offset
            updateState()
            if (prevX !== _offset.x || prevY !== _offset.y) {
                emits('offsetChange', _offset)
            }
        }
    })
}

function onClick(e) {
    if (touch.isTap.value) {
        emits('click', e)
    } else {
        e.stopPropagation()
    }
}

function updateState() {
    // onDeactivated with window size change will cause this
    if (!show.value) return

    getRect(instance.proxy, `.${rootSelector}`).then((rect) => {
        const { width, height } = rect
        state.value = {
            x: offset.value.x > -1 ? offset.value.x : windowWidth.value - width - props.gap,
            y: offset.value.y > -1 ? offset.value.y : windowHeight.value - height - props.gap,
            width,
            height,
        }

        nextTick(() => {
            initialized = true
        })
    })
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
