<template>
    <van-placeholder
        :show="placeholder"
        :height="placeholderHeight">
        <view
            class="van-action-bar"
            :class="cpClass">
            <slot></slot>
        </view>
    </van-placeholder>
</template>

<script setup>
import { computed, provide, ref } from 'vue'
import usePlaceholder from '../hooks/usePlaceholder'

const props = defineProps({
    safeAreaInsetBottom: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: false },
    fixed: { type: Boolean, default: true },
})

const { placeholderClassName, placeholderHeight } = usePlaceholder({ show: props.placeholder })

const children = ref([])

const cpClass = computed(() => {
    const { placeholder, safeAreaInsetBottom, fixed } = props
    const classNames = {
        'van-action-bar--fixed': fixed,
        'van-safe-area-bottom': safeAreaInsetBottom,
        [`${placeholderClassName.value}`]: placeholder,
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
