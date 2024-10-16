<template>
    <view
        class="van-tabbar-item"
        :class="{
            'van-tabbar-item--active': isActive,
        }"
        :style="cpStyle"
        @click="handleClick">
        <view class="van-tabbar-item__icon">
            <vc-badge
                :dot="dot"
                :badge="badge"
                :badge-props="badgeProps">
                <slot
                    name="icon"
                    :active="isActive">
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

const key = computed(() => props.name || index.value)
const isActive = computed(() => parent.active.value === key.value)
const cpStyle = computed(() => ({
    color: parent.props.activeColor && isActive.value ? parent.props.activeColor : parent.props.inactiveColor,
}))

function handleClick() {
    const { name } = props
    parent.onChange(name || index.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
