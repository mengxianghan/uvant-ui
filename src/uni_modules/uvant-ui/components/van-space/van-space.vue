<template>
    <view
        class="van-space"
        :class="{
            [`van-space--${direction}`]: direction,
            [`van-space--align-${align}`]: align,
            'van-space--wrap': wrap,
            'van-space--fill': fill,
        }"
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

const cpStyle = computed(() => {
    const style = {}

    if (isEmpty(props.size)) return

    if (isArray(props.size)) {
        const [x = 0, y = 0] = props.size
        style.gap = `${addUnit(x)} ${addUnit(y)}`
    } else {
        style.gap = addUnit(props.size)
    }

    return style
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
