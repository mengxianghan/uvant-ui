<template>
    <template v-if="show">
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
defineProps({
    show: { type: Boolean, default: false },
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
})
</script>

<style lang="scss" scoped></style>
