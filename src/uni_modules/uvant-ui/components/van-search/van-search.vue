<template>
    <view
        :class="bem()"
        :style="{
            background,
        }">
        <view
            :class="
                bem('content', {
                    [shape]: shape,
                })
            ">
            <template v-if="hasLabel">
                <view :class="bem('label')">
                    <slot name="label">{{ label }}</slot>
                </view>
            </template>
            <view :class="[bemCell(['borderless']), bemField(), bem('field', { disabled })]">
                <template v-if="hasLeftIcon">
                    <view
                        :class="bemField('left-icon')"
                        @click="onClickLeftIcon">
                        <van-icon :name="leftIcon"></van-icon>
                    </view>
                </template>
                <view
                    :class="[bemCell('value'), bemField('value')]"
                    @click="onClickInput">
                    <view :class="bemField('body')">
                        <input
                            v-model="modelValue"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            :id="id"
                            :class="bemField('control', { [inputAlign]: inputAlign })"
                            :maxlength="maxlength"
                            :focus="autofocus"
                            type="search"
                            @input="onInput"
                            @focus="onFocus"
                            @blur="onBlur"
                            @confirm="onSearch"
                            @search="onSearch" />

                        <!-- 清除按钮 -->
                        <template v-if="hasClear">
                            <view
                                :class="bemField('clear')"
                                @click="onClear">
                                <van-icon :name="clearIcon"></van-icon>
                            </view>
                        </template>

                        <!-- 右侧 icon -->
                        <template v-if="hasRightIcon">
                            <view
                                :class="bemField('right-icon')"
                                @click="onClickRightIcon">
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
                @click="onClickCancel">
                {{ actionText }}
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, useSlots, ref } from 'vue'
import { createNamespace, makeStringProp, makeNumericProp, truthProp, isDef, debounce } from '../utils'

const props = defineProps({
    label: String,
    name: String,
    shape: makeStringProp('square'),
    id: String,
    background: String,
    maxlength: makeNumericProp(-1),
    placeholder: String,
    clearable: truthProp,
    clearIcon: makeStringProp('clear'),
    clearTrigger: makeStringProp('focus'),
    autofocus: Boolean,
    showAction: Boolean,
    actionText: makeStringProp('取消'),
    disabled: Boolean,
    inputAlign: String,
    leftIcon: makeStringProp('search'),
    rightIcon: String,
    formatter: { type: Function, default: (val) => val },
    formatTrigger: makeStringProp('onChange'),
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
const { bem } = createNamespace('search')
const { bem: bemCell } = createNamespace('cell')
const { bem: bemField } = createNamespace('field')

const isFocus = ref(false)

const hasLeftIcon = computed(() => isDef(props.leftIcon) || slots.leftIcon)
const hasLabel = computed(() => isDef(props.label) || slots.label)
const hasClear = computed(() => {
    const checkValue = isDef(modelValue.value)

    if (props.clearTrigger === 'focus') {
        return props.clearable && checkValue && isFocus.value
    }

    return props.clearable && checkValue
})
const hasRightIcon = computed(() => isDef(props.rightIcon) || slots.rightIcon)

const onInput = debounce(() => {
    if ('onChange' === props.formatTrigger) {
        modelValue.value = props.formatter(modelValue.value)
    }

    emits('change', modelValue.value)
}, 10)

function onClickCancel() {
    emits('cancel')
}

function onClickInput(e) {
    emits('clickInput', e)
}

function onClickLeftIcon(e) {
    emits('clickLeftIcon', e)
}

function onClickRightIcon(e) {
    emits('clickRightIcon', e)
}

function onClear() {
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
