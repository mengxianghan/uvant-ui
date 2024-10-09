<template>
    <icon-wrap
        :show="cpHasBadge"
        :dot="dot"
        :badge="badge"
        :badge-props="badgeProps">
        <text
            :class="cpClass"
            :style="cpStyle"
            @click="handleClick">
            <template v-if="cpIsImage">
                <image
                    class="van-icon__image"
                    :style="cpImageStyle"
                    :src="name" />
            </template>
        </text>
    </icon-wrap>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit, isDef, isObject } from '../utils'
import IconWrap from './icon-wrap.vue'

const props = defineProps({
    name: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
    color: String,
    size: String,
    classPrefix: { type: String, default: 'van-icon' },
})
const emits = defineEmits(['click'])

const cpHasBadge = computed(() => {
    const { dot, badge, badgeProps } = props
    return dot || isDef(badge) || isObject(badgeProps)
})
const cpIsImage = computed(() => props.name?.includes('/'))
const cpClass = computed(() => {
    const { classPrefix, name } = props
    const classNames = {
        [`${classPrefix}`]: true,
    }

    if (!cpIsImage.value) {
        classNames[`${classPrefix}-${name}`] = !!name
    }

    return classNames
})
const cpStyle = computed(() => {
    const { color, size } = props
    const style = {}

    if (color) {
        style.color = color
    }

    if (size) {
        style.fontSize = addUnit(size)
    }

    return style
})
const cpImageStyle = computed(() => {
    const { size } = props
    return {
        width: addUnit(size),
        height: addUnit(size),
    }
})

function handleClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
