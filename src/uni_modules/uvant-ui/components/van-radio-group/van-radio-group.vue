<template>
    <view
        :class="
            bem({
                [direction]: direction,
            })
        ">
        <slot></slot>
    </view>
</template>

<script setup>
import { watch } from 'vue'
import { useChildren } from '../composables'
import { createNamespace, numericProp } from '../utils'

const props = defineProps({
    disabled: Boolean,
    direction: String,
    iconSize: numericProp,
    checkedColor: String,
    shape: String,
})
const modelValue = defineModel({ type: numericProp })
const emits = defineEmits(['change'])

const { linkChildren } = useChildren('van-radio')
const { bem } = createNamespace('radio-group')

watch(
    () => modelValue.value,
    (value) => emits('change', value)
)

function updateValue(value) {
    modelValue.value = value
}

linkChildren({
    props,
    updateValue,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
