<template>
    <view class="van-sidebar">
        <slot></slot>
    </view>
</template>

<script setup>
import { useChildren } from '../composables'

const emits = defineEmits(['change'])
const modelValue = defineModel({ type: [Number, String] })

const { linkChildren } = useChildren('sidebar')

function getActive() {
    return +modelValue.value
}

function setActive(value) {
    if (value !== getActive()) {
        modelValue.value = value
        emits('change', value)
    }
}

linkChildren({
    getActive,
    setActive,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
