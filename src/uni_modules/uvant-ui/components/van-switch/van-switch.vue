<template>
    <view
        :class="[
            'van-switch',
            {
                'van-switch--on': checked,
                'van-switch--loading': loading,
                'van-switch--disabled': disabled,
            },
        ]"
        :style="{
            fontSize: addUnit(size),
            backgroundColor: checked ? activeColor : inactiveColor,
        }"
        @click="onClick">
        <view class="van-switch__node">
            <template v-if="loading">
                <view class="van-switch__loading">
                    <van-loading :color="checked ? activeColor : inactiveColor"></van-loading>
                </view>
            </template>
            <template v-else-if="slots.node">
                <slot name="node"> </slot>
            </template>
        </view>
        <slot name="background"></slot>
    </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { addUnit } from '../utils'

const props = defineProps({
    loading: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    size: [Number, String],
    activeColor: String,
    inactiveColor: String,
    activeValue: { type: [String, Number, Boolean], default: true },
    inactiveValue: { type: [String, Number, Boolean], default: false },
})
const emits = defineEmits(['change', 'click'])
const modelValue = defineModel({ type: [String, Number, Boolean] })

const slots = useSlots()

const checked = computed(() => isChecked())

function isChecked() {
    return modelValue.value === props.activeValue
}

function onClick() {
    if (!props.disabled && !props.loading) {
        const newValue = isChecked() ? props.inactiveValue : props.activeValue
        modelValue.value = newValue
        emits('change', newValue)
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
