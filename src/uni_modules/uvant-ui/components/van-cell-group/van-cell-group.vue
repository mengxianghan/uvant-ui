<template>
    <view
        class="van-cell-group"
        :class="{
            'van-hairline--top-bottom': border && !inset,
            'van-cell-group--inset': inset,
        }">
        <template v-if="!isEmpty(title)">
            <view class="van-cell-group__title">
                <slot name="title">{{ title }}</slot>
            </view>
        </template>
        <slot></slot>
    </view>
</template>

<script setup>
import { isEmpty } from '../utils'

defineProps({
    title: String,
    inset: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
