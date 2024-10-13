<template>
    <template v-if="position">
        <view
            class="van-sticky"
            :class="{
                'van-sticky--fixed': position,
            }"
            :style="cpStyle">
            <slot></slot>
        </view>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit } from '../utils'

const props = defineProps({
    placeholder: { type: Boolean, default: false },
    position: { type: String, validator: (value) => ['top', 'bottom'].includes(value) },
    offset: { type: [Number, String], default: 0 },
    zIndex: { type: [Number, String], default: 99 },
})

const cpStyle = computed(() => {
    const { position, offset, zIndex } = props
    const style = {
        zIndex,
    }

    if (position) {
        style[`${position}`] = `calc(${addUnit(offset)} + var(--window-${position}))`
    }

    return style
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
