<template>
    <view
        class="van-cell"
        :class="cpClass"
        @click="handleClick">
        <template v-if="cpHasLeftIcon">
            <view class="van-cell__left-icon">
                <slot name="icon">
                    <van-icon :name="icon"></van-icon>
                </slot>
            </view>
        </template>
        <template v-if="cpHasTitle">
            <view class="van-cell__title">
                <view>
                    <slot name="title">{{ title }}</slot>
                </view>
                <template v-if="cpHasLabel">
                    <view class="van-cell__label">
                        <slot name="label">{{ label }}</slot>
                    </view>
                </template>
            </view>
        </template>
        <template v-if="cpHasValue">
            <view class="van-cell__value">
                <slot name="value">{{ value }}</slot>
            </view>
        </template>
        <template v-if="cpHasRightIcon">
            <view class="van-cell__right-icon">
                <slot name="rightIcon">
                    <van-icon :name="cpArrow"></van-icon>
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

const cpHasLeftIcon = computed(() => {
    return isDef(props.icon) || slots.icon
})
const cpHasTitle = computed(() => isDef(props.title) || slots.title || cpHasLabel.value)
const cpHasValue = computed(() => isDef(props.value) || slots.value)
const cpHasLabel = computed(() => isDef(props.label) || slots.label)
const cpHasRightIcon = computed(() => slots['rightIcon'] || props.isLink)
const cpClass = computed(() => {
    const { center, clickable, size, isLink, border } = props

    const classNames = {
        'van-cell--center': center,
        'van-cell--clickable': isLink || clickable,
        'van-cell--borderless': !border,
    }

    if (size) {
        classNames[`van-cell--${size}`] = true
    }

    return classNames
})
const cpArrow = computed(() => {
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
