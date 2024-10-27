<template>
    <van-fixed
        :disabled="!fixed"
        :placeholder="placeholder"
        :safe-area="safeAreaInsetBottom"
        position="bottom">
        <view
            :class="[
                bem(),
                {
                    'van-safe-area-bottom': safeAreaInsetBottom,
                },
            ]">
            <slot></slot>
        </view>
    </van-fixed>
</template>

<script setup>
import { useChildren } from '../composables'
import { createNamespace, truthProp } from '../utils'

defineProps({
    placeholder: Boolean,
    safeAreaInsetBottom: truthProp,
    fixed: truthProp,
})

const { linkChildren } = useChildren('van-action-bar')
const { bem } = createNamespace('action-bar')

linkChildren()
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
