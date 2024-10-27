<template>
    <view
        :class="[
            bem(),
            {
                'van-hairline--top': border && !gutter,
                'van-hairline--left': border && !gutter,
            },
        ]"
        :style="{
            paddingLeft: addUnit(gutter),
        }">
        <slot></slot>
    </view>
</template>

<script setup>
import { useChildren } from '../composables'
import { addUnit, createNamespace, makeNumericProp, truthProp, makeStringProp } from '../utils'

const props = defineProps({
    columnNum: makeNumericProp(4),
    iconSize: makeNumericProp('28px'),
    gutter: makeNumericProp(0),
    border: truthProp,
    center: truthProp,
    square: Boolean,
    clickable: Boolean,
    direction: makeStringProp('vertical'),
    reverse: Boolean,
})

const { linkChildren } = useChildren('van-grid')
const { bem } = createNamespace('grid')

linkChildren({ props })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
