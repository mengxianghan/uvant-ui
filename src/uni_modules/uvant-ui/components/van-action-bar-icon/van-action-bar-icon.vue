<template>
    <view :class="bem()">
        <slot name="icon">
            <view :class="bem('icon')">
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

<script>
export default {
    options: { virtualHost: true },
}
</script>

<script setup>
import { createNamespace, numericProp } from '../utils'

defineProps({
    dot: Boolean,
    text: String,
    icon: String,
    color: String,
    badge: numericProp,
    badgeProps: Object,
    iconPrefix: String,
})

const { bem } = createNamespace('action-bar-icon')
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
