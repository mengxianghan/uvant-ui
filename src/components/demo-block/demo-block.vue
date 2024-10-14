<template>
    <view class="demo-block">
        <view class="demo-block__title pt-8 pb-3 text-sm text-neutral-500 px-4">
            <slot name="title">{{ title }}</slot>
        </view>
        <view
            class="demo-block__body"
            :class="{ 'px-4': card }">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
defineProps({
    title: String,
    card: { type: Boolean, default: true },
})
</script>

<style lang="scss" scoped></style>
