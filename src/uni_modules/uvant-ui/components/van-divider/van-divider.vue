<template>
    <view
        :class="[
            bem({
                dashed,
                hairline,
                vertical,
                [`content-${contentPosition}`]: !!slots.default && !vertical,
            }),
            customClass,
        ]"
        :style="customStyle">
        <template v-if="!vertical">
            <slot></slot>
        </template>
    </view>
</template>

<script setup>
import { truthProp, makeStringProp, createNamespace, unknownProp } from '../utils'
import { useSlots } from 'vue'

defineProps({
    dashed: Boolean,
    hairline: truthProp,
    vertical: Boolean,
    contentPosition: makeStringProp('center'),
    customStyle: [Object, String],
    customClass: unknownProp,
})
const slots = useSlots()

const { bem } = createNamespace('divider')
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared',
    },
})
</script>

<style lang="scss">
@import './style.scss';
</style>
