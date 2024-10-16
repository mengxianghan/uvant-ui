<template>
    <template v-if="hasDefault">
        <view class="van-badge__wrapper">
            <slot></slot>
            <view
                :class="classNames"
                :style="styles">
                <template v-if="hasContent">
                    <slot name="content">{{ content }}</slot>
                </template>
            </view>
        </view>
    </template>
    <template v-else>
        <view
            :class="classNames"
            :style="styles">
            <template v-if="hasContent">
                <slot name="content">{{ content }}</slot>
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

const hasDefault = computed(() => slots.default)
const hasContent = computed(() => {
    if (slots.content) {
        return true
    }
    return (
        isDef(props.content) &&
        props.content !== '' &&
        (props.showZero || (props.content !== 0 && props.content !== '0'))
    )
})
const classNames = computed(() => {
    const { position, dot } = props
    const classNames = {
        'van-badge': true,
        'van-badge--dot': dot,
    }

    if (hasDefault.value) {
        classNames[`van-badge--${position}`] = true
        classNames['van-badge--fixed'] = true
    }

    return classNames
})
const styles = computed(() => {
    const { color } = props
    const style = {}

    if (color) {
        style.background = color
    }

    return style
})
const content = computed(() => {
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
