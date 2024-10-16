<template>
    <view
        class="van-action-bar-button"
        :class="{
            'van-action-bar-button--first': isFirst && !isOnly,
            'van-action-bar-button--last': isLast && !isOnly,
            'van-action-bar-button--only-one': isOnly,
            [`van-action-bar-button--${type}`]: true,
        }">
        <van-button
            :type="type"
            :color="color"
            :icon="icon"
            :disabled="disabled"
            :loading="loading">
            <slot>{{ text }}</slot>
        </van-button>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useParent, useExpose } from '../composables'

defineProps({
    text: String,
    type: String,
    color: String,
    icon: String,
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
})

const { parent, index } = useParent('van-action-bar')
useExpose({ isButton: true })

const isFirst = computed(() => {
    if (!parent) {
        return false
    }
    const prev = parent.children[index.value - 1]
    return !(prev && 'isButton' in prev)
})

const isLast = computed(() => {
    if (!parent) {
        return false
    }
    const next = parent.children[index.value + 1]
    return !(next && 'isButton' in next)
})

const isOnly = computed(() => parent && parent.children.filter((item) => item.isButton).length === 1)
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
