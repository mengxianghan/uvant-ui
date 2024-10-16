<template>
    <button
        class="van-button"
        hover-class="none"
        :class="{
            [`van-button--${type}`]: true,
            [`van-button--${size}`]: true,
            'van-button--plain': plain,
            'van-button--square': square,
            'van-button--round': round,
            'van-button--hairline': hairline,
            'van-button--block': block,
            'van-button--disabled': disabled,
        }"
        :style="styles"
        :disabled="disabled"
        @click="handleClick">
        <view class="van-button__content">
            <template v-if="loading">
                <view class="van-button__icon">
                    <slot name="loading">
                        <van-loading :type="loadingType"></van-loading>
                    </slot>
                </view>
                <template v-if="!isEmpty(loadingText)">
                    <view class="van-button__text">
                        {{ loadingText }}
                    </view>
                </template>
            </template>
            <template v-else>
                <template v-if="'left' === iconPosition && hasIcon">
                    <view class="van-button__icon">
                        <van-icon
                            :name="icon"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </template>

                <template v-if="hasText">
                    <view class="van-button__text">
                        <slot>{{ text }}</slot>
                    </view>
                </template>

                <template v-if="'right' === iconPosition && hasIcon">
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
import { computed, useSlots } from 'vue'
import { isEmpty } from '../utils'

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

const slots = useSlots()

const styles = computed(() => {
    if (!props.color) {
        return
    }

    const isLinear = props.color?.startsWith('linear-gradient')

    return {
        color: props.plain ? props.color : '#fff',
        background: !props.plain ? props.color : '',
        ...(isLinear ? { border: 0 } : { borderColor: props.color }),
    }
})
const hasIcon = computed(() => {
    return !isEmpty(props.icon)
})
const hasText = computed(() => {
    return !isEmpty(props.text) || slots.default
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
