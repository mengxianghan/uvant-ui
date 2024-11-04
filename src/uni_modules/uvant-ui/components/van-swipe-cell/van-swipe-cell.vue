<template>
    <view :class="bem()">
        <view
            :class="bem('wrapper')"
            :style="{
                transform: `translate3d(${state.offset}px, 0, 0)`,
                transitionDuration: state.dragging ? '0s' : '.6s',
            }"
            @click="(e) => getClickHandler(e, 'cell', lockClick)"
            @touchstart.passive="onTouchStart"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
            @touchmove.stop="onTouchMove">
            <template v-if="slots.left">
                <view
                    :class="[bem('left'), leftSelector]"
                    @click="(e) => getClickHandler(e, 'left', true)">
                    <slot name="left"></slot>
                </view>
            </template>
            <slot></slot>
            <template v-if="slots.right">
                <view
                    :class="[bem('right'), rightSelector]"
                    @click="(e) => getClickHandler(e, 'right', true)">
                    <slot name="right"></slot>
                </view>
            </template>
        </view>
    </view>
</template>

<script setup>
import {
    createNamespace,
    makeNumericProp,
    numericProp,
    callInterceptor,
    isDef,
    createUniqueSelector,
    getRect,
    preventDefault,
    clamp,
} from '../utils'
import { reactive, useSlots, getCurrentInstance, onMounted, nextTick } from 'vue'
import { useTouch } from '../composables'

const props = defineProps({
    name: makeNumericProp(''),
    disabled: Boolean,
    leftWidth: numericProp,
    rightWidth: numericProp,
    beforeClose: Function,
    stopPropagation: Boolean,
})
const emits = defineEmits(['open', 'close', 'click'])
const slots = useSlots()
const touch = useTouch()

const instance = getCurrentInstance()
const { name: swipeCellName, bem } = createNamespace('swipe-cell')
const [leftSelector, rightSelector] = createUniqueSelector(swipeCellName, 2)

let opened
let lockClick
let startOffset
let isInBeforeClosing

const state = reactive({
    offset: 0,
    dragging: false,
    leftWidth: 0,
    rightWidth: 0,
})

onMounted(() => {
    nextTick(() => {
        getLeftWidth()
        getRightWidth()
    })
})

function getClickHandler(event, position, stop) {
    if (stop) {
        event.stopPropagation()
    }

    if (lockClick) {
        return
    }

    onClick(position, event)
}

function onClick(position, event) {
    if (isInBeforeClosing) return

    emits('click', position)

    if (opened && !lockClick) {
        isInBeforeClosing = true
        callInterceptor(props.beforeClose, {
            args: [
                {
                    event,
                    name: props.name,
                    position,
                },
            ],
            done: () => {
                isInBeforeClosing = false
                close(position)
            },
            canceled: () => (isInBeforeClosing = false),
            error: () => (isInBeforeClosing = false),
        })
    }
}

function onTouchStart(event) {
    if (!props.disabled) {
        startOffset = state.offset
        touch.start(event)
    }
}

function onTouchMove(event) {
    if (props.disabled) {
        return
    }

    const { deltaX } = touch
    touch.move(event)

    if (touch.isHorizontal()) {
        lockClick = true
        state.dragging = true

        const isEdge = !opened || deltaX.value * startOffset < 0
        if (isEdge) {
            preventDefault(event, props.stopPropagation)
        }

        state.offset = clamp(deltaX.value + startOffset, -state.rightWidth, state.leftWidth)
    }
}

function onTouchEnd() {
    if (state.dragging) {
        state.dragging = false
        toggle(state.offset > 0 ? 'left' : 'right')

        // compatible with desktop scenario
        setTimeout(() => {
            lockClick = false
        }, 0)
    }
}

function open(side) {
    state.offset = side === 'left' ? state.leftWidth : -state.rightWidth

    if (!opened) {
        opened = true
        emits('open', {
            name: props.name,
            position: side,
        })
    }
}

function close(position) {
    state.offset = 0

    if (opened) {
        opened = false
        emits('close', {
            name: props.name,
            position,
        })
    }
}

function getLeftWidth() {
    getRect(instance.proxy, `.${leftSelector}`).then((rect) => {
        const width = rect ? rect.width : 0
        state.leftWidth = isDef(props.leftWidth) ? +props.leftWidth : width
    })
}

function getRightWidth() {
    getRect(instance.proxy, `.${rightSelector}`).then((rect) => {
        const width = rect ? rect.width : 0
        state.rightWidth = isDef(props.rightWidth) ? +props.rightWidth : width
    })
}

function toggle(side) {
    const offset = Math.abs(state.offset)
    const THRESHOLD = 0.15
    const threshold = opened ? 1 - THRESHOLD : THRESHOLD
    const width = side === 'left' ? state.leftWidth : state.rightWidth

    if (width && offset > width * threshold) {
        open(side)
    } else {
        close(side)
    }
}
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared',
    },
})
</script>

<style lang="scss">
@import './style.scss';
</style>
