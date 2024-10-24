<template>
    <view
        :class="[
            'van-checkbox',
            {
                'van-checkbox--disabled': disabled,
                'van-checkbox--label-disabled': labelDisabled,
                [`van-checkbox--${direction}`]: direction,
            },
        ]"
        @click="handleClick">
        <view
            :class="[
                'van-checkbox__icon',
                {
                    [`van-checkbox__icon--${computedShape}`]: computedShape,
                    'van-checkbox__icon--disabled': disabled,
                    'van-checkbox__icon--checked': checked,
                    'van-checkbox__icon--indeterminate': indeterminate,
                },
            ]"
            :style="{
                fontSize: addUnit(computedIconSize),
            }">
            <slot name="icon">
                <view
                    class="van-checkbox__icon-default"
                    :style="iconStyles">
                    <van-icon :name="indeterminate ? 'minus' : 'success'"></van-icon>
                </view>
            </slot>
        </view>
        <template v-if="slots.default">
            <view
                :class="[
                    'van-checkbox__label',
                    {
                        [`van-checkbox__label--${labelPosition}`]: labelPosition,
                        'van-checkbox__label--disabled': disabled,
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
    name: [Number, String],
    shape: { type: String, validator: (value) => ['round', 'square'].includes(value) },
    disabled: { type: Boolean, default: false },
    labelDisabled: { type: Boolean, default: false },
    labelPosition: String,
    iconSize: [Number, String],
    checkedColor: String,
    bindGroup: { type: Boolean, default: true },
    indeterminate: { type: Boolean, default: false },
})
const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['change', 'click', 'toggle'])

const { parent } = useParent('van-checkbox')
const slots = useSlots()

const disabled = computed(() => {
    if (parent && props.bindGroup) {
        const disabled = getParentProp('disabled') || props.disabled

        if (props.role === 'checkbox') {
            const checkedCount = getParentProp('modelValue').length
            const max = getParentProp('max')
            const overlimit = max && checkedCount >= +max

            return disabled || (overlimit && !props.checked)
        }

        return disabled
    }

    return props.disabled
})
const checked = computed(() => {
    if (parent && props.bindGroup) {
        return parent.modelValue.value.indexOf(props.name) !== -1
    }
    return !!modelValue.value
})
const direction = computed(() => getParentProp('direction'))
const computedShape = computed(() => {
    return props.shape || getParentProp('shape') || 'round'
})
const iconStyles = computed(() => {
    const checkedColor = props.checkedColor || getParentProp('checkedColor')

    if (checkedColor && checked.value && !disabled.value) {
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
        if (props.indeterminate === null) emits('change', value)
    }
)

function getParentProp(name) {
    if (parent && props.bindGroup) {
        return parent.props[name]
    }
}

function setParentValue(checked) {
    const { name } = props
    const { max } = parent?.props || {}
    const value = parent.modelValue.value.slice()

    if (checked) {
        const overlimit = max && value.length >= +max

        if (!overlimit && !value.includes(name)) {
            value.push(name)

            if (props.bindGroup) {
                parent?.updateValue(value)
            }
        }
    } else {
        const index = value.indexOf(name)

        if (index !== -1) {
            value.splice(index, 1)

            if (props.bindGroup) {
                parent?.updateValue(value)
            }
        }
    }
}

function toggle(newValue = !checked.value) {
    if (parent && props.bindGroup) {
        setParentValue(newValue)
    } else {
        modelValue.value = newValue
    }

    if (props.indeterminate !== null) emits('change', newValue)
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

defineExpose({
    toggle,
    checked,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
