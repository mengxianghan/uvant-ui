<template>
    <van-overlay
        :show="show"
        :z-index="curZIndex"
        :duration="duration"
        @click="onClickOverlay"></van-overlay>
    <div
        :class="[
            'van-popup',
            {
                [`van-popup--${position}`]: position,
                'van-popup--round': round,
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
                    'van-popup__close-icon van-haptics-feedback',
                    {
                        [`van-popup__close-icon--${closeIconPosition}`]: closeIconPosition,
                    },
                ]"
                @click="onClickCloseIcon">
                <van-icon
                    :class-prefix="iconPrefix"
                    :name="closeIcon"></van-icon>
            </view>
        </template>
    </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { isDef } from '../utils'
import { useCSSAnimation, useGlobalZIndex } from '../composables'
import { isEmpty } from 'lodash-es'

const props = defineProps({
    overlay: { type: Boolean, default: true },
    position: {
        type: String,
        default: 'center',
        validator: (value) => ['center', 'top', 'bottom', 'right', 'left'].includes(value),
    },
    overlayClass: [String, Array, Object],
    overlayStyle: Object,
    duration: { type: [Number, String], default: 0.3 },
    zIndex: [Number, String],
    round: { type: Boolean, default: false },
    closeOnPopustate: { type: Boolean, default: false },
    closeOnClickOverlay: { type: Boolean, default: true },
    closeable: { type: Boolean, default: false },
    closeIcon: { type: String, default: 'cross' },
    closeIconPosition: {
        type: String,
        default: 'top-right',
        validator: (value) => ['top-right', 'top-left', 'bottom-left', 'bottom-right'].includes(value),
    },
    beforeClose: { type: Function, default: () => true },
    iconPrefix: String,
    transition: String,
    transitionAppear: { type: Boolean, default: false },
    safeAreaInsetTop: { type: Boolean, default: false },
    safeAreaInsetBottom: { type: Boolean, default: false },
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
    styles: animationStyles,
    classes: animationClasses,
    open: animationOpen,
    close: animationClose,
    onAnimationstart,
    onAnimationend,
} = useCSSAnimation({
    name: 'van-fade',
    onAfterEnter: () => {
        emits('opened')
    },
    onAfterLeave: () => {
        emits('closed')
    },
})

const curZIndex = computed(() => (!isEmpty(props.zIndex) ? +props.zIndex : useGlobalZIndex()))
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
    (val) => (val ? open() : close())
)

onMounted(() => {
    if (show.value) {
        open()
    }
})

function open() {
    animationOpen({
        zIndex: curZIndex.value,
    })
    emits('open')
    show.value = true
}

function close() {
    animationClose()
    emits('close')
    show.value = false
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
