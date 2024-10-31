<template>
    <view
        :class="
            bem({
                [direction]: direction,
            })
        ">
        <slot></slot>
    </view>
</template>

<script setup>
import { watch } from 'vue'
import { useChildren } from '../composables'
import { defaultTo } from 'lodash-es'
import { createNamespace, numericProp, makeStringProp, makeArrayProp } from '../utils'

const props = defineProps({
    max: numericProp,
    shape: makeStringProp('round'),
    disabled: Boolean,
    iconSize: numericProp,
    direction: String,
    checkedColor: String,
})
const modelValue = defineModel(makeArrayProp())
const emits = defineEmits(['change'])

const { children, linkChildren } = useChildren('van-checkbox')

const { bem } = createNamespace('checkbox-group')

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
        let _checked = item.exposed.checked

        // #ifndef H5
        _checked = item.exposed.checked.value
        // #endif

        if (item.props.disabled && skipDisabled) {
            return _checked
        }
        return defaultTo(checked, !_checked)
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
