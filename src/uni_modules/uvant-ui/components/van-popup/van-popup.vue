<template>
    <van-overlay
        :show="show"
        :z-index="curZIndex"
        :duration="duration"
        :lock-scroll="lockScroll"
        @click="onClickOverlay"></van-overlay>
    <view
        :class="[
            bem({
                [position]: position,
                round,
            }),
            {
                'van-safe-area-top': safeAreaInsetTop,
                'van-safe-area-bottom': safeAreaInsetBottom,
            },
            animationClasses,
        ]"
        :style="[styles, animationStyles]"
        @animationstart="onAnimationstart"
        @animationend="onAnimationend">
        <slot></slot>

        <!-- 关闭按钮 -->
        <template v-if="closeable">
            <view
                :class="[
                    bem('close-icon', {
                        [closeIconPosition]: closeIconPosition,
                    }),
                    'van-haptics-feedback',
                ]"
                @click="onClickCloseIcon">
                <van-icon
                    :class-prefix="iconPrefix"
                    :name="closeIcon"></van-icon>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import {
    callInterceptor,
    isDef,
    createNamespace,
    truthProp,
    makeStringProp,
    makeNumericProp,
    numericProp,
} from '../utils'
import { useCSSAnimation, useGlobalZIndex } from '../composables'

const props = defineProps({
    overlay: truthProp,
    position: makeStringProp('center'),
    overlayClass: [String, Array, Object],
    overlayStyle: Object,
    duration: makeNumericProp(0.3),
    zIndex: numericProp,
    round: Boolean,
    lockScroll: truthProp,
    closeOnPopustate: Boolean,
    closeOnClickOverlay: truthProp,
    closeable: Boolean,
    closeIcon: makeStringProp('cross'),
    closeIconPosition: makeStringProp('top-right'),
    beforeClose: { type: Function, default: () => true },
    iconPrefix: String,
    transition: String,
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
})
const show = defineModel('show', { type: Boolean, default: false })
const emits = defineEmits([
    'open',
    'close',
    'opened',
    'closed',
    'keydown',
    'update:show',
    'clickOverlay',
    'clickCloseIcon',
])
const {
    visible,
    styles: animationStyles,
    classes: animationClasses,
    open: animationOpen,
    close: animationClose,
    onAnimationstart,
    onAnimationend,
} = useCSSAnimation({
    onEnter: () => {
        emits('open')
    },
    onAfterEnter: () => {
        emits('opened')
    },
    onLeave: () => {
        emits('close')
    },
    onAfterLeave: () => {
        emits('closed')
    },
})
const { bem } = createNamespace('popup')

let opened
const curZIndex = computed(() => (isDef(props.zIndex) ? +props.zIndex : useGlobalZIndex()))
const styles = computed(() => {
    const style = {}

    if (isDef(props.duration)) {
        const key = props.position === 'center' ? 'animationDuration' : 'transitionDuration'
        style[key] = `${props.duration}s`
    }

    return style
})

watch(
    () => show.value,
    (val) => {
        if (val && !opened) {
            open()
        }
        if (!val && opened) {
            close()
        }
    }
)

onMounted(() => {
    if (show.value) {
        open()
    }
})

function open() {
    if (opened) return
    opened = true
    animationOpen({
        name: `van-popup-slide-${props.position}`,
        zIndex: curZIndex.value,
    })
    emits('open')
    show.value = visible.value
}

function close() {
    if (!opened) return
    callInterceptor(props.beforeClose, {
        done() {
            opened = false
            animationClose()
            emits('close')
            show.value = visible.value
        },
    })
}

function onClickOverlay(event) {
    emits('clickOverlay', event)

    if (props.closeOnClickOverlay) {
        close()
    }
}

function onClickCloseIcon(event) {
    emits('clickCloseIcon', event)
    close()
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
