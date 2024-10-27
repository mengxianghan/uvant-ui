<template>
    <div
        :class="
            bem({
                select: index === parent.getActive(),
                disabled: disabled,
            })
        "
        @click="onClick">
        <!-- van-badge__wrapper -->
        <div :class="bem('text')">
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
import { createNamespace, numericProp } from '../utils'

const props = defineProps({
    title: String,
    dot: Boolean,
    badge: numericProp,
    badgeProps: Object,
    disabled: Boolean,
})
const emits = defineEmits(['click'])

const { parent, index } = useParent('sidebar')
const { bem } = createNamespace('sidebar-item')

function onClick() {
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
