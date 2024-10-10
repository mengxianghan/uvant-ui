<template>
    <van-placeholder
        :show="placeholder"
        :height="placeholderHeight">
        <view
            class="van-tabbar"
            :class="cpClass">
            <slot></slot>
        </view>
    </van-placeholder>
</template>

<script setup>
import { computed, provide, ref } from 'vue'
import { findIndex } from 'lodash-es'
import usePlaceholder from '../hooks/usePlaceholder'

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

const { placeholderClassName, placeholderHeight } = usePlaceholder()

const itemList = ref([])

const cpClass = computed(() => {
    const { fixed, border, safeAreaInsetBottom } = props
    const classNames = {
        [`${placeholderClassName.value}`]: true,
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

function addItem(item) {
    itemList.value.push(item)
}

function getIndex(item) {
    return findIndex(itemList.value, { uid: item.uid })
}

function deleteItem(item) {
    const index = getIndex(item)
    if (index < 0) return
    itemList.value.splice(index, 1)
}

provide('van-tabbar', {
    active: computed(() => modelValue.value),
    activeColor: computed(() => props.activeColor),
    inactiveColor: computed(() => props.inactiveColor),
    getIndex,
    onChange,
    addItem,
    deleteItem,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
