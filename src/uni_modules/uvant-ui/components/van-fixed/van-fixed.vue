<template>
    <template v-if="disabled">
        <slot></slot>
    </template>
    <template v-else>
        <vc-placeholder
            :disabled="!placeholder"
            :custom-style="customStyles"
            :custom-class="[
                customClass,
                {
                    'van-safe-area-bottom': safeArea && position === 'bottom',
                    'van-safe-area-top': safeArea && position === 'top',
                },
            ]">
            <slot></slot>
        </vc-placeholder>
    </template>
</template>

<script setup>
import { computed } from 'vue'
import { getSystemInfoSync, addUnit, truthProp, makeNumericProp, makeStringProp } from '../utils'

const props = defineProps({
    disabled: Boolean,
    placeholder: truthProp,
    position: makeStringProp('bottom'),
    offset: makeNumericProp(0),
    zIndex: makeNumericProp(99),
    safeArea: truthProp,
    customClass: { type: [String, Object], default: '' },
})

const customStyles = computed(() => {
    const { windowTop, windowBottom } = getSystemInfoSync()

    if (!props.position) {
        return
    }

    const style = {
        zIndex: props.zIndex,
        position: 'fixed',
        [`${props.position}`]: `calc(${addUnit(props.offset)} + ${addUnit(props.position === 'top' ? windowTop : windowBottom)})`,
        ['left']: 0,
        ['right']: 0,
    }

    return style
})
</script>

<style lang="scss" scoped></style>
