<template>
    <button
        class="van-button"
        hover-class="none"
        :class="cpClass"
        :style="cpStyle"
        :disabled="disabled"
        @click="handleClick">
        <view class="van-button__content">
            <template v-if="loading">
                <view class="van-button__icon">
                    <slot name="loading">
                        <van-loading :type="loadingType"></van-loading>
                    </slot>
                </view>
                <template v-if="cpHasLoadingText">
                    <view class="van-button__text">
                        {{ loadingText }}
                    </view>
                </template>
            </template>
            <template v-else>
                <template v-if="'left' === iconPosition && cpHasIcon">
                    <view class="van-button__icon">
                        <van-icon
                            :name="icon"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </template>

                <view class="van-button__text">
                    <slot>{{ text }}</slot>
                </view>

                <template v-if="'right' === iconPosition && cpHasIcon">
                    <view class="van-button__icon">
                        <van-icon
                            :name="icon"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </template>
            </template>
        </view>
    </button>
</template>

<script setup>
import { computed } from 'vue'
import { isDef } from '../utils'

const props = defineProps({
    type: { type: String, default: 'default' },
    size: { type: String, default: 'normal' },
    text: String,
    color: String,
    icon: String,
    iconPrefix: String,
    iconPosition: { type: String, default: 'left', validator: (value) => ['left', 'right'].includes(value) },
    block: { type: Boolean, default: false },
    plain: { type: Boolean, default: false },
    square: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    hairline: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingText: String,
    loadingType: { type: String, default: 'circular' },
})
const emits = defineEmits(['click'])

const cpClass = computed(() => {
    const { type, size, plain, square, round, hairline, block, disabled } = props
    const classNames = {
        'van-button': true,
        [`van-button--${type}`]: true,
        [`van-button--${size}`]: true,
        'van-button--plain': plain,
        'van-button--square': square,
        'van-button--round': round,
        'van-button--hairline': hairline,
        'van-button--block': block,
        'van-button--disabled': disabled,
    }

    return classNames
})
const cpStyle = computed(() => {
    const isLinear = props.color?.startsWith('linear-gradient')
    const style = {}

    if (!props.color) {
        return style
    }

    style.color = '#fff'

    if (!props.plain) {
        style.background = props.color
    }

    if (props.plain) {
        style.color = props.color
    }

    if (isLinear) {
        style.border = 0
    } else {
        style.borderColor = props.color
    }

    return style
})
const cpHasLoadingText = computed(() => {
    const { loadingText } = props

    return loadingText
})
const cpHasIcon = computed(() => {
    return isDef(props.icon) && props.icon !== ''
})

function handleClick(e) {
    const { loading, disabled } = props
    if (loading || disabled) {
        e.preventDefault()
        return
    }
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
