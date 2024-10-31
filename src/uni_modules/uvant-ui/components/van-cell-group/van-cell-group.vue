<template>
    <view
        :class="
            bem({
                'top-bottom': border && !inset,
                inset,
            })
        ">
        <template v-if="isDef(title)">
            <view :class="bem('title')">
                <slot name="title">{{ title }}</slot>
            </view>
        </template>
        <slot></slot>
    </view>
</template>

<script setup>
import { createNamespace, truthProp, isDef } from '../utils'

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
