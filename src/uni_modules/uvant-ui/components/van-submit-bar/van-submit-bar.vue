<template>
    <van-fixed
        :placeholder="placeholder"
        :position="fixed && 'bottom'">
        <view
            class="van-submit-bar"
            :class="{
                'van-submit-bar--fixed': fixed,
                'van-safe-area-bottom': safeAreaInsetBottom,
            }">
            <template v-if="hasTip">
                <view class="van-submit-bar__tip">
                    <template v-if="hasTipIcon">
                        <view class="van-submit-bar__tip-icon">
                            <van-icon :name="tipIcon"></van-icon>
                        </view>
                    </template>
                    <template v-if="tip">
                        <text class="van-submit-bar__tip-text">{{ tip }}</text>
                    </template>
                    <template v-if="slots.tip">
                        <slot name="tip"></slot>
                    </template>
                </view>
            </template>
            <view class="van-submit-bar__bar">
                <slot></slot>
                <template v-if="hasPrice">
                    <view
                        class="van-submit-bar__text"
                        :style="textStyles">
                        <text>{{ label }}</text>
                        <view class="van-submit-bar__price">
                            {{ currency }}<text class="van-submit-bar__price-integer">{{ integer }}</text
                            >{{ decimal }}
                        </view>
                        <text class="van-submit-bar__suffix-label">{{ suffixLabel }}</text>
                    </view>
                </template>

                <slot name="button">
                    <van-button
                        class="van-submit-bar__button"
                        round
                        :disabled="disabled"
                        :border="false"
                        :type="buttonType"
                        :loading="loading"
                        :color="buttonColor"
                        @click="handleSubmit">
                        {{ buttonText }}
                    </van-button>
                </slot>
            </view>
        </view>
    </van-fixed>
</template>

<script setup>
import { computed, useSlots, watchEffect, ref } from 'vue'
import { isNumber } from '../utils'

const props = defineProps({
    price: Number,
    decimalLength: { type: [Number, String], default: 2 },
    label: { type: String, default: '合计:' },
    suffixLabel: String,
    textAlign: { type: String, validator: (value) => ['left', 'right'].includes(value) },
    buttonText: String,
    buttonType: { type: String, default: 'danger' },
    buttonColor: String,
    tip: String,
    tipIcon: String,
    currency: { type: String, default: '￥' },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    safeAreaInsetBottom: { type: Boolean, default: true },
    placeholder: { type: Boolean, default: false },
    fixed: { type: Boolean, default: true },
})
const emits = defineEmits(['submit'])

const slots = useSlots()

const integer = ref(0)
const decimal = ref()

watchEffect(() => {
    const [_integet = '', _decimal = ''] = (props.price / 100).toFixed(+props.decimalLength).split('.')
    integer.value = _integet
    decimal.value = props.decimalLength ? `.${_decimal}` : ''
})

const hasTipIcon = computed(() => props.tipIcon)
const hasTip = computed(() => props.tip || slots.tip)
const hasPrice = computed(() => isNumber(props.price))
const textStyles = computed(() => {
    const { textAlign } = props
    const style = {}

    if (textAlign) {
        let justifyContent

        switch (textAlign) {
            case 'left':
                justifyContent = 'flex-start'
                break
            case 'right':
                justifyContent = 'flex-end'
                break
        }

        style.justifyContent = justifyContent
    }

    return style
})

function handleSubmit(e) {
    emits('submit', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
