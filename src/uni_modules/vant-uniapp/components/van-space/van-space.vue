<template>
    <view
        class="van-space"
        :class="cpClass"
        :style="cpStyle">
        <slot></slot>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { isArray, isEmpty, addUnit } from '../utils'

const props = defineProps({
    direction: {
        type: String,
        default: 'horizontal',
        validator: (value) => ['vertical', 'horizontal'].includes(value),
    },
    size: { type: [Number, String, Array] },
    align: { type: String, validator: (value) => ['start', 'end', 'center', 'baseline'].includes(value) },
    wrap: { type: Boolean, default: false },
    fill: { type: Boolean, default: false },
})

const cpClass = computed(() => {
    const { direction, align, wrap, fill } = props
    const classNames = {
        [`van-space--${direction}`]: true,
        'van-space--wrap': wrap,
        'van-space--fill': fill,
    }

    if (align) {
        classNames[`van-space--align-${align}`] = true
    }

    return classNames
})
const cpStyle = computed(() => {
    const { size } = props
    const style = {}

    if (isEmpty(size)) return style

    if (isArray(size)) {
        const [x = 0, y = 0] = size
        style.gap = `${addUnit(x)} ${addUnit(y)}`
    } else {
        style.gap = addUnit(size)
    }

    return style
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
