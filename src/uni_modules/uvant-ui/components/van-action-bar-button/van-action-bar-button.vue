<template>
    <view
        class="van-action-bar-button"
        :class="cpClass">
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

const props = defineProps({
    text: String,
    type: String,
    color: String,
    icon: String,
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
})

const { parent, index } = useParent('van-action-bar')
useExpose({ isButton: true })

const cpIsFirst = computed(() => {
    if (!parent) {
        return false
    }
    const prev = parent.children[index.value - 1]
    return !(prev && 'isButton' in prev)
})

const cpIsLast = computed(() => {
    if (!parent) {
        return false
    }
    const next = parent.children[index.value + 1]
    return !(next && 'isButton' in next)
})

const cpIsOnlyOne = computed(() => {
    if (!parent) {
        return false
    }
    return parent.children.filter((item) => item.isButton).length === 1
})

const cpClass = computed(() => {
    const { type } = props

    const className = {
        'van-action-bar-button--first': cpIsFirst.value && !cpIsOnlyOne.value,
        'van-action-bar-button--last': cpIsLast.value && !cpIsOnlyOne.value,
        'van-action-bar-button--only-one': cpIsOnlyOne.value,
        [`van-action-bar-button--${type}`]: true,
    }

    return className
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
