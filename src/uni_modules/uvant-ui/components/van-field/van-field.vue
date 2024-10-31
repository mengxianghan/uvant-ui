<template>
    <view
        :class="[
            bem({
                disabled,
                error,
                [`label-${labelAlign}`]: true,
            }),
            bemCell({
                center,
                clickable: isLink || clickable,
                borderless: !border,
            }),
        ]">
        <!-- 左侧 icon -->
        <template v-if="hasLeftIcon">
            <view
                :class="bem('left-icon')"
                @click="handleLeftIcon">
                <slot name="leftIcon">
                    <van-icon :name="leftIcon"></van-icon>
                </slot>
            </view>
        </template>

        <!-- label -->
        <template v-if="hasLabel">
            <view
                :class="[
                    bem('label', {
                        [labelAlign]: labelAlign !== 'left',
                        required,
                        colon,
                    }),
                    bemCell('title'),
                ]"
                :style="{
                    width: isDef(labelWidth) ? addUnit(labelWidth) : '',
                }">
                <slot name="label">{{ label }}</slot>
            </view>
        </template>

        <!-- value -->
        <view :class="[bem('value'), bemCell('value')]">
            <view
                :class="
                    bem('body', {
                        textarea: type === 'textarea',
                    })
                ">
                <slot name="input">
                    <!-- textarea -->
                    <template v-if="'textarea' === type">
                        <textarea
                            v-model="modelValue"
                            :class="controlClasses"
                            :style="textareaStyles"
                            :placeholder-class="placeholderClasses"
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
                            :placeholder-class="placeholderClasses"
                            :class="controlClasses"
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
                            :class="bem('clear')"
                            @click="handleClear">
                            <van-icon :name="clearIcon"></van-icon>
                        </view>
                    </template>
                </slot>

                <!-- 右侧 icon -->
                <template v-if="hasRightIcon">
                    <view
                        :class="bem('right-icon')"
                        @click="handleRightIcon">
                        <slot name="rightIcon">
                            <van-icon :name="rightIcon"></van-icon>
                        </slot>
                    </view>
                </template>

                <!-- button -->
                <template v-if="hasButton">
                    <view :class="bem('button')">
                        <slot name="button"></slot>
                    </view>
                </template>
            </view>

            <template v-if="hasWordLimit">
                <view :class="bem('word-limit')"> {{ String(modelValue).length }}/{{ maxlength }} </view>
            </template>

            <!-- 错误信息 -->
            <template v-if="hasErrorMessage">
                <view
                    :class="
                        bem('error-message', {
                            [errorMessageAlign]: errorMessageAlign !== 'left',
                        })
                    ">
                    <slot name="errorMessage">{{ errorMessage }}</slot>
                </view>
            </template>
        </view>

        <!-- arrow -->
        <template v-if="hasCellRightIcon">
            <view :class="bemCell('right-icon')">
                <slot name="rightIcon">
                    <van-icon :name="arrow"></van-icon>
                </slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, ref, useSlots } from 'vue'
import {
    addUnit,
    createNamespace,
    makeStringProp,
    makeNumericProp,
    truthProp,
    numericProp,
    makeNumberProp,
    isDef,
    debounce,
} from '../utils'

const props = defineProps({
    label: String,
    name: String,
    id: String,
    type: makeStringProp('text'), // ['text', 'number', 'idcard', 'digit', 'tel', 'safe-password', 'nickname', 'textarea']
    fixed: Boolean,
    focus: Boolean,
    size: String,
    maxlength: makeNumericProp(-1),
    min: Number,
    max: Number,
    placeholder: String,
    border: truthProp,
    disabled: Boolean,
    colon: Boolean,
    required: Boolean,
    center: Boolean,
    clearable: Boolean,
    clearIcon: makeStringProp('clear'),
    clearTrigger: makeStringProp('focus'),
    clickable: Boolean,
    isLink: Boolean,
    showWordLimit: Boolean,
    error: Boolean,
    errorMessage: String,
    errorMessageAlign: makeStringProp('left'),
    arrowDirection: makeStringProp('right'),
    labelWidth: numericProp,
    labelAlign: makeStringProp('left'),
    inputAlign: makeStringProp('left'),
    autosize: { type: [Boolean, Object], default: false },
    leftIcon: String,
    rightIcon: String,
    confirmType: makeStringProp('done'),
    confirmHold: Boolean,
    holdKeyboard: Boolean,
    cursorSpacing: makeNumberProp(50),
    adjustPosition: truthProp,
    showConfirmBar: truthProp,
    selectionStart: makeNumberProp(-1),
    selectionEnd: makeNumberProp(-1),
    cursor: makeNumberProp(-1),
    alwaysEmbed: Boolean,
    disableDefaultPadding: truthProp,
    iconPrefix: String,
    placeholderClass: String,
    autoBlur: Boolean,
    ignoreCompositionEvent: truthProp,
    safePasswordCertPath: String,
    safePasswordLength: Number,
    safePasswordTimeStamp: Number,
    safePasswordNonce: String,
    safePasswordSalt: String,
    safePasswordCustomHash: String,
    randomNumber: Boolean,
    controlled: Boolean,
    alwaysSystem: Boolean,
    inputmode: makeStringProp('text'),
    adjustKeyBoardTo: makeStringProp('bottom'),
    password: Boolean,
    formatter: { type: Function, default: (val) => val },
    formatTrigger: makeStringProp('onChange'),
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
const modelValue = defineModel('modelValue', { type: [String, Number] })

const slots = useSlots()
const { name: bemName, bem } = createNamespace('field')
const { bem: bemCell } = createNamespace('cell')

const isFocus = ref(false)

const placeholderClasses = computed(() => `${bemName}__placeholder ${props.placeholderClass}`)
const controlClasses = computed(() =>
    bem('control', {
        [props.inputAlign]: props.inputAlign !== 'left',
        error: props.error,
        textarea: props.type === 'textarea',
    })
)
const textareaStyles = computed(() => ({
    ...(props.autosize && typeof props.autosize === 'object'
        ? { minHeight: addUnit(props.autosize.minHeight), maxHeight: addUnit(props.autosize.maxHeight) }
        : {}),
}))
const hasLeftIcon = computed(() => {
    return isDef(props.leftIcon) || slots.leftIcon
})
const hasLabel = computed(() => {
    return isDef(props.label) || slots.label
})
const hasRightIcon = computed(() => {
    return isDef(props.rightIcon) || slots.rightIcon
})
const hasErrorMessage = computed(() => {
    return isDef(props.errorMessage) || slots.errorMessage
})
const hasButton = computed(() => {
    return slots.button
})
const hasClear = computed(() => {
    if (props.clearTrigger === 'focus') {
        return props.clearable && isDef(modelValue.value) && isFocus.value
    }

    return props.clearable && props.arrowDirection
})
const hasCellRightIcon = computed(() => slots['rightIcon'] || props.isLink)
const arrow = computed(() => {
    let name

    switch (props.arrowDirection) {
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
const hasWordLimit = computed(() => isDef(props.maxlength) && props.showWordLimit)

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
