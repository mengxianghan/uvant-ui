<template>
    <view
        :class="
            bem({
                active: isActive,
            })
        "
        :style="styles"
        @click="onClick">
        <view :class="bem('icon')">
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
        <view :class="bem('text')">
            <slot></slot>
        </view>
    </view>
</template>

<script setup>
import { computed } from 'vue'
import { useParent } from '../composables'
import { createNamespace, numericProp } from '../utils'

const props = defineProps({
    name: numericProp,
    icon: String,
    iconPrefix: String,
    dot: Boolean,
    badge: numericProp,
    badgeProps: Object,
})

const { parent, index } = useParent('van-tabbar')
const { bem } = createNamespace('tabbar-item')

const key = computed(() => props.name || index.value)
const isActive = computed(() => parent.active.value === key.value)
const styles = computed(() => ({
    color: parent.props.activeColor && isActive.value ? parent.props.activeColor : parent.props.inactiveColor,
}))

function onClick() {
    const { name } = props
    parent.onChange(name || index.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
