<template>
    <view
        class="van-stepper"
        :class="{
            [`van-stepper--${theme}`]: theme,
        }">
        <view
            class="van-stepper__minus"
            :class="{
                'van-stepper__minus--disabled': cpMinusDisabled,
            }"
            :style="cpButtonStyle"
            @click="handleClick('minus')">
            <slot name="minusIcon">
                <van-icon name="minus" />
            </slot>
        </view>
        <input
            v-model="modelValue"
            :name="name"
            :inputmode="integer ? 'numeric' : 'decimal'"
            :type="integer ? 'number' : 'digit'"
            :disabled="disabled || disableInput"
            :class="{
                'van-stepper__input--disabled': disabled || disableInput,
            }"
            :style="cpInputStyle"
            class="van-stepper__input"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur" />
        <view
            class="van-stepper__plus"
            :class="{
                'van-stepper__plus--disabled': cpPlusDisabled,
            }"
            :style="cpButtonStyle"
            @click="handleClick('plus')">
            <slot name="plusIcon">
                <van-icon name="plus" />
            </slot>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { isDef, formatNumber, addNumber, callInterceptor, addUnit, getSizeStyle } from '../utils'
import { defaultTo } from 'lodash-es'

const props = defineProps({
    min: { type: [Number, String], default: 1 },
    max: [Number, String],
    autoFixed: { type: Boolean, default: true },
    defaultValue: { type: [Number, String], default: 1 },
    step: { type: [Number, String], default: 1 },
    name: [Number, String],
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    decimalLength: [Number, String],
    theme: String,
    placeholder: String,
    integer: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    disablePlus: { type: Boolean, default: false },
    disableMinus: { type: Boolean, default: false },
    disableInput: { type: Boolean, default: false },
    beforeChange: { type: Function, default: () => true },
    showPlus: { type: Boolean, default: true },
    showMinus: { type: Boolean, default: true },
    showInput: { type: Boolean, default: true },
    longPress: { type: Boolean, default: true },
    allowEmpty: { type: Boolean, default: false },
})

const modelValue = defineModel({ type: [Number, String] })
const emits = defineEmits(['plus', 'blur', 'minus', 'focus', 'change', 'overlimit'])
const actionType = ref()

const cpMinusDisabled = computed(() => props.disabled || props.disableMinus || +modelValue.value <= +props.min)
const cpPlusDisabled = computed(() => props.disabled || props.disablePlus || +modelValue.value >= +props.max)
const cpInputStyle = computed(() => ({
    width: addUnit(props.inputWidth),
    height: addUnit(props.buttonSize),
}))
const cpButtonStyle = computed(() => getSizeStyle(props.buttonSize))

watch(() => [props.max, props.min, props.integer, props.decimalLength], check)
watch(
    () => modelValue.value,
    (value) => emits('change', value, { name: props.name })
)

getInitialValue()

function handleClick(_actionType) {
    actionType.value = _actionType
    onChange()
}

function getInitialValue() {
    const defaultValue = defaultTo(props.modelValue, props.defaultValue)
    const value = format(defaultValue)

    if (!isEqual(value, props.modelValue)) {
        modelValue.value = value
    }

    return value
}

function setValue(value) {
    if (props.beforeChange) {
        callInterceptor(props.beforeChange, {
            args: [value],
            done() {
                modelValue.value = value
            },
        })
    } else {
        modelValue.value = value
    }
}

function onInput(event) {
    const input = event.detail
    const { value } = input
    const { decimalLength } = props

    let formatted = formatNumber(String(value), !props.integer)

    // limit max decimal length
    if (isDef(decimalLength) && formatted.includes('.')) {
        const pair = formatted.split('.')
        formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`
    }

    if (props.beforeChange) {
        input.value = String(modelValue.value)
    } else if (!isEqual(value, formatted)) {
        input.value = formatted
    }

    // prefer number type
    const isNumeric = formatted === String(+formatted)
    setValue(isNumeric ? +formatted : formatted)
}

function onFocus(event) {
    emits('focus', event)
}

function onBlur(event) {
    const input = event.detail
    const value = format(input.value, props.autoFixed)
    input.value = String(value)
    modelValue.value = value
    nextTick(() => {
        emits('blur', event)
    })
}

function onChange() {
    if (
        (actionType.value === 'plus' && cpPlusDisabled.value) ||
        (actionType.value === 'minus' && cpMinusDisabled.value)
    ) {
        emits('overlimit', actionType)
        return
    }

    const diff = actionType.value === 'minus' ? -props.step : +props.step
    const value = format(addNumber(+modelValue.value, diff))

    setValue(value)
    emits(actionType.value)
}

function isEqual(value1, value2) {
    String(value1) === String(value2)
}

function format(value, autoFixed) {
    const { min, max, allowEmpty, decimalLength } = props

    if (allowEmpty && value === '') {
        return value
    }

    value = formatNumber(String(value), !props.integer)
    value = value === '' ? 0 : +value
    value = Number.isNaN(value) ? +min : value

    // whether to format the value entered by the user
    value = autoFixed ? Math.max(Math.min(+max, value), +min) : value

    // format decimal
    if (isDef(decimalLength)) {
        value = value.toFixed(+decimalLength)
    }

    return value
}

function check() {
    const value = format(modelValue.value)
    if (!isEqual(value, modelValue.value)) {
        modelValue.value = value
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
