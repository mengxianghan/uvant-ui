<template>
    <view
        :class="[
            bem({
                first: isFirst && !isOnly,
                last: isLast && !isOnly,
                'only-one': isOnly,
                center: !isFirst && !isLast && !isOnly,
                [type]: type,
            }),
        ]">
        <van-button
            :type="type"
            :color="color"
            :icon="icon"
            :disabled="disabled"
            :loading="loading">
            <slot>{{ text }}</slot>
        </van-button>
    </view>
</template>

<script>
export default {
    options: { virtualHost: true },
}
</script>

<script setup>
import { computed } from 'vue'
import { useParent } from '../composables'
import { createNamespace } from '../utils'

defineProps({
    text: String,
    type: String,
    color: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean,
})

const { parent, index } = useParent('van-action-bar')
const { bem } = createNamespace('action-bar-button')

const isFirst = computed(() => {
    if (!parent) {
        return false
    }
    const prev = parent.children[index.value - 1]
    return !(prev && 'isButton' in prev.exposed)
})

const isLast = computed(() => {
    if (!parent) {
        return false
    }
    const next = parent.children[index.value + 1]
    return !(next && 'isButton' in next.exposed)
})

const isOnly = computed(() => parent && parent.children.filter((item) => item.exposed.isButton).length === 1)

defineExpose({ isButton: true })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
