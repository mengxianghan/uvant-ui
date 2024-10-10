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
import { computed, getCurrentInstance, inject } from 'vue'

const props = defineProps({
    text: String,
    type: String,
    color: String,
    icon: String,
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
})

const instance = getCurrentInstance()
const { setChildren, children } = inject('van-action-bar')

setChildren(instance)

const cpClass = computed(() => {
    const { type } = props
    let firstInstance
    let lastInstance
    let isFirst
    let isLast
    const len = children.value.length

    if (len > 1) {
        firstInstance = children.value[0]
        lastInstance = children.value[children.value.length - 1]
        isFirst = firstInstance.uid === instance.uid
        isLast = lastInstance.uid === instance.uid
    }

    const className = {
        'van-action-bar-button--first': isFirst,
        'van-action-bar-button--last': isLast,
        'van-action-bar-button--only-one': !isFirst && !isLast,
        [`van-action-bar-button--${type}`]: true,
    }

    return className
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
