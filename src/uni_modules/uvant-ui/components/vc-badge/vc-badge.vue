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
import { isDef, numericProp } from '../utils'
import { isObject } from 'lodash-es'

const props = defineProps({
    dot: Boolean,
    badge: numericProp,
    badgeProps: Object,
})

const disabled = computed(() => !(props.dot || isDef(props.badge) || isObject(props.badgeProps)))
</script>

<style lang="scss" scoped></style>
