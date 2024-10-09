<template>
    <view class="demo-block">
        <view class="demo-block__title pt-8 pb-3 text-sm text-neutral-500 px-4">
            <slot name="title">{{ title }}</slot>
        </view>
        <view
            class="demo-block__body px-4"
            :style="bodyStyle">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
defineProps({
    title: String,
    bodyStyle: [String, Object],
})
</script>

<style lang="scss" scoped></style>
