<template>
    <template v-if="show">
        <view :style="cpStyle">
            <slot></slot>
        </view>
    </template>
    <template v-else>
        <slot></slot>
    </template>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit } from '../utils'

const props = defineProps({
    show: { type: Boolean, default: false },
    height: { type: [String, Number], default: 0 },
})

const cpStyle = computed(() => {
    return {
        height: addUnit(props.height),
    }
})
</script>

<style lang="scss" scoped></style>
