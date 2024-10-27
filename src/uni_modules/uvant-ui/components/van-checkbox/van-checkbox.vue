<template>
    <view
        :class="
            bem({
                disabled,
                'label-disabled': labelDisabled,
                [direction]: direction,
            })
        "
        @click="onClick">
        <view
            :class="
                bem('icon', {
                    [computedShape]: computedShape,
                    disabled,
                    checked,
                    indeterminate,
                })
            "
            :style="{
                fontSize: addUnit(computedIconSize),
            }">
            <slot name="icon">
                <view
                    :class="bem('icon-default')"
                    :style="iconStyles">
                    <van-icon :name="indeterminate ? 'minus' : 'success'"></van-icon>
                </view>
            </slot>
        </view>
        <template v-if="slots.default">
            <view
                :class="
                    bem('label', {
                        [labelPosition]: labelPosition,
                        disabled,
                    })
                "
                @click="onLabelClick">
                <slot></slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, watch, useSlots } from 'vue'
import { useParent } from '../composables'
import { addUnit, createNamespace, numericProp, truthProp } from '../utils'

const props = defineProps({
    name: numericProp,
    shape: String,
    disabled: Boolean,
    labelDisabled: Boolean,
    labelPosition: String,
    iconSize: numericProp,
    checkedColor: String,
    bindGroup: truthProp,
    indeterminate: Boolean,
})
const modelValue = defineModel({ type: Boolean, default: false })
const emits = defineEmits(['change', 'click', 'toggle'])

const { parent } = useParent('van-checkbox')
const slots = useSlots()

const { bem } = createNamespace('checkbox')

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

function onClick(event) {
    if (!disabled.value) {
        toggle()
    }
    emits('click', event)
}

function onLabelClick(e) {
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
