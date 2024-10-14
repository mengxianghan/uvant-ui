<template>
    <van-fixed
        :placeholder="placeholder"
        :position="fixed && 'bottom'"
        :safe-area="safeAreaInsetBottom">
        <view
            class="van-action-bar"
            :class="cpClass">
            <slot></slot>
        </view>
    </van-fixed>
</template>

<script setup>
import { computed } from 'vue'
import { useChildren } from '../composables'

const props = defineProps({
    safeAreaInsetBottom: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: false },
    fixed: { type: Boolean, default: true },
})

const { linkChildren } = useChildren('van-action-bar')

const cpClass = computed(() => {
    const { safeAreaInsetBottom } = props
    const classNames = {
        'van-safe-area-bottom': safeAreaInsetBottom,
    }

    return classNames
})

linkChildren()
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
