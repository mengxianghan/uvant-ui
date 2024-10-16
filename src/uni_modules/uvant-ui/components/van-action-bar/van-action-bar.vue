<template>
    <van-fixed
        :placeholder="placeholder"
        :position="fixed && 'bottom'"
        :safe-area="safeAreaInsetBottom">
        <view
            class="van-action-bar"
            :class="{
                'van-safe-area-bottom': safeAreaInsetBottom,
            }">
            <slot></slot>
        </view>
    </van-fixed>
</template>

<script setup>
import { useChildren } from '../composables'

defineProps({
    safeAreaInsetBottom: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: false },
    fixed: { type: Boolean, default: true },
})

const { linkChildren } = useChildren('van-action-bar')

linkChildren()
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
