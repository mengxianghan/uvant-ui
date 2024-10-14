<template>
    <view
        class="van-tabbar"
        :class="cpClass">
        <slot></slot>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useChildren } from '../composables'

const props = defineProps({
    fixed: { type: Boolean, default: true },
    border: { type: Boolean, default: true },
    zIndex: { type: [Number, String], default: 1 },
    activeColor: String,
    inactiveColor: String,
    placeholder: { type: Boolean, default: false },
    safeAreaInsetBottom: { type: Boolean, default: false },
    beforeChange: { type: Function, default: () => true },
})

const modelValue = defineModel({ type: [Number, String] })
const emits = defineEmits(['change'])

const { linkChildren } = useChildren('van-tabbar')

const cpClass = computed(() => {
    const { fixed, border, safeAreaInsetBottom } = props
    const classNames = {
        'van-tabbar--fixed': fixed,
        'van-hairline--top-bottom': border,
        'van-safe-area-bottom': safeAreaInsetBottom,
    }

    return classNames
})

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
