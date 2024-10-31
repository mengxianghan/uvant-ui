<template>
    <view
        :class="
            bem({
                [theme]: theme,
            })
        ">
        <view
            :class="
                bem('minus', {
                    disabled: minusDisabled,
                })
            "
            :style="buttonStyles"
            @click="onClick('minus')">
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
            :class="
                bem('input', {
                    disabled: disabled || disableInput,
                })
            "
            :style="inputStyles"
            @input="onInput"
            @focus="onFocus"
            @blur="onBlur" />
        <view
            class="van-stepper__plus"
            :class="
                bem('plus', {
                    disabled: plusDisabled,
                })
            "
            :style="buttonStyles"
            @click="onClick('plus')">
            <slot name="plusIcon">
                <van-icon name="plus" />
            </slot>
        </view>
    </view>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import {
    isDef,
    formatNumber,
    addNumber,
    callInterceptor,
    addUnit,
    getSizeStyle,
    createNamespace,
    truthProp,
    makeNumericProp,
    numericProp,
    isEqual,
    defaultTo,
} from '../utils'

const props = defineProps({
    min: makeNumericProp(1),
    max: numericProp,
    autoFixed: truthProp,
    defaultValue: makeNumericProp(1),
    step: makeNumericProp(1),
    name: numericProp,
    inputWidth: numericProp,
    buttonSize: numericProp,
    decimalLength: numericProp,
    theme: String,
    placeholder: String,
    integer: Boolean,
    disabled: Boolean,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    beforeChange: { type: Function, default: () => true },
    showPlus: truthProp,
    showMinus: truthProp,
    showInput: truthProp,
    longPress: truthProp,
    allowEmpty: Boolean,
})

const modelValue = defineModel({ type: [Number, String] })
const emits = defineEmits(['plus', 'blur', 'minus', 'focus', 'change', 'overlimit'])

const { bem } = createNamespace('stepper')

const actionType = ref()

const minusDisabled = computed(() => props.disabled || props.disableMinus || +modelValue.value <= +props.min)
const plusDisabled = computed(() => props.disabled || props.disablePlus || +modelValue.value >= +props.max)
const inputStyles = computed(() => ({
    width: addUnit(props.inputWidth),
    height: addUnit(props.buttonSize),
}))
const buttonStyles = computed(() => getSizeStyle(props.buttonSize))

watch(() => [props.max, props.min, props.integer, props.decimalLength], check)
watch(
    () => modelValue.value,
    (value) => emits('change', value, { name: props.name })
)

getInitialValue()

function onClick(_actionType) {
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
    if ((actionType.value === 'plus' && plusDisabled.value) || (actionType.value === 'minus' && minusDisabled.value)) {
        emits('overlimit', actionType)
        return
    }

    const diff = actionType.value === 'minus' ? -props.step : +props.step
    const value = format(addNumber(+modelValue.value, diff))

    setValue(value)
    emits(actionType.value)
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
