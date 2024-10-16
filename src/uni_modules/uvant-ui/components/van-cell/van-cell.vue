<template>
    <view
        class="van-cell"
        :class="{
            'van-cell--center': center,
            'van-cell--clickable': isLink || clickable,
            'van-cell--borderless': !border,
            [`van-cell--${size}`]: size,
        }"
        @click="handleClick">
        <template v-if="hasLeftIcon">
            <view class="van-cell__left-icon">
                <slot name="icon">
                    <van-icon :name="icon"></van-icon>
                </slot>
            </view>
        </template>
        <template v-if="hasTitle">
            <view class="van-cell__title">
                <view>
                    <slot name="title">{{ title }}</slot>
                </view>
                <template v-if="hasLabel">
                    <view class="van-cell__label">
                        <slot name="label">{{ label }}</slot>
                    </view>
                </template>
            </view>
        </template>
        <template v-if="hasValue">
            <view class="van-cell__value">
                <slot name="value">{{ value }}</slot>
            </view>
        </template>
        <template v-if="hasRightIcon">
            <view class="van-cell__right-icon">
                <slot name="rightIcon">
                    <van-icon :name="arrow"></van-icon>
                </slot>
            </view>
        </template>
        <slot name="extra"></slot>
    </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { isDef } from '../utils'

const props = defineProps({
    title: [Number, String],
    value: [Number, String],
    label: [Number, String],
    size: { type: String, validator: (value) => ['large', 'normal'].includes(value) },
    icon: String,
    iconPrefix: String,
    border: { type: Boolean, default: true },
    clickable: { type: Boolean, default: false },
    isLink: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    arrowDirection: {
        type: String,
        default: 'right',
        validator: (value) => ['left', 'right', 'up', 'down'].includes(value),
    },
})
const emits = defineEmits(['click'])
const slots = useSlots()

const hasLeftIcon = computed(() => isDef(props.icon) || slots.icon)
const hasTitle = computed(() => isDef(props.title) || slots.title || hasLabel.value)
const hasValue = computed(() => isDef(props.value) || slots.value)
const hasLabel = computed(() => isDef(props.label) || slots.label)
const hasRightIcon = computed(() => slots['rightIcon'] || props.isLink)
const arrow = computed(() => {
    const { arrowDirection } = props
    let name

    switch (arrowDirection) {
        case 'left':
            name = 'arrow-left'
            break
        case 'right':
            name = 'arrow'
            break
        case 'up':
            name = 'arrow-up'
            break
        case 'down':
            name = 'arrow-down'
            break
        default:
            name = 'arrow'
            break
    }

    return name
})

function handleClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
