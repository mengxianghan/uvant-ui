<template>
    <view
        :class="bem()"
        :style="getSizeStyle(size)">
        <canvas
            :class="bem('canvas')"
            :id="canvasSelector"
            :canvas-id="canvasSelector"
            :type="type"
            :style="getSizeStyle(size)"></canvas>
        <template v-if="hasText">
            <view :class="bem('text')">
                <slot>{{ text }}</slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onBeforeUnmount, onMounted, watch, useSlots } from 'vue'
import {
    canIUseCanvas2d,
    createUniqueSelector,
    getSizeStyle,
    createNamespace,
    makeStringProp,
    makeNumberProp,
    truthProp,
} from '../utils'
import { adaptor } from './canvas'
import { isObject } from 'lodash-es'

const props = defineProps({
    currentRate: makeNumberProp(0),
    type: makeStringProp('2d'),
    size: makeNumberProp(100),
    color: { type: [String, Object], default: '#1989fa' },
    layerColor: makeStringProp('#fff'),
    fill: String,
    speed: makeNumberProp(50),
    text: String,
    strokeWidth: makeNumberProp(4),
    strokeLinecap: makeStringProp('round'),
    clockwise: truthProp,
    startPosition: makeStringProp('top'),
})
const emits = defineEmits(['update:currentRate'])

const PERIMETER = 2 * Math.PI
const STEP = 1
const ROTATE_ANGLE_MAP = {
    top: -Math.PI / 2,
    right: 0,
    bottom: Math.PI / 2,
    left: Math.PI,
}

const instance = getCurrentInstance()
const slots = useSlots()
const { bem, name } = createNamespace('circle')
const [canvasSelector] = createUniqueSelector(name)

const hoverColor = ref('#1989fa')
const initialized = ref(false)
const currentValue = ref(props.currentRate)
const interval = ref()

const hasText = computed(() => {
    return props.text || slots.default
})

watch(
    () => props.currentRate,
    (val) => {
        if (val === currentValue.value) return
        reRender()
    }
)

onMounted(() => {
    setHoverColor().then(() => {
        drawCircle(currentValue.value)
    })
})

onBeforeUnmount(() => {
    clearMockInterval()
})

function format(rate) {
    return Math.min(Math.max(rate, 0), 100)
}

function getContext() {
    const { type, size } = props

    if (type === '' || !canIUseCanvas2d()) {
        const ctx = uni.createCanvasContext(canvasSelector, instance.proxy)
        return Promise.resolve(ctx)
    }

    const dpr = uni.getSystemInfoSync().pixelRatio

    return new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(instance.proxy)
            .select(`#${canvasSelector}`)
            .fields({ node: true, size: true })
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext(type)

                if (!initialized.value) {
                    initialized.value = true
                    canvas.width = size * dpr
                    canvas.height = size * dpr
                    ctx.scale(dpr, dpr)
                }

                resolve(adaptor(ctx))
            })
    })
}

function setHoverColor() {
    const { color, size } = props

    if (isObject(color)) {
        return getContext().then((context) => {
            if (!context) return

            const LinearColor = context.createLinearGradient(size, 0, 0, 0)
            Object.keys(color)
                .sort((a, b) => parseFloat(a) - parseFloat(b))
                .map((key) => LinearColor.addColorStop(parseFloat(key) / 100, color[key]))
            hoverColor.value = LinearColor
        })
    }

    hoverColor.value = color
    return Promise.resolve()
}

function presetCanvas(context, strokeStyle, beginAngle, endAngle, fill) {
    const { strokeWidth, strokeLinecap, clockwise, size } = props
    const position = size / 2
    const radius = position - strokeWidth / 2

    context.setStrokeStyle(strokeStyle)
    context.setLineWidth(strokeWidth)
    context.setLineCap(strokeLinecap)

    context.beginPath()
    context.arc(position, position, radius, beginAngle, endAngle, !clockwise)
    context.stroke()

    if (fill) {
        context.setFillStyle(fill)
        context.fill()
    }
}

function renderLayerCircle(context) {
    const { layerColor, fill } = props
    presetCanvas(context, layerColor, 0, PERIMETER, fill)
}

function renderHoverCircle(context, formatValue) {
    const { clockwise, startPosition } = props
    const beginAngle = ROTATE_ANGLE_MAP[startPosition]
    // 结束角度
    const progress = PERIMETER * (formatValue / 100)
    const endAngle = clockwise ? beginAngle + progress : 3 * Math.PI - (beginAngle + progress)

    presetCanvas(context, hoverColor.value, beginAngle, endAngle)
}

function drawCircle(currentValue) {
    const { size } = props

    getContext().then((context) => {
        if (!context) return

        context.clearRect(0, 0, size, size)
        renderLayerCircle(context)

        const formatValue = format(currentValue)
        if (formatValue !== 0) {
            renderHoverCircle(context, formatValue)
        }

        context.draw()
    })
}

function reRender() {
    // tofector 动画暂时没有想到好的解决方案
    const { currentRate, speed } = props

    if (speed <= 0 || speed > 1000) {
        drawCircle(currentRate)
        return
    }

    clearMockInterval()
    currentValue.value = currentValue.value || 0
    const run = () => {
        interval.value = setTimeout(() => {
            if (currentValue.value !== currentRate) {
                if (Math.abs(currentValue.value - currentRate) < STEP) {
                    currentValue.value = currentRate
                } else if (currentValue.value < currentRate) {
                    currentValue.value += STEP
                } else {
                    currentValue.value -= STEP
                }
                drawCircle(currentValue.value)
                run()
            } else {
                trigger()
                clearMockInterval()
            }
        }, 1000 / speed)
    }
    run()
}

function clearMockInterval() {
    if (interval.value) {
        clearTimeout(interval.value)
        interval.value = null
    }
}

function trigger() {
    emits('update:currentRate', currentValue.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
