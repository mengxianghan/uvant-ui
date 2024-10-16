<template>
    <div
        class="van-sidebar-item"
        :class="{
            'van-sidebar-item--select': index === parent.getActive(),
            'van-sidebar-item--disabled': disabled,
        }"
        @click="handleClick">
        <div class="van-badge__wrapper van-sidebar-item__text">
            <vc-badge
                :dot="dot"
                :badge="badge"
                :badge-props="badgeProps">
                <slot name="title">{{ title }}</slot>
            </vc-badge>
        </div>
    </div>
</template>

<script>
export default {
    options: { virtualHost: true },
}
</script>

<script setup>
import { useParent } from '../composables'

const props = defineProps({
    title: { type: String, default: '' },
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
    disabled: { type: Boolean, default: false },
})
const emits = defineEmits(['click'])

const { parent, index } = useParent('sidebar')

function handleClick() {
    if (props.disabled) {
        return
    }

    emits('click', index.value)
    parent.setActive(index.value)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
