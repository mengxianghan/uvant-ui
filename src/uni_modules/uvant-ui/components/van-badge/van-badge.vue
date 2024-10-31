<template>
    <template v-if="hasDefault">
        <view :class="bem('wrapper')">
            <slot></slot>
            <view
                :class="classes"
                :style="styles">
                <template v-if="hasContent">
                    <slot name="content">{{ content }}</slot>
                </template>
            </view>
        </view>
    </template>
    <template v-else>
        <view
            :class="classes"
            :style="styles">
            <template v-if="hasContent">
                <slot name="content">{{ content }}</slot>
            </template>
        </view>
    </template>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { isDef, createNamespace, numericProp, truthProp, makeStringProp, isNumeric } from '../utils'

const props = defineProps({
    dot: Boolean,
    max: numericProp,
    color: String,
    offset: Array,
    content: numericProp,
    showZero: truthProp,
    position: makeStringProp('top-right'),
})
const slots = useSlots()

const { bem } = createNamespace('badge')

const hasDefault = computed(() => slots.default)
const hasContent = computed(() => {
    if (props.dot) {
        return false
    }

    if (slots.content) {
        return true
    }
    return (
        isDef(props.content) &&
        props.content !== '' &&
        (props.showZero || (props.content !== 0 && props.content !== '0'))
    )
})
const classes = computed(() =>
    bem({
        dot: props.dot,
        [props.position]: hasDefault.value,
        fixed: hasDefault.value,
    })
)
const styles = computed(() => ({
    background: props.color,
}))
const content = computed(() => {
    const { max, content } = props
    if (isDef(max) && isNumeric(content) && +content > +max) {
        return `${max}+`
    }
    return content
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
