<template>
    <view
        :class="bem()"
        :style="styles"
        @click="onClick">
        <view
            :class="[
                bem('content', {
                    [parent.props.direction]: parent.props.direction,
                    center: parent.props.center,
                    square: parent.props.square,
                    reverse: parent.props.reverse,
                    clickable: parent.props.clickable,
                    surround: parent.props.border && parent.props.gutter,
                }),
                { 'van-hairline': parent.props.border },
            ]"
            :style="contentStyles">
            <slot>
                <view :class="bem('icon')">
                    <vc-badge
                        :dot="dot"
                        :badge="badge"
                        :badge-props="badgeProps">
                        <slot name="icon">
                            <van-icon
                                :name="icon"
                                :class-prefix="iconPrefix"
                                :color="iconColor"></van-icon>
                        </slot>
                    </vc-badge>
                </view>
                <view :class="bem('text')">
                    <slot name="text">{{ text }}</slot>
                </view>
            </slot>
        </view>
    </view>
</template>

<script>
export default {
    options: { virtualHost: true },
}
</script>

<script setup>
import { computed } from 'vue'
import { addUnit, createNamespace, numericProp } from '../utils'
import { useParent } from '../composables'

defineProps({
    text: String,
    icon: String,
    iconPrefix: String,
    iconColor: String,
    dot: Boolean,
    badge: numericProp,
    badgeProps: Object,
})
const emits = defineEmits(['click'])

const { parent, index } = useParent('van-grid')
const { bem } = createNamespace('grid-item')

const styles = computed(() => {
    const { square, gutter, columnNum } = parent.props
    const percent = `${100 / +columnNum}%`
    const style = {
        flexBasis: percent,
    }

    if (square) {
        style.paddingTop = percent
    } else if (gutter) {
        const gutterValue = addUnit(gutter)
        style.paddingRight = gutterValue

        if (index.value >= +columnNum) {
            style.marginTop = gutterValue
        }
    }

    return style
})
const contentStyles = computed(() => {
    const { square, gutter } = parent.props

    if (square && gutter) {
        const gutterValue = addUnit(gutter)
        return {
            right: gutterValue,
            bottom: gutterValue,
            height: 'auto',
        }
    }

    return {}
})

function onClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
