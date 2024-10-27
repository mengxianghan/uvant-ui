<template>
    <view
        :class="[
            bem({
                fixed,
            }),
            {
                'van-hairline--top-bottom': border,
                'van-safe-area-bottom': safeAreaInsetBottom,
            },
        ]">
        <slot></slot>
    </view>
</template>

<script setup>
import { useChildren } from '../composables'
import { createNamespace, truthProp, makeNumericProp } from '../utils'

const props = defineProps({
    fixed: truthProp,
    border: truthProp,
    zIndex: makeNumericProp(1),
    activeColor: String,
    inactiveColor: String,
    placeholder: Boolean,
    safeAreaInsetBottom: Boolean,
    beforeChange: { type: Function, default: () => true },
})

const modelValue = defineModel({ type: [Number, String] })
const emits = defineEmits(['change'])

const { linkChildren } = useChildren('van-tabbar')
const { bem } = createNamespace('tabbar')

async function onChange(val) {
    if (!(await props.beforeChange())) {
        return
    }
    modelValue.value = val
    emits('change', modelValue.value)
}

linkChildren({
    active: modelValue,
    props,
    onChange,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
