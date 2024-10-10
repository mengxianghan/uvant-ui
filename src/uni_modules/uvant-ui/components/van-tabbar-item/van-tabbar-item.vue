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
import { computed, inject, getCurrentInstance, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    name: [Number, String],
    icon: String,
    iconPrefix: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
})

const { getIndex, active, activeColor, inactiveColor, addItem, deleteItem, onChange } = inject('van-tabbar', {})
const instance = getCurrentInstance()

const cpKey = computed(() => {
    return props.name || getIndex(instance)
})
const cpIsActive = computed(() => {
    return active.value === cpKey.value
})
const cpClass = computed(() => {
    const classNames = {
        'van-tabbar-item--active': cpIsActive.value,
    }

    return classNames
})
const cpStyle = computed(() => {
    const style = {}

    if (activeColor.value && cpIsActive.value) {
        style.color = activeColor.value
    }

    if (inactiveColor.value && !cpIsActive.value) {
        style.color = inactiveColor.value
    }

    return style
})

onMounted(() => {
    addItem(instance)
})

onBeforeUnmount(() => {
    deleteItem(instance)
})

function handleClick() {
    const { name } = props
    onChange(name || getIndex(instance))
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
