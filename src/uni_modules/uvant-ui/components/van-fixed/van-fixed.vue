<template>
    <template v-if="disabled">
        <slot></slot>
    </template>
    <template v-else>
        <view
            :class="bem()"
            :style="styles">
            <vc-placeholder :disabled="!placeholder">
                <slot></slot>
            </vc-placeholder>
        </view>
    </template>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit, createNamespace, getSystemInfoSync, makeNumericProp, makeStringProp, numericProp } from '../utils'

const props = defineProps({
    disabled: Boolean,
    placeholder: Boolean,
    position: makeStringProp('bottom'),
    offset: makeNumericProp(0),
    zIndex: numericProp,
})

const { bem } = createNamespace('fixed')

const styles = computed(() => {
    const { windowTop, windowBottom } = getSystemInfoSync()

    return {
        zIndex: props.zIndex,
        [`${props.position}`]: `calc(${addUnit(props.offset)} + ${addUnit(props.position === 'top' ? windowTop : windowBottom)})`,
    }
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
