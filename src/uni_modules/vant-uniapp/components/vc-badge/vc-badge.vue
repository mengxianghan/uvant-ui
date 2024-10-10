<template>
    <template v-if="cpShow">
        <van-badge
            v-bind="badgeProps"
            :dot="dot"
            :content="badge">
            <slot></slot>
        </van-badge>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>

<script setup>
import { computed } from 'vue'
import { isDef, isObject } from '../utils'

const props = defineProps({
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
})

const cpShow = computed(() => {
    const { dot, badge, badgeProps } = props
    return dot || isDef(badge) || isObject(badgeProps)
})
</script>

<style lang="scss" scoped></style>
