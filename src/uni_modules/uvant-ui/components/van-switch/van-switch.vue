<template>
    <view
        :class="
            bem({
                on: checked,
                loading,
                disabled,
            })
        "
        :style="{
            fontSize: addUnit(size),
            backgroundColor: checked ? activeColor : inactiveColor,
        }"
        @click="onClick">
        <view :class="bem('node')">
            <template v-if="loading">
                <view :class="bem('loading')">
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
import { addUnit, createNamespace, numericProp } from '../utils'

const props = defineProps({
    loading: Boolean,
    disabled: Boolean,
    size: numericProp,
    activeColor: String,
    inactiveColor: String,
    activeValue: { type: [String, Number, Boolean], default: true },
    inactiveValue: { type: [String, Number, Boolean], default: false },
})
const emits = defineEmits(['change', 'click'])
const modelValue = defineModel({ type: [String, Number, Boolean] })

const slots = useSlots()
const { bem } = createNamespace('switch')

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
