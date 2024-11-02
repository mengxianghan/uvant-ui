<template>
    <view
        v-if="initialized"
        :class="[bem(), customClass, classes]"
        :style="normalizeStyle([styles, customStyle])"
        @click="onClick"
        @touchmove.stop="onTouchmove">
        <slot></slot>
    </view>
</template>

<script setup>
import { createNamespace, makeNumberProp, makeStringProp, truthProp, preventDefault } from '../utils'
import { useTransition } from '../composables'
import { normalizeStyle } from 'vue'

const props = defineProps({
    customStyle: [String, Object],
    customClass: [String, Object, Array],
    duration: makeNumberProp(300),
    name: makeStringProp('van-fade'),
    show: Boolean,
    lockScroll: truthProp,
    destroyOnClose: Boolean,
})
const emits = defineEmits([
    'beforeEnter',
    'enter',
    'afterEnter',
    'beforeLeave',
    'leave',
    'afterLeave',
    'click',
    'touchmove',
])

const { initialized, classes, styles } = useTransition(props, { emit: emits })
const { bem } = createNamespace('transition')

function onClick(event) {
    emits('click', event)
}

function onTouchmove(event) {
    if (props.lockScroll) {
        preventDefault(event, true)
    }
    emits('touchmove', event)
}
</script>

<script>
export default {
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared',
    },
}
</script>

<style lang="scss">
@import './style.scss';
</style>
