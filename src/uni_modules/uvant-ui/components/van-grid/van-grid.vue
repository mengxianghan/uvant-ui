<template>
    <view
        class="van-grid"
        :class="{
            'van-hairline--top': border && !gutter,
            'van-hairline--left': border && !gutter,
        }"
        :style="{
            paddingLeft: addUnit(gutter),
        }">
        <slot></slot>
    </view>
</template>

<script setup>
import { useChildren } from '../composables'
import { addUnit } from '../utils'

const props = defineProps({
    columnNum: { type: [Number, String], default: 4 },
    iconSize: { type: [Number, String], default: '28px' },
    gutter: { type: [Number, String], default: 0 },
    border: { type: Boolean, default: true },
    center: { type: Boolean, default: true },
    square: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    direction: { type: String, default: 'vertical', validator: (value) => ['horizontal', 'vertical'].includes(value) },
    reverse: { type: Boolean, default: false },
})

const { linkChildren } = useChildren('van-grid')

linkChildren({ props })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
