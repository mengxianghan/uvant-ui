<template>
    <view
        :class="[
            'van-radio',
            {
                'van-radio--disabled': disabled,
                'van-radio--label-disabled': labelDisabled,
                [`van-radio--${direction}`]: direction,
            },
        ]"
        @click="handleClick">
        <view
            :class="[
                'van-radio__icon',
                {
                    [`van-radio__icon--${computedShape}`]: computedShape,
                    'van-radio__icon--disabled': disabled,
                    'van-radio__icon--checked': checked(),
                },
            ]"
            :style="{
                fontSize: addUnit(computedIconSize),
            }">
            <slot name="icon">
                <template v-if="computedShape === 'dot'">
                    <view class="van-radio__icon--dot"></view>
                </template>
                <template v-else>
                    <view
                        class="van-radio__icon--default"
                        :style="iconStyles">
                        <van-icon name="success"></van-icon>
                    </view>
                </template>
            </slot>
        </view>
        <template v-if="slots.default">
            <view
                :class="[
                    'van-radio__label',
                    {
                        [`van-radio__label--${labelPosition}`]: labelPosition,
                        'van-radio__label--disabled': disabled,
                    },
                ]"
                @click="handleLabel">
                <slot></slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, watch, useSlots } from 'vue'
import { useParent } from '../composables'
import { addUnit } from '../utils'

const props = defineProps({
    name: [String, Number],
    shape: { type: String, validator: (value) => ['round', 'square', 'dot'].includes(value) },
    disabled: { type: Boolean, default: false },
    labelDisabled: { type: Boolean, default: false },
    labelPosition: { type: String, validator: (value) => ['left', 'right'].includes(value) },
    iconSize: [String, Number],
    checkedColor: String,
    bindGroup: { type: Boolean, default: true },
})
const modelValue = defineModel({ type: [String, Number] })
const emits = defineEmits(['click', 'toggle'])

const { parent } = useParent('van-radio')
const slots = useSlots()

const disabled = computed(() => {
    if (parent && props.bindGroup) {
        return getParentProp('disabled') || props.disabled
    }

    return props.disabled
})

const direction = computed(() => getParentProp('direction'))
const computedShape = computed(() => {
    return props.shape || getParentProp('shape') || 'round'
})
const iconStyles = computed(() => {
    const checkedColor = props.checkedColor || getParentProp('checkedColor')

    if (checkedColor && checked() && !disabled.value) {
        return {
            borderColor: checkedColor,
            backgroundColor: checkedColor,
        }
    }
    return null
})
const computedIconSize = computed(() => props.iconSize || getParentProp('iconSize'))

watch(
    () => modelValue.value,
    (value) => {
        emits('change', value)
    }
)

function getParentProp(name) {
    if (parent && props.bindGroup) {
        return parent.props[name]
    }
}

function handleClick(event) {
    if (!disabled.value) {
        toggle()
    }
    emits('click', event)
}

function handleLabel(e) {
    if (props.labelDisabled) {
        e.stopPropagation()
    }
}

function checked() {
    const value = parent ? parent.props.modelValue : props.modelValue
    return value === props.name
}

function toggle() {
    if (parent) {
        parent.updateValue(props.name)
    } else {
        modelValue.value = props.name
    }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
