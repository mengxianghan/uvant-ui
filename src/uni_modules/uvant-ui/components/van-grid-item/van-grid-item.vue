<template>
    <view
        class="van-grid-item"
        :style="styles"
        @click="handleClick">
        <view
            :class="['van-grid-item__content', classNames]"
            :style="contentStyles">
            <slot>
                <view class="van-grid-item__icon">
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
                <view class="van-grid-item__text">
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
import { addUnit } from '../utils'
import { useParent } from '../composables'

defineProps({
    text: String,
    icon: String,
    iconPrefix: String,
    iconColor: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
})
const emits = defineEmits(['click'])

const { parent, index } = useParent('van-grid')

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
const classNames = computed(() => {
    const { center, border, square, gutter, reverse, direction, clickable } = parent.props

    return {
        [`van-grid-item__content--${direction}`]: direction,
        'van-grid-item__content--center': center,
        'van-grid-item__content--square': square,
        'van-grid-item__content--reverse': reverse,
        'van-grid-item__content--clickable': clickable,
        'van-grid-item__content--surround': border && gutter,
        'van-hairline': border,
    }
})

function handleClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
