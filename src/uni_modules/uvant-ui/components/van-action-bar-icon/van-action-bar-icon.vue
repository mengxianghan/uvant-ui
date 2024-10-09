<template>
    <view class="van-action-bar-icon">
        <slot name="icon">
            <view class="van-action-bar-icon__icon">
                <van-icon
                    :name="icon"
                    :color="color"
                    :class-prefix="iconPrefix"
                    :dot="dot"
                    :badge="badge"
                    :badge-props="badgeProps"></van-icon>
            </view>
        </slot>
        <slot>{{ text }}</slot>
    </view>
</template>

<script setup>
defineProps({
    text: String,
    icon: String,
    color: { type: String, default: '#323233' },
    iconPrefix: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
