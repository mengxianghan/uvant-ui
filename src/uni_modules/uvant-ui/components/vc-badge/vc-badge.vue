<template>
    <template v-if="!disabled">
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

const disabled = computed(() => !(props.dot || isDef(props.badge) || isObject(props.badgeProps)))
</script>

<style lang="scss" scoped></style>
