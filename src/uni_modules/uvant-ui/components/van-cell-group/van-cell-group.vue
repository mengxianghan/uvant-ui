<template>
    <view
        :class="
            bem({
                'top-bottom': border && !inset,
                inset,
            })
        ">
        <template v-if="!isNullOrEmpty(title)">
            <view :class="bem('title')">
                <slot name="title">{{ title }}</slot>
            </view>
        </template>
        <slot></slot>
    </view>
</template>

<script setup>
import { isNullOrEmpty, createNamespace, truthProp } from '../utils'

defineProps({
    title: String,
    inset: Boolean,
    border: truthProp,
})

const { bem } = createNamespace('cell-group')
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
