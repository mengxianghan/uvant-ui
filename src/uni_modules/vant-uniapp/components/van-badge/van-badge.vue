<template>
    <template v-if="cpHasDefault">
        <view class="van-badge__wrapper">
            <slot></slot>
            <view
                :class="cpClass"
                :style="cpStyle">
                <template v-if="cpHasContent">
                    <slot name="content">{{ cpContent }}</slot>
                </template>
            </view>
        </view>
    </template>
    <template v-else>
        <view
            :class="cpClass"
            :style="cpStyle">
            <template v-if="cpHasContent">
                <slot name="content">{{ cpContent }}</slot>
            </template>
        </view>
    </template>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { isDef, isNumber } from '../utils'

const props = defineProps({
    content: [Number, String],
    color: String,
    dot: { type: Boolean, default: false },
    max: [Number, String],
    offset: { type: Array, default: () => [0, 0] },
    showZero: { type: Boolean, default: true },
    position: {
        type: String,
        default: 'top-right',
        validator: (value) => ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value),
    },
})
const slots = useSlots()

const cpHasDefault = computed(() => slots.default)
const cpHasContent = computed(() => {
    if (slots.content) {
        return true
    }
    const { content, showZero } = props
    return isDef(content) && content !== '' && (showZero || (content !== 0 && content !== '0'))
})
const cpClass = computed(() => {
    const { position, dot } = props
    const classNames = {
        'van-badge': true,
        'van-badge--dot': dot,
    }

    if (cpHasDefault.value) {
        classNames[`van-badge--${position}`] = true
        classNames['van-badge--fixed'] = true
    }

    return classNames
})
const cpStyle = computed(() => {
    const { color } = props
    const style = {}

    if (color) {
        style.background = color
    }

    return style
})
const cpContent = computed(() => {
    const { max, content } = props
    if (isDef(max) && isNumber(content) && +content > +max) {
        return `${max}+`
    }
    return content
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
