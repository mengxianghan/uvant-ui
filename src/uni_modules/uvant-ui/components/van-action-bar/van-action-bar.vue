<template>
    <van-placeholder
        :placeholder="placeholder"
        :position="fixed && 'bottom'">
        <view
            class="van-action-bar"
            :class="cpClass">
            <slot></slot>
        </view>
    </van-placeholder>
</template>

<script setup>
import { computed, provide, ref } from 'vue'

const props = defineProps({
    safeAreaInsetBottom: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: false },
    fixed: { type: Boolean, default: true },
})

const children = ref([])

const cpClass = computed(() => {
    const { safeAreaInsetBottom } = props
    const classNames = {
        'van-safe-area-bottom': safeAreaInsetBottom,
    }

    return classNames
})

function setChildren(child) {
    children.value.push(child)
}

provide('van-action-bar', {
    setChildren,
    children: computed(() => children.value),
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
