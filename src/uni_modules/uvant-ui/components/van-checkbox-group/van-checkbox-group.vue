<template>
    <view
        :class="[
            'van-checkbox-group',
            {
                [`van-checkbox-group--${direction}`]: direction,
            },
        ]">
        <slot></slot>
    </view>
</template>

<script setup>
import { watch } from 'vue'
import { useChildren } from '../composables'
import { defaultTo } from 'lodash-es'

const props = defineProps({
    disabled: { type: Boolean, default: false },
    max: { type: [Number, String], default: 0 },
    direction: { type: String, validator: (value) => ['vertical', 'horizontal'].includes(value) },
    iconSize: [Number, String],
    checkedColor: String,
    shape: { type: String, validator: (value) => ['round', 'square'].includes(value) },
})
const modelValue = defineModel({ type: Array, default: () => [] })
const emits = defineEmits(['change'])

const { children, linkChildren } = useChildren('van-checkbox')

watch(
    () => modelValue.value,
    (value) => {
        emits('change', value)
    }
)

function updateValue(value) {
    modelValue.value = value
}

function toggleAll(options = {}) {
    if (typeof options === 'boolean') {
        options = { checked: options }
    }

    const { checked, skipDisabled } = options

    const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
            return false
        }
        if (item.props.disabled && skipDisabled) {
            return item.exposed.checked
        }
        return defaultTo(checked, !item.exposed.checked)
    })

    const names = checkedChildren.map((item) => item.props.name)
    updateValue(names)
}

defineExpose({ toggleAll })

linkChildren({ props, updateValue, modelValue })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
