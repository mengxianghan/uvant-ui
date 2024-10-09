<template>
    <view
        class="van-circle"
        :style="cpStyle">
        <canvas
            class="van-circle__canvas"
            :id="canvasId"
            :canvas-id="canvasId"
            :type="type"
            :style="cpCanvasStyle"></canvas>
        <template v-if="cpHasText">
            <view class="van-circle__text">
                <slot>{{ text }}</slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { ref, computed, getCurrentInstance, onBeforeUnmount, onMounted, watch, useSlots } from 'vue'
import { addUnit, isObject, canIUseCanvas2d, uuid } from '../utils'
import { adaptor } from './canvas'

const props = defineProps({
    modelValue: { type: Number, default: 0 },
    type: { type: String, default: '2d' },
    size: { type: Number, default: 100 },
    color: { type: [String, Object], default: '#1989fa' },
    layerColor: { type: String, default: '#fff' },
    fill: String,
    speed: { type: Number, default: 50 },
    text: String,
    strokeWidth: { type: Number, default: 4 },
    stroleLinecap: {
        type: String,
        default: 'round',
        validator: (value) => ['square', 'butt', 'round'].includes(value),
    },
    clockwise: { type: Boolean, default: true },
    startPosition: {
        type: String,
        default: 'top',
        validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value),
    },
})
const emits = defineEmits(['update:modelValue'])

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

const hoverColor = ref('#1989fa')
const inited = ref(false)
const currentValue = ref(props.modelValue)
const interval = ref()
const canvasId = ref(`van-circle--${uuid()}`)

const cpStyle = computed(() => {
    const { size } = props
    const style = {
        width: addUnit(size),
        height: addUnit(size),
    }

    return style
})
const cpCanvasStyle = computed(() => {
    const { size } = props
    const style = {
        width: addUnit(size),
        height: addUnit(size),
    }

    return style
})
const cpHasText = computed(() => {
    return props.text || slots.default
})

watch(
    () => props.modelValue,
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
        const ctx = uni.createCanvasContext(canvasId.value, instance.proxy)
        return Promise.resolve(ctx)
    }

    const dpr = uni.getSystemInfoSync().pixelRatio

    return new Promise((resolve) => {
        uni.createSelectorQuery()
            .in(instance.proxy)
            .select(`#${canvasId.value}`)
            .fields({ node: true, size: true })
            // .node()
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext(type)

                if (!inited.value) {
                    inited.value = true
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
    const { strokeWidth, stroleLinecap, clockwise, size } = props
    const position = size / 2
    const radius = position - strokeWidth / 2

    context.setStrokeStyle(strokeStyle)
    context.setLineWidth(strokeWidth)
    context.setLineCap(stroleLinecap)

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
    const { modelValue, speed } = props

    if (speed <= 0 || speed > 1000) {
        drawCircle(modelValue)
        return
    }

    clearMockInterval()
    currentValue.value = currentValue.value || 0
    const run = () => {
        interval.value = setTimeout(() => {
            if (currentValue.value !== modelValue) {
                if (Math.abs(currentValue.value - modelValue) < STEP) {
                    currentValue.value = modelValue
                } else if (currentValue.value < modelValue) {
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
    emits('update:modelValue', currentValue.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
