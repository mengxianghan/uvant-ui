<template>
    <button
        :class="
            bem({
                [type]: type,
                [size]: size,
                plain,
                square,
                round,
                hairline,
                block,
                disabled,
            })
        "
        hover-class="none"
        :style="styles"
        :disabled="disabled"
        @click="handleClick">
        <view :class="bem('content')">
            <template v-if="loading">
                <view :class="bem('icon')">
                    <slot name="loading">
                        <van-loading
                            :type="loadingType"
                            :size="loadingSize"></van-loading>
                    </slot>
                </view>
                <template v-if="isDef(loadingText)">
                    <view :class="bem('text')">
                        {{ loadingText }}
                    </view>
                </template>
            </template>
            <template v-else>
                <template v-if="'left' === iconPosition && hasIcon">
                    <view :class="bem('icon')">
                        <van-icon
                            :name="icon"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </template>

                <template v-if="hasText">
                    <view :class="bem('text')">
                        <slot>{{ text }}</slot>
                    </view>
                </template>

                <template v-if="'right' === iconPosition && hasIcon">
                    <view :class="bem('icon')">
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
import { createNamespace, makeStringProp, numericProp, isDef } from '../utils'

const props = defineProps({
    text: String,
    icon: String,
    type: makeStringProp('default'),
    size: makeStringProp('normal'),
    color: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    iconPrefix: String,
    loadingSize: numericProp,
    loadingText: String,
    loadingType: String,
    iconPosition: makeStringProp('left'),
})
const emits = defineEmits(['click'])

const slots = useSlots()

const { bem } = createNamespace('button')

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
    return isDef(props.icon)
})
const hasText = computed(() => {
    return isDef(props.text) || slots.default
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
