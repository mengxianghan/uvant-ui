<template>
    <view
        class="van-cell van-field"
        :class="cpClass">
        <!-- 左侧 icon -->
        <template v-if="cpHasLeftIcon">
            <view
                class="van-field__left-icon"
                @click="handleLeftIcon">
                <slot name="leftIcon">
                    <van-icon :name="leftIcon"></van-icon>
                </slot>
            </view>
        </template>

        <!-- label -->
        <template v-if="cpHasLabel">
            <view
                class="van-cell__title van-field__label"
                :class="cpLabelClass"
                :style="cpLabelStyle">
                <slot name="label">{{ label }}</slot>
            </view>
        </template>

        <!-- value -->
        <view class="van-cell__value van-field__value">
            <view
                class="van-field__body"
                :class="cpBodyClass">
                <slot name="input">
                    <!-- textarea -->
                    <template v-if="'textarea' === type">
                        <textarea
                            v-model="modelValue"
                            :class="cpControlClass"
                            :style="cpTextareaStyle"
                            :placeholder-class="cpPlaceholderClass"
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
                            :placeholder-class="cpPlaceholderClass"
                            :class="cpControlClass"
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
                    <template v-if="cpHasClear">
                        <view
                            class="van-field__clear"
                            @click="handleClear">
                            <van-icon :name="clearIcon"></van-icon>
                        </view>
                    </template>
                </slot>

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

                <!-- button -->
                <template v-if="cpHasButton">
                    <view class="van-field__button">
                        <slot name="button"></slot>
                    </view>
                </template>
            </view>

            <template v-if="cpHasWordLimit">
                <view class="van-field__word-limit"> {{ cpWordCount }}/{{ maxlength }} </view>
            </template>

            <!-- 错误信息 -->
            <template v-if="cpHasErrorMessage">
                <view
                    class="van-field__error-message"
                    :class="cpErrorMessageClass">
                    <slot name="errorMessage">{{ errorMessage }}</slot>
                </view>
            </template>
        </view>

        <!-- arrow -->
        <template v-if="cpHasCellRightIcon">
            <view class="van-cell__right-icon">
                <slot name="rightIcon">
                    <van-icon :name="cpArrow"></van-icon>
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

const cpClass = computed(() => {
    const { disabled, error, center, labelAlign, isLink, clickable, border } = props
    const classNames = {
        'van-field--disabled': disabled,
        'van-field--error': error,
        'van-cell--center': center,
        'van-cell--clickable': isLink || clickable,
        'van-cell--borderless': !border,
        [`van-field--label-${labelAlign}`]: true,
    }

    return classNames
})
const cpLabelClass = computed(() => {
    const { required, labelAlign, colon } = props
    const classNames = {
        [`van-field__label--${labelAlign}`]: labelAlign !== 'left',
        'van-field__label--required': required,
        'van-field__label--colon': colon,
    }

    return classNames
})
const cpLabelStyle = computed(() => {
    const { labelWidth } = props
    const style = {}

    if (!isEmpty(labelWidth)) {
        style.width = addUnit(labelWidth)
    }

    return style
})
const cpBodyClass = computed(() => {
    const { type } = props
    const classNames = {
        'van-field__body--textarea': type === 'textarea',
    }

    return classNames
})
const cpControlClass = computed(() => {
    const { error, inputAlign, type } = props
    const classNames = {
        'van-field__control--error': error,
        'van-field__control--textarea': type === 'textarea',
        [`van-field__control--${inputAlign}`]: inputAlign !== 'left',
    }

    return classNames
})
const cpPlaceholderClass = computed(() => {
    const { placeholderClass } = props
    let classNames = 'van-field__placeholder '

    if (placeholderClass) {
        classNames += placeholderClass
    }

    return classNames
})
const cpErrorMessageClass = computed(() => {
    const { errorMessageAlign } = props
    const classNames = {
        [`van-field__error-message--${errorMessageAlign}`]: errorMessageAlign !== 'left',
    }

    return classNames
})
const cpTextareaStyle = computed(() => {
    const { autosize } = props
    const style = {}

    if (autosize && typeof autosize === 'object') {
        style.minHeight = addUnit(autosize.minHeight)
        style.maxHeight = addUnit(autosize.maxHeight)
    }

    return style
})
const cpWordCount = computed(() => {
    return String(modelValue.value).length
})
const cpHasLeftIcon = computed(() => {
    return !isEmpty(props.leftIcon) || slots.leftIcon
})
const cpHasLabel = computed(() => {
    return !isEmpty(props.label) || slots.label
})
const cpHasRightIcon = computed(() => {
    return !isEmpty(props.rightIcon) || slots.rightIcon
})
const cpHasErrorMessage = computed(() => {
    return !isEmpty(props.errorMessage) || slots.errorMessage
})
const cpHasButton = computed(() => {
    return slots.button
})
const cpHasClear = computed(() => {
    const { clearable, clearTrigger } = props
    const checkValue = !isEmpty(modelValue.value)

    if (clearTrigger === 'focus') {
        return clearable && checkValue && isFocus.value
    }

    return clearable && checkValue
})
const cpHasCellRightIcon = computed(() => slots['rightIcon'] || props.isLink)
const cpArrow = computed(() => {
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
const cpHasWordLimit = computed(() => {
    const { maxlength, showWordLimit } = props
    return !isEmpty(maxlength) && showWordLimit
})

const onInput = debounce(() => {
    const { formatTrigger, formatter } = props

    if ('onChange' === formatTrigger) {
        modelValue.value = formatter(modelValue.value)
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
    const { formatter, formatTrigger } = props

    setTimeout(() => {
        isFocus.value = false
    }, 5)

    if ('onBlur' === formatTrigger) {
        modelValue.value = formatter(modelValue.value)
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
