<template>
    <view
        class="van-loading"
        :class="cpClass">
        <view
            class="van-loading__spinner"
            :class="cpSpinnerClass"
            :style="cpSpinnerStyle">
            <slot name="icon">
                <template v-if="'spinner' === type">
                    <view
                        v-for="item in 12"
                        :key="item"
                        class="van-loading__dot"></view>
                </template>
            </slot>
        </view>
        <view
            class="van-loading__text"
            :style="cpTextStyle">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { addUnit, isDef } from '../utils'

const props = defineProps({
    color: String,
    type: { type: String, default: 'circular', validator: (value) => ['circular', 'spinner'].includes(value) },
    size: [Number, String],
    textSize: [Number, String],
    textColor: String,
    vertical: { type: Boolean, default: false },
})
const slots = useSlots()

const cpHasIcon = computed(() => {
    return slots.icon
})
const cpClass = computed(() => {
    const { vertical } = props
    return {
        [`van-loading--vertical`]: vertical,
    }
})
const cpSpinnerClass = computed(() => {
    const { type } = props
    const classNames = {}

    if (!cpHasIcon.value) {
        classNames[`van-loading__spinner--${type}`] = true
    }

    return classNames
})
const cpSpinnerStyle = computed(() => {
    const { color, size } = props
    const style = {
        color,
    }

    if (isDef(size)) {
        style.width = addUnit(size)
        style.height = addUnit(size)
    }

    return style
})
const cpTextStyle = computed(() => {
    const { textSize, textColor, color } = props
    const style = {}

    if (isDef(textSize)) {
        style.fontSize = addUnit(textSize)
    }

    if (textColor || color) {
        style.color = textColor || color
    }

    return style
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
