<template>
    <view
        class="van-cell van-field"
        :class="{
            'van-field--disabled': disabled,
            'van-field--error': error,
            'van-cell--center': center,
            'van-cell--clickable': isLink || clickable,
            'van-cell--borderless': !border,
            [`van-field--label-${labelAlign}`]: true,
        }">
        <!-- 左侧 icon -->
        <template v-if="hasLeftIcon">
            <view
                class="van-field__left-icon"
                @click="handleLeftIcon">
                <slot name="leftIcon">
                    <van-icon :name="leftIcon"></van-icon>
                </slot>
            </view>
        </template>

        <!-- label -->
        <template v-if="hasLabel">
            <view
                class="van-cell__title van-field__label"
                :class="{
                    [`van-field__label--${labelAlign}`]: labelAlign !== 'left',
                    'van-field__label--required': required,
                    'van-field__label--colon': colon,
                }"
                :style="{
                    width: !isEmpty(labelWidth) ? addUnit(labelWidth) : '',
                }">
                <slot name="label">{{ label }}</slot>
            </view>
        </template>

        <!-- value -->
        <view class="van-cell__value van-field__value">
            <view
                class="van-field__body"
                :class="{
                    'van-field__body--textarea': type === 'textarea',
                }">
                <slot name="input">
                    <!-- textarea -->
                    <template v-if="'textarea' === type">
                        <textarea
                            v-model="modelValue"
                            :class="controlClassNames"
                            :style="textareaStyles"
                            :placeholder-class="placeholderClassNames"
                            :name="name"
                            :placeholder="placeholder"
                            :disabled="disabled"
                            :maxlength="maxlength"
                            :type="type"
                            :auto-focus="focus"
                            :focus="focus"
                            :auto-height="!!autosize"
                            :cursor-spacing="cursorSpacing"
                            :cursor="cursor"
                            :selection-start="selectionStart"
                            :selection-end="selectionEnd"
                            :adjust-position="adjustPosition"
                            :hold-keyboard="holdKeyboard"
                            :disable-default-padding="disableDefaultPadding"
                            :confrim-type="confirmType"
                            :confirm-hold="confirmHold"
                            :adjust-keyboard-to="adjustKeyBoardTo"
                            :show-confirm-bar="showConfirmBar"
                            :fixed="fixed"
                            class="van-field__control"
                            @focus="onFocus"
                            @blur="onBlur"
                            @linechange="onLineChange"
                            @input="onInput"
                            @confirm="onConfirm"
                            @keyboardheightchange="onKeyboardHeightChange"></textarea>
                    </template>
                    <!-- input -->
                    <template v-else>
                        <input
                            v-model="modelValue"
                            :placeholder-class="placeholderClassNames"
                            :class="controlClassNames"
                            :name="name"
                            :type="type"
                            :password="password"
                            :placeholder="placeholder"
                            :disabled="disabled"
                            :maxlength="maxlength"
                            :cursor-spacing="cursorSpacing"
                            :focus="focus"
                            :confrim-type="confirmType"
                            :confirm-hold="confirmHold"
                            :cursor="cursor"
                            :selection-start="selectionStart"
                            :selection-end="selectionEnd"
                            :adjust-position="adjustPosition"
                            :auto-blur="autoBlur"
                            :ignore-composition-event="ignoreCompositionEvent"
                            :always-embed="alwaysEmbed"
                            :hold-keyboard="holdKeyboard"
                            :safe-password-cert-path="safePasswordCertPath"
                            :safe-password-length="safePasswordLength"
                            :safe-password-time-stamp="safePasswordTimeStamp"
                            :safe-password-nonce="safePasswordNonce"
                            :safe-password-salt="safePasswordSalt"
                            :safe-password-custom-hash="safePasswordCustomHash"
                            :random-number="randomNumber"
                            :controlled="controlled"
                            :always-system="alwaysSystem"
                            :inputmode="inputmode"
                            class="van-field__control"
                            @input="onInput"
                            @focus="onFocus"
                            @blur="onBlur"
                            @confirm="onConfirm"
                            @keyboardheightchange="onKeyboardHeightChange"
                            @nicknamereview="onNicknameReview" />
                    </template>

                    <!-- 清除按钮 -->
                    <template v-if="hasClear">
                        <view
                            class="van-field__clear"
                            @click="handleClear">
                            <van-icon :name="clearIcon"></van-icon>
                        </view>
                    </template>
                </slot>

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

                <!-- button -->
                <template v-if="hasButton">
                    <view class="van-field__button">
                        <slot name="button"></slot>
                    </view>
                </template>
            </view>

            <template v-if="hasWordLimit">
                <view class="van-field__word-limit"> {{ String(modelValue).length }}/{{ maxlength }} </view>
            </template>

            <!-- 错误信息 -->
            <template v-if="hasErrorMessage">
                <view
                    class="van-field__error-message"
                    :class="{
                        [`van-field__error-message--${errorMessageAlign}`]: errorMessageAlign !== 'left',
                    }">
                    <slot name="errorMessage">{{ errorMessage }}</slot>
                </view>
            </template>
        </view>

        <!-- arrow -->
        <template v-if="hasCellRightIcon">
            <view class="van-cell__right-icon">
                <slot name="rightIcon">
                    <van-icon :name="arrow"></van-icon>
                </slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'
import { isEmpty, addUnit } from '../utils'
import { debounce } from 'lodash-es'

const props = defineProps({
    label: String,
    name: String,
    id: { type: String, default: 'van-field-n-input' },
    type: {
        type: String,
        default: 'text',
        validator: (value) =>
            ['text', 'number', 'idcard', 'digit', 'tel', 'safe-password', 'nickname', 'textarea'].includes(value),
    },
    fixed: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
    size: { type: String, validator: (value) => ['normal', 'large'].includes(value) },
    maxlength: { type: [Number, String], default: -1 },
    min: Number,
    max: Number,
    placeholder: String,
    border: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    colon: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    clearIcon: { type: String, default: 'clear' },
    clearTrigger: { type: String, default: 'focus', validator: (value) => ['always', 'focus'].includes(value) },
    clickable: { type: Boolean, default: false },
    isLink: { type: Boolean, default: false },
    showWordLimit: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    errorMessage: String,
    errorMessageAlign: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'center', 'right'].includes(value),
    },
    arrowDirection: {
        type: String,
        default: 'right',
        validator: (value) => ['left', 'right', 'up', 'down'].includes(value),
    },
    labelWidth: [Number, String],
    labelAlign: {
        type: String,
        default: 'left',
        validator: (value) => ['left', 'center', 'right', 'top'].includes(value),
    },
    inputAlign: { type: String, default: 'left', validator: (value) => ['left', 'center', 'right'].includes(value) },
    autosize: { type: [Boolean, Object], default: false },
    leftIcon: String,
    rightIcon: String,
    confirmType: {
        type: String,
        default: 'done',
        validator: (value) => ['send', 'search', 'next', 'go', 'done'].includes(value),
    },
    confirmHold: { type: Boolean, default: false },
    holdKeyboard: { type: Boolean, default: false },
    cursorSpacing: { type: Number, default: 50 },
    adjustPosition: { type: Boolean, default: true },
    showConfirmBar: { type: Boolean, default: true },
    selectionStart: { type: Number, default: -1 },
    selectionEnd: { type: Number, default: -1 },
    cursor: { type: Number, default: -1 },
    alwaysEmbed: { type: Boolean, default: false },
    disableDefaultPadding: { type: Boolean, default: true },
    iconPrefix: String,
    placeholderClass: String,
    autoBlur: { type: Boolean, default: false },
    ignoreCompositionEvent: { type: Boolean, default: true },
    safePasswordCertPath: String,
    safePasswordLength: Number,
    safePasswordTimeStamp: Number,
    safePasswordNonce: String,
    safePasswordSalt: String,
    safePasswordCustomHash: String,
    randomNumber: { type: Boolean, default: false },
    controlled: { type: Boolean, default: false },
    alwaysSystem: { type: Boolean, default: false },
    inputmode: {
        type: String,
        default: 'text',
        validator: (value) => ['none', 'text', 'decimal', 'numberic', 'tel', 'search', 'email', 'url'].includes(value),
    },
    adjustKeyBoardTo: { type: String, default: 'bottom', validator: (value) => ['cursor', 'bottom'].includes(value) },
    password: { type: Boolean, default: false },
    formatter: { type: Function, default: (val) => val },
    formatTrigger: { type: String, default: 'onChange', validator: (value) => ['onChange', 'onBlur'].includes(value) },
})
const emits = defineEmits([
    'input',
    'focus',
    'blur',
    'change',
    'confirm',
    'clear',
    'clickInput',
    'clickLeftIcon',
    'clickRightIcon',
    'keyboardheightchange',
    'linechange',
    'nicknamereview',
])

const slots = useSlots()

const modelValue = defineModel('modelValue', { type: [String, Number] })

const isFocus = ref(false)

const placeholderClassNames = computed(() => `van-field__placeholder ${props.placeholderClass}`)
const controlClassNames = computed(() => ({
    [`van-field__control--${props.inputAlign}`]: props.inputAlign !== 'left',
    'van-field__control--error': props.error,
    'van-field__control--textarea': props.type === 'textarea',
}))
const textareaStyles = computed(() => ({
    ...(props.autosize && typeof props.autosize === 'object'
        ? { minHeight: addUnit(props.autosize.minHeight), maxHeight: addUnit(props.autosize.maxHeight) }
        : {}),
}))
const hasLeftIcon = computed(() => {
    return !isEmpty(props.leftIcon) || slots.leftIcon
})
const hasLabel = computed(() => {
    return !isEmpty(props.label) || slots.label
})
const hasRightIcon = computed(() => {
    return !isEmpty(props.rightIcon) || slots.rightIcon
})
const hasErrorMessage = computed(() => {
    return !isEmpty(props.errorMessage) || slots.errorMessage
})
const hasButton = computed(() => {
    return slots.button
})
const hasClear = computed(() => {
    const checkValue = !isEmpty(modelValue.value)

    if (props.clearTrigger === 'focus') {
        return props.clearable && checkValue && isFocus.value
    }

    return props.clearable && props.arrowDirectioncheckValue
})
const hasCellRightIcon = computed(() => slots['rightIcon'] || props.isLink)
const arrow = computed(() => {
    const { arrowDirection } = props
    let name

    switch (arrowDirection) {
        case 'left':
            name = 'arrow-left'
            break
        case 'right':
            name = 'arrow'
            break
        case 'up':
            name = 'arrow-up'
            break
        case 'down':
            name = 'arrow-down'
            break
        default:
            name = 'arrow'
            break
    }

    return name
})
const hasWordLimit = computed(() => !isEmpty(props.maxlength) && props.showWordLimit)

const onInput = debounce(() => {
    if ('onChange' === props.formatTrigger) {
        modelValue.value = props.formatter(modelValue.value)
    }
    emits('input', modelValue.value)
    emits('change', modelValue.value)
}, 10)

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
    emits('clickInput', e)
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

function onConfirm(e) {
    modelValue.value = e.detail.value
    emits('confirm', e)
}

function onKeyboardHeightChange(e) {
    emits('keyboardheightchange', e)
}

function onLineChange(e) {
    emits('linechange', e)
}

function onNicknameReview(e) {
    emits('nicknamereview', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
