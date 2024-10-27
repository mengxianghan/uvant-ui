<template>
    <view
        :class="
            bem({
                center,
                clickable: isLink || clickable,
                borderless: !border,
                [size]: size,
            })
        "
        @click="onClick">
        <template v-if="hasLeftIcon">
            <view :class="bem('left-icon')">
                <slot name="icon">
                    <van-icon :name="icon"></van-icon>
                </slot>
            </view>
        </template>
        <template v-if="hasTitle">
            <view :class="bem('title')">
                <view>
                    <slot name="title">{{ title }}</slot>
                </view>
                <template v-if="hasLabel">
                    <view :class="bem('label')">
                        <slot name="label">{{ label }}</slot>
                    </view>
                </template>
            </view>
        </template>
        <template v-if="hasValue">
            <view :class="bem('value')">
                <slot name="value">{{ value }}</slot>
            </view>
        </template>
        <template v-if="hasRightIcon">
            <view :class="bem('right-icon')">
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
import { isDef, createNamespace, numericProp, truthProp } from '../utils'

const props = defineProps({
    icon: String,
    size: String,
    title: numericProp,
    value: numericProp,
    label: numericProp,
    center: Boolean,
    isLink: Boolean,
    border: truthProp,
    iconPrefix: String,
    arrowDirection: String,
    required: {
        type: [Boolean, String],
        default: null,
    },
    clickable: {
        type: Boolean,
        default: null,
    },
})
const emits = defineEmits(['click'])
const slots = useSlots()

const { bem } = createNamespace('cell')

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

function onClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
