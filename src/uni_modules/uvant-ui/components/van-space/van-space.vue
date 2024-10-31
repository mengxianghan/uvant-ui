<template>
    <view
        :class="
            bem({
                [direction]: direction,
                [`align-${align}`]: align,
                wrap,
                fill,
            })
        "
        :style="styles">
        <slot></slot>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit, createNamespace, isDef, makeStringProp } from '../utils'

const props = defineProps({
    direction: makeStringProp('horizontal'),
    size: { type: [Number, String, Array], default: 8 },
    align: String,
    wrap: Boolean,
    fill: Boolean,
})

const { bem } = createNamespace('space')

const styles = computed(() => {
    const style = {}

    if (!isDef(props.size)) return

    if (Array.isArray(props.size)) {
        const [x = 0, y = 0] = props.size
        style.gap = `${addUnit(x)} ${addUnit(y)}`
    } else {
        style.gap = addUnit(props.size)
    }

    return style
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
