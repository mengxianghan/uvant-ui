<template>
    <template v-if="placeholder">
        <view
            :id="placeholderId"
            :class="cpClass"
            :style="cpStyle">
            <slot></slot>
        </view>
        <view :style="cpPlaceholderStyle"></view>
    </template>
    <template v-else>
        <view
            :class="cpClass"
            :style="cpStyle">
            <slot></slot>
        </view>
    </template>
</template>

<script setup>
import { computed, ref, getCurrentInstance, onMounted, onUpdated } from 'vue'
import { addUnit, mergeClassNames } from '../utils'
import { uniqueId } from 'lodash-es'

const props = defineProps({
    placeholder: { type: Boolean, default: true },
    position: {
        type: [String, Boolean],
        default: false,
        validator: (value) => [false, 'top', 'bottom'].includes(value),
    },
    offset: { type: [Number, String], default: 0 },
    zIndex: { type: [Number, String], default: 99 },
    safeAreaInset: { type: Boolean, default: false },
    hasTabBar: { type: Boolean, default: false },
    hasNavigationBar: { type: Boolean, default: false },
    customClass: { type: [String, Object], default: '' },
})

const instance = getCurrentInstance()
const placeholderId = ref(uniqueId('van-placeholder-'))
const height = ref(0)

const cpClass = computed(() => {
    const { position, safeAreaInset, hasTabBar, hasNavigationBar, customClass } = props
    const classNames = {
        'van-placeholder--fixed': position,
        [`van-safe-area-${position}`]: safeAreaInset && !hasTabBar && !hasNavigationBar,
    }

    return mergeClassNames(classNames, customClass)
})
const cpStyle = computed(() => {
    const { position, offset, zIndex, hasTabBar, hasNavigationBar } = props
    const style = { zIndex }

    if (position) {
        // #ifdef H5
        if (position === 'top' && hasNavigationBar) {
            style[`${position}`] = `calc(${addUnit(offset)} + var(--window-top))`
        } else if (position === 'bottom' && hasTabBar) {
            style[`${position}`] = `calc(${addUnit(offset)} + var(--window-bottom))`
        } else {
            style[`${position}`] = addUnit(offset)
        }
        // #endif

        // #ifndef H5
        style[`${position}`] = addUnit(offset)
        // #endif
    }

    return style
})
const cpPlaceholderStyle = computed(() => {
    return {
        height: addUnit(height.value),
    }
})

onMounted(() => {
    init()
})

onUpdated(() => {
    init()
})

function init() {
    if (!props.placeholder) return

    uni.createSelectorQuery()
        .in(instance.proxy)
        .select(`#${placeholderId.value}`)
        .boundingClientRect((data) => {
            if (!data) return
            height.value = data.height
        })
        .exec()
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
