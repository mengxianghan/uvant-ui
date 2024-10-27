<template>
    <view
        :class="[bem(), classes]"
        :style="[styles, animationStyles]"
        @animationstart="onAnimationstart"
        @animationend="onAnimationend"
        @click="onClick">
        <slot></slot>
    </view>
</template>

<script setup>
import { computed, watch } from 'vue'
import { getZIndexStyle, createNamespace } from '../utils'
import { useCSSAnimation } from '../composables'

const props = defineProps({
    show: Boolean,
    zIndex: [Number, String],
    duration: { type: [Number, String], default: 0.3 },
    className: String,
    lockScroll: { type: Boolean, default: true },
    lazyRender: { type: Boolean, default: true },
    customStyle: Object,
})
const emits = defineEmits(['click'])
const { bem } = createNamespace('overlay')

const {
    styles: animationStyles,
    classes,
    open,
    close,
    onAnimationstart,
    onAnimationend,
} = useCSSAnimation({ name: 'van-fade' })

const styles = computed(() => ({
    ...getZIndexStyle(props.zIndex),
    ...props.customStyle,
    animationDuration: `${props.duration}s`,
}))

watch(
    () => props.show,
    (val) => {
        if (val) {
            open({ zIndex: props.zIndex, duration: props.duration })
        } else {
            close()
        }
    }
)

function onClick() {
    emits('click')
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
