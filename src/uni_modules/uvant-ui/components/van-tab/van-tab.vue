<template>
    <view
        v-show="show"
        :class="bem('panel', { active, inactive: !active })"
        :style="styles">
        <slot></slot>
    </view>
</template>

<script setup>
import { createNamespace, numericProp, unknownProp, truthProp } from '../utils'
import { useParent } from '../composables'
import { computed, ref, nextTick } from 'vue'

const props = defineProps({
    dot: Boolean,
    name: numericProp,
    badge: numericProp,
    title: String,
    disabled: Boolean,
    titleClass: unknownProp,
    titleStyle: [String, Object],
    showZeroBadge: truthProp,
    icon: String,
    rightIcon: String,
})

const { bem } = createNamespace('tab')
const { parent, index } = useParent('tabs')

const inited = ref(false)

const show = computed(() => parent.props.scrollspy || parent.props.swipeable || active.value || parent.props.animated)
const styles = computed(() => {
    if (!parent.props.animated) {
        return
    }

    return {
        left: `${-100 * index.value}%`,
    }
})

const active = computed(() => {
    const isActive = getName() === parent.currentName.value

    if (isActive && !inited.value) {
        init()
    }

    return isActive
})

function init() {
    inited.value = true

    if (parent.props.lazyRender) {
        nextTick(() => {
            parent.onRendered(getName(), props.title)
        })
    }
}

function getName() {
    return props.name ?? index.value
}

defineExpose({ props })
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
