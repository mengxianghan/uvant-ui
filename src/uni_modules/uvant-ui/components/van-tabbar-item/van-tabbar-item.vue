<template>
    <view
        class="van-tabbar-item"
        :class="cpClass"
        :style="cpStyle"
        @click="handleClick">
        <view class="van-tabbar-item__icon">
            <vc-badge
                :dot="dot"
                :badge="badge"
                :badge-props="badgeProps">
                <slot
                    name="icon"
                    :active="cpIsActive">
                    <van-icon
                        :name="icon"
                        :class-prefix="iconPrefix"></van-icon>
                </slot>
            </vc-badge>
        </view>
        <view class="van-tabbar-item__text">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useParent } from '../composables'

const props = defineProps({
    name: [Number, String],
    icon: String,
    iconPrefix: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
})

const { parent, index } = useParent('van-tabbar')

const cpKey = computed(() => {
    return props.name || index.value
})
const cpIsActive = computed(() => {
    return parent.active.value === cpKey.value
})
const cpClass = computed(() => {
    const classNames = {
        'van-tabbar-item--active': cpIsActive.value,
    }

    return classNames
})
const cpStyle = computed(() => {
    const style = {}

    if (parent.props.activeColor && cpIsActive.value) {
        style.color = parent.props.activeColor
    }

    if (parent.props.inactiveColor && !cpIsActive.value) {
        style.color = parent.props.inactiveColor
    }

    return style
})

function handleClick() {
    const { name } = props
    parent.onChange(name || index.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
