<template>
    <view
        class="van-search"
        :style="{
            background,
        }">
        <view
            class="van-search__content"
            :class="{
                [`van-search__content--${shape}`]: shape,
            }">
            <template v-if="hasLabel">
                <view class="van-search__label">
                    <slot name="label">{{ label }}</slot>
                </view>
            </template>
            <view
                class="van-cell van-cell--borderless van-field van-search__field"
                :class="{
                    'van-field--disabled': disabled,
                }">
                <template v-if="hasLeftIcon">
                    <view
                        class="van-field__left-icon"
                        @click="handleLeftIcon">
                        <van-icon :name="leftIcon"></van-icon>
                    </view>
                </template>
                <view
                    class="van-cell__value van-field__value"
                    @click="handleInput">
                    <view class="van-field__body">
                        <input
                            v-model="modelValue"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            :id="id"
                            :class="{
                                [`van-field__control--${inputAlign}`]: inputAlign,
                            }"
                            :maxlength="maxlength"
                            :focus="autofocus"
                            type="search"
                            class="van-field__control"
                            @input="onInput"
                            @focus="onFocus"
                            @blur="onBlur"
                            @confirm="onSearch"
                            @search="onSearch" />

                        <!-- 清除按钮 -->
                        <template v-if="hasClear">
                            <view
                                class="van-field__clear"
                                @click="handleClear">
                                <van-icon :name="clearIcon"></van-icon>
                            </view>
                        </template>

                        <!-- 右侧 icon -->
                        <template v-if="hasRightIcon">
                            <view
                                class="van-field__right-icon"
                                @click="handleRightIcon">
                                <slot name="rightIcon">
                                    <van-icon :name="rightIcon"></van-icon>
                                </slot>
                            </view>
                        </template>
                    </view>
                </view>
            </view>
        </view>
        <template v-if="showAction">
            <view
                class="van-search__action"
                @click="handleCancel">
                {{ actionText }}
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, useSlots, ref } from 'vue'
import { isEmpty } from '../utils'
import { debounce } from 'lodash-es'

const props = defineProps({
    label: String,
    name: String,
    shape: { type: String, default: 'square', validator: (value) => ['round', 'square'].includes(value) },
    id: { type: String, default: 'van-search-n-input' },
    background: String,
    maxlength: { type: [Number, String], default: -1 },
    placeholder: String,
    clearable: { type: Boolean, default: true },
    clearIcon: { type: String, default: 'clear' },
    clearTrigger: { type: String, default: 'focus', validator: (value) => ['always ', 'focus'].includes(value) },
    autofocus: { type: Boolean, default: false },
    showAction: { type: Boolean, default: false },
    actionText: { type: String, default: '取消' },
    disabled: { type: Boolean, default: false },
    inputAlign: { type: String, validator: (value) => ['left', 'center', 'right'].includes(value) },
    leftIcon: { type: String, default: 'search' },
    rightIcon: String,
    formatter: { type: Function, default: (val) => val },
    formatTrigger: { type: String, default: 'onChange', validator: (value) => ['onChange', 'onBlur'].includes(value) },
})

const emits = defineEmits([
    'search',
    'focus',
    'blur',
    'clickInput',
    'clickLeftIcon',
    'clickRightIcon',
    'clear',
    'cancel',
    'change',
])

const modelValue = defineModel('modelValue', { type: [String, Number] })

const slots = useSlots()

const isFocus = ref(false)

const hasLeftIcon = computed(() => !isEmpty(props.leftIcon) || slots.leftIcon)
const hasLabel = computed(() => !isEmpty(props.label) || slots.label)
const hasClear = computed(() => {
    const checkValue = !isEmpty(modelValue.value)

    if (props.clearTrigger === 'focus') {
        return props.clearable && checkValue && isFocus.value
    }

    return props.clearable && checkValue
})
const hasRightIcon = computed(() => !isEmpty(props.rightIcon) || slots.rightIcon)

const onInput = debounce(() => {
    if ('onChange' === props.formatTrigger) {
        modelValue.value = props.formatter(modelValue.value)
    }

    emits('change', modelValue.value)
}, 10)

function handleCancel() {
    emits('cancel')
}

function handleInput(e) {
    emits('clickInput', e)
}

function handleLeftIcon(e) {
    emits('clickLeftIcon', e)
}

function handleRightIcon(e) {
    emits('clickRightIcon', e)
}

function handleClear() {
    modelValue.value = ''
    emits('clear')
}

function onFocus(e) {
    isFocus.value = true
    emits('focus', e)
}

function onBlur(e) {
    setTimeout(() => {
        isFocus.value = false
    }, 5)

    if ('onBlur' === props.formatTrigger) {
        modelValue.value = props.formatter(modelValue.value)
    }

    emits('blur', e)
}

function onSearch(e) {
    emits('search', e.detail.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
