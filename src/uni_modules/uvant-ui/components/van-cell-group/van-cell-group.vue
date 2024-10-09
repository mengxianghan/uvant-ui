<template>
    <view
        class="van-cell-group"
        :class="cpClass">
        <template v-if="cpHasTitle">
            <view class="van-cell-group__title">
                <slot name="title">{{ title }}</slot>
            </view>
        </template>
        <slot></slot>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { isDef } from '../utils'

const props = defineProps({
    title: String,
    inset: { type: Boolean, default: false },
    border: { type: Boolean, default: true },
})

const cpClass = computed(() => {
    const { inset, border } = props

    return {
        'van-hairline--top-bottom': border && !inset,
        'van-cell-group--inset': inset,
    }
})
const cpHasTitle = computed(() => isDef(props.title))
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
