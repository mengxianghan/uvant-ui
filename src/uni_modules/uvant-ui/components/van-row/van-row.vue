<template>
    <view
        class="van-row"
        :class="{
            [`van-row--justify-${justify}`]: justify,
            [`van-row--align-${align}`]: align,
            'van-row--nowrap': !wrap,
        }"
        @click="handleClick">
        <slot></slot>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useChildren } from '../hooks'

const props = defineProps({
    gutter: [Number, String, Array],
    justify: {
        type: String,
        validator: (value) => ['start', 'end', 'center', 'space-around', 'space-between'].includes(value),
    },
    align: { type: String, validator: (value) => ['top', 'center', 'bottom'].includes(value) },
    wrap: { type: Boolean, default: true },
})
const emits = defineEmits(['click'])

const { children, linkChildren } = useChildren('van-row')

const cpGroups = computed(() => {
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

const cpSpaces = computed(() => {
    let gutter = 0
    if (Array.isArray(props.gutter)) {
        gutter = Number(props.gutter[0]) || 0
    } else {
        gutter = Number(props.gutter)
    }
    const spaces = []

    if (!gutter) {
        return spaces
    }

    cpGroups.value.forEach((group) => {
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

const cpVerticalSpaces = computed(() => {
    const { gutter } = props
    const spaces = []
    if (Array.isArray(gutter) && gutter.length > 1) {
        const bottom = Number(gutter[1]) || 0
        if (bottom <= 0) {
            return spaces
        }
        cpGroups.value.forEach((group, index) => {
            if (index === cpGroups.value.length - 1) return
            group.forEach(() => {
                spaces.push({ bottom })
            })
        })
    }
    return spaces
})

function handleClick(e) {
    emits('click', e)
}

linkChildren({ spaces: cpSpaces, verticalSpaces: cpVerticalSpaces })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
