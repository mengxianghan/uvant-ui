<template>
    <template v-if="position">
        <vc-placeholder
            :disabled="!placeholder"
            :custom-style="cpCustomStyle"
            :custom-class="customClass">
            <slot></slot>
        </vc-placeholder>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>

<script setup>
import { computed } from 'vue'
import { getSystemInfoSync, addUnit } from '../utils'

const props = defineProps({
    placeholder: { type: Boolean, default: true },
    position: {
        type: [String, Boolean],
        default: 'bottom',
        validator: (value) => [false, 'top', 'bottom'].includes(value),
    },
    offset: { type: [Number, String], default: 0 },
    zIndex: { type: [Number, String], default: 99 },
    safeArea: { type: Boolean, default: true },
    customClass: { type: [String, Object], default: '' },
})

const cpCustomStyle = computed(() => {
    const { position, offset, zIndex, safeArea } = props
    const { windowTop, windowBottom, safeArea: _safeArea } = getSystemInfoSync()

    if (!position) {
        return
    }

    const style = {
        zIndex,
        position: 'fixed',
        [`${position}`]: `calc(${addUnit(offset)} + ${addUnit(position === 'top' ? windowTop : windowBottom)})`,
        [`padding-${position}`]: safeArea ? _safeArea[position] : '',
        ['left']: 0,
        ['right']: 0,
    }

    return style
})
</script>

<style lang="scss" scoped></style>
