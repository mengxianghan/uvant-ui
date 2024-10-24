<template>
    <view
        class="van-loading"
        :class="{
            'van-loading--vertical': vertical,
        }">
        <view
            class="van-loading__spinner"
            :class="{
                [`van-loading__spinner--${type}`]: !hasIcon,
            }"
            :style="{
                color: color,
                ...getSizeStyle(size),
            }">
            <slot name="icon">
                <template v-if="'spinner' === type">
                    <view
                        v-for="item in 12"
                        :key="item"
                        class="van-loading__dot"></view>
                </template>
            </slot>
        </view>
        <template v-if="slots.default">
            <view
                class="van-loading__text"
                :style="{
                    fontSize: isDef(textSize) ? addUnit(textSize) : '',
                    color: textColor || color,
                }">
                <slot></slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { addUnit, getSizeStyle, isDef } from '../utils'

defineProps({
    color: String,
    type: { type: String, default: 'circular', validator: (value) => ['circular', 'spinner'].includes(value) },
    size: [Number, String],
    textSize: [Number, String],
    textColor: String,
    vertical: { type: Boolean, default: false },
})
const slots = useSlots()

const hasIcon = computed(() => slots.icon)
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
