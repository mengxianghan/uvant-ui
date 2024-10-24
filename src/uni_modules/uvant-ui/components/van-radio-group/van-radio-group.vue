<template>
    <view
        :class="[
            'van-radio-group',
            {
                [`van-radio-group--${direction}`]: direction,
            },
        ]">
        <slot></slot>
    </view>
</template>

<script setup>
import { watch } from 'vue'
import { useChildren } from '../composables'

const props = defineProps({
    disabled: { type: Boolean, default: false },
    direction: { type: String, validator: (value) => ['vertical', 'horizontal'].includes(value) },
    iconSize: [String, Number],
    checkedColor: String,
    shape: { type: String, validator: (value) => ['round', 'square', 'dot'].includes(value) },
})
const modelValue = defineModel({ type: [String, Number] })
const emits = defineEmits(['change'])

const { linkChildren } = useChildren('van-radio')

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
