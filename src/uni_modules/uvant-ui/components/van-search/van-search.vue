<template>
    <view
        class="van-search"
        :style="cpStyle">
        <view
            class="van-search__content"
            :class="cpContentClass">
            <template v-if="cpHasLabel">
                <view class="van-search__label">
                    <slot name="label">{{ label }}</slot>
                </view>
            </template>
            <view
                class="van-cell van-cell--borderless van-field van-search__field"
                :class="cpFieldClass">
                <template v-if="cpHasLeftIcon">
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
                            type="search"
                            class="van-field__control"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            :id="id"
                            :class="cpControlClass"
                            :value="modelValue"
                            :maxlength="maxlength"
                            :focus="autofocus"
                            @input="onInput"
                            @focus="onFocus"
                            @blur="onBlur"
                            @confirm="onSearch"
                            @search="onSearch" />

                        <!-- 清除按钮 -->
                        <template v-if="cpHasClear">
                            <view
                                class="van-field__clear"
                                @click="handleClear">
                                <van-icon :name="clearIcon"></van-icon>
                            </view>
                        </template>

                        <!-- 右侧 icon -->
                        <template v-if="cpHasRightIcon">
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

const props = defineProps({
    label: String,
    name: String,
    shape: { type: String, default: 'square', validator: (value) => ['round', 'square'].includes(value) },
    id: { type: String, default: 'van-search-n-input' },
    background: String,
    maxlength: [Number, String],
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
])

const modelValue = defineModel('modelValue', { type: [String, Number] })

const slots = useSlots()

const isFocus = ref(false)

const cpContentClass = computed(() => {
    const { shape } = props
    const classNames = {
        [`van-search__content--${shape}`]: true,
    }

    return classNames
})
const cpFieldClass = computed(() => {
    const { disabled } = props
    const classNames = {
        'van-field--disabled': disabled,
    }

    return classNames
})
const cpControlClass = computed(() => {
    const { inputAlign } = props
    const classNames = {
        [`van-field__control--${inputAlign}`]: true,
    }

    return classNames
})
const cpStyle = computed(() => {
    const { background } = props
    const style = {}

    if (!isEmpty(background)) {
        style.background = background
    }

    return style
})
const cpHasLeftIcon = computed(() => {
    const { leftIcon } = props
    return !isEmpty(leftIcon) || slots.leftIcon
})
const cpHasLabel = computed(() => {
    const { label } = props
    return !isEmpty(label) || slots.label
})
const cpHasClear = computed(() => {
    const { clearable, clearTrigger } = props
    const checkValue = !isEmpty(modelValue.value)

    if (clearTrigger === 'focus') {
        return clearable && checkValue && isFocus.value
    }

    return clearable && checkValue
})
const cpHasRightIcon = computed(() => {
    return !isEmpty(props.rightIcon) || slots.rightIcon
})

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

function onInput(e) {
    modelValue.value = e.detail.value
    emits('change', e.detail.value)
}

function onFocus(e) {
    isFocus.value = true
    emits('focus', e)
}

function onBlur(e) {
    setTimeout(() => {
        isFocus.value = false
    }, 5)
    emits('blur', e)
}

function onSearch(e) {
    emits('search', e.detail.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
