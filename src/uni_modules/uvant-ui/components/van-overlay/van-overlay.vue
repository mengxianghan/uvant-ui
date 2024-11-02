<template>
    <van-transition
        :show="show"
        :custom-class="[bem(), customClass]"
        :custom-style="normalizeStyle([customStyle, { zIndex: computedZIndex }])"
        :duration="duration"
        :z-index="computedZIndex"
        :lock-scroll="lockScroll"
        :destroy-on-close="destroyOnClose"
        @click="onClick">
        <slot></slot>
    </van-transition>
</template>

<script setup>
import { createNamespace, makeNumberProp, numericProp, truthProp, isDef } from '../utils'
import { useGlobalZIndex } from '../composables'
import { computed, normalizeStyle } from 'vue'

const props = defineProps({
    show: Boolean,
    zIndex: numericProp,
    duration: makeNumberProp(300),
    lockScroll: truthProp,
    customClass: [String, Object, Array],
    customStyle: [String, Object],
    destroyOnClose: Boolean,
})
const emits = defineEmits(['click'])

const { bem } = createNamespace('overlay')

const computedZIndex = computed(() => (isDef(props.zIndex) ? +props.zIndex : useGlobalZIndex()))

function onClick() {
    emits('click')
}
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared',
    },
})
</script>

<style lang="scss">
@import './style.scss';
</style>
