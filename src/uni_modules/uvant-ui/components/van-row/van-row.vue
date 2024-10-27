<template>
    <view
        :class="
            bem({
                [`justify-${justify}`]: justify,
                [`align-${align}`]: align,
                nowrap: !wrap,
            })
        "
        @click="onClick">
        <slot></slot>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useChildren } from '../composables'
import { isArray } from 'lodash-es'
import { createNamespace, truthProp } from '../utils'

const props = defineProps({
    gutter: [Number, String, Array],
    justify: String,
    align: String,
    wrap: truthProp,
})
const emits = defineEmits(['click'])

const { children, linkChildren } = useChildren('van-row')
const { bem } = createNamespace('row')

const groups = computed(() => {
    const groups = [[]]

    let totalSpan = 0
    children.forEach((child, index) => {
        totalSpan += Number(child.span)

        if (totalSpan > 24) {
            groups.push([index])
            totalSpan -= 24
        } else {
            groups[groups.length - 1].push(index)
        }
    })

    return groups
})

const spaces = computed(() => {
    let gutter = 0
    if (isArray(props.gutter)) {
        gutter = Number(props.gutter[0]) || 0
    } else {
        gutter = Number(props.gutter)
    }
    const spaces = []

    if (!gutter) {
        return spaces
    }

    groups.value.forEach((group) => {
        const averagePadding = (gutter * (group.length - 1)) / group.length

        group.forEach((item, index) => {
            if (index === 0) {
                spaces.push({ right: averagePadding })
            } else {
                const left = gutter - spaces[item - 1].right
                const right = averagePadding - left
                spaces.push({ left, right })
            }
        })
    })

    return spaces
})

const verticalSpaces = computed(() => {
    const { gutter } = props
    const spaces = []
    if (isArray(gutter) && gutter.length > 1) {
        const bottom = Number(gutter[1]) || 0
        if (bottom <= 0) {
            return spaces
        }
        groups.value.forEach((group, index) => {
            if (index === groups.value.length - 1) return
            group.forEach(() => {
                spaces.push({ bottom })
            })
        })
    }
    return spaces
})

function onClick(e) {
    emits('click', e)
}

linkChildren({ spaces, verticalSpaces })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
