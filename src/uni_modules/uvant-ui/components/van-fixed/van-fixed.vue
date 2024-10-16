<template>
    <template v-if="position">
        <vc-placeholder
            :disabled="!placeholder"
            :custom-style="customStyles"
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

const customStyles = computed(() => {
    const { windowTop, windowBottom, safeArea } = getSystemInfoSync()

    if (!props.position) {
        return
    }

    const style = {
        zIndex: props.zIndex,
        position: 'fixed',
        [`${props.position}`]: `calc(${addUnit(props.offset)} + ${addUnit(props.position === 'top' ? windowTop : windowBottom)})`,
        [`padding-${props.position}`]: props.safeArea ? safeArea[props.position] : '',
        ['left']: 0,
        ['right']: 0,
    }

    return style
})
</script>

<style lang="scss" scoped></style>
