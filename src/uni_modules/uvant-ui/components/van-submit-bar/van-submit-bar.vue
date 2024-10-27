<template>
    <van-fixed
        :placeholder="placeholder"
        :position="fixed && 'bottom'"
        :safe-area="safeAreaInsetBottom">
        <view :class="bem()">
            <template v-if="hasTip">
                <view :class="bem('tip')">
                    <template v-if="hasTipIcon">
                        <view :class="bem('tip-icon')">
                            <van-icon :name="tipIcon"></van-icon>
                        </view>
                    </template>
                    <template v-if="tip">
                        <text :class="bem('tip-text')">{{ tip }}</text>
                    </template>
                    <template v-if="slots.tip">
                        <slot name="tip"></slot>
                    </template>
                </view>
            </template>
            <view :class="bem('bar')">
                <slot></slot>
                <template v-if="hasPrice">
                    <view
                        :class="bem('text')"
                        :style="textStyles">
                        <text>{{ label }}</text>
                        <view :class="bem('price')">
                            {{ currency }}<text :class="bem('price-integer')">{{ integer }}</text
                            >{{ decimal }}
                        </view>
                        <text :class="bem('suffix-label')">{{ suffixLabel }}</text>
                    </view>
                </template>

                <slot name="button">
                    <van-button
                        round
                        :class="bem('button')"
                        :disabled="disabled"
                        :border="false"
                        :type="buttonType"
                        :loading="loading"
                        :color="buttonColor"
                        @click="onSubmit">
                        {{ buttonText }}
                    </van-button>
                </slot>
            </view>
        </view>
    </van-fixed>
</template>

<script setup>
import { computed, useSlots, watchEffect, ref } from 'vue'
import { isNumber, createNamespace, makeNumericProp, makeStringProp, truthProp } from '../utils'

const props = defineProps({
    price: Number,
    decimalLength: makeNumericProp(2),
    label: makeStringProp('合计:'),
    suffixLabel: String,
    textAlign: String,
    buttonText: String,
    buttonType: makeStringProp('danger'),
    buttonColor: String,
    tip: String,
    tipIcon: String,
    currency: makeStringProp('￥'),
    disabled: Boolean,
    loading: Boolean,
    safeAreaInsetBottom: truthProp,
    placeholder: Boolean,
    fixed: truthProp,
})
const emits = defineEmits(['submit'])

const slots = useSlots()
const { bem } = createNamespace('submit-bar')

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

function onSubmit(e) {
    emits('submit', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
