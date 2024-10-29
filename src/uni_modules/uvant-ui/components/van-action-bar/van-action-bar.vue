<template>
    <vc-placeholder
        :disabled="!placeholder"
        :bem="bem"
        :selector="rootSelector">
        <view
            :class="[
                bem({ fixed }),
                rootSelector,
                {
                    'van-safe-area-bottom': safeAreaInsetBottom,
                },
            ]">
            <slot></slot>
        </view>
    </vc-placeholder>
</template>

<script setup>
import { useChildren } from '../composables'
import { createNamespace, createUniqueSelector, truthProp } from '../utils'

defineProps({
    placeholder: Boolean,
    safeAreaInsetBottom: truthProp,
    fixed: truthProp,
})

const { linkChildren } = useChildren('van-action-bar')
const { name, bem } = createNamespace('action-bar')
const [rootSelector] = createUniqueSelector(name)

linkChildren()
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
