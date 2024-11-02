<template>
    <view>
        <van-overlay
            :show="show"
            :z-index="computedZIndex"
            :duration="duration"
            :lock-scroll="lockScroll"
            :custom-style="overlayStyle"
            :custom-class="overlayClass"
            :destroy-on-close="destroyOnClose"
            @click="onClickOverlay"></van-overlay>
        <van-transition
            :show="show"
            :custom-class="[
                bem({
                    [position]: position,
                    round,
                }),
                {
                    'van-safe-area-top': safeAreaInsetTop,
                    'van-safe-area-bottom': safeAreaInsetBottom,
                },
            ]"
            :custom-style="normalizeStyle([customStyle, { zIndex: computedZIndex }])"
            :name="computedPosition"
            :destroy-on-close="destroyOnClose"
            @enter="onEnter"
            @after-enter="onAfterEnter"
            @leave="onLeave"
            @after-leave="onAfterLeave">
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
        </van-transition>
    </view>
</template>

<script setup>
import { computed, watch, onMounted, normalizeStyle } from 'vue'
import { isDef, createNamespace, truthProp, makeStringProp, numericProp, makeNumberProp } from '../utils'
import { useGlobalZIndex } from '../composables'

const props = defineProps({
    overlay: truthProp,
    position: makeStringProp('center'),
    overlayClass: [String, Array, Object],
    overlayStyle: Object,
    duration: makeNumberProp(300),
    zIndex: numericProp,
    round: Boolean,
    lockScroll: truthProp,
    closeOnClickOverlay: truthProp,
    closeable: Boolean,
    closeIcon: makeStringProp('cross'),
    closeIconPosition: makeStringProp('top-right'),
    beforeClose: { type: Function, default: () => true },
    iconPrefix: String,
    transition: String,
    safeAreaInsetTop: Boolean,
    safeAreaInsetBottom: Boolean,
    customClass: [String, Array, Object],
    customStyle: [String, Object],
    destroyOnClose: Boolean,
})
const show = defineModel('show', { type: Boolean, default: false })
const emits = defineEmits(['open', 'close', 'opened', 'closed', 'keydown', 'clickOverlay', 'clickCloseIcon'])

const { bem } = createNamespace('popup')

const computedZIndex = computed(() => (isDef(props.zIndex) ? +props.zIndex : useGlobalZIndex()))
const computedPosition = computed(() => {
    const obj = {
        center: 'van-fade',
        top: 'van-slide-down',
        bottom: 'van-slide-up',
        left: 'van-slide-left',
        right: 'van-slide-right',
    }
    return obj[props.position] || 'van-fade'
})

watch(
    () => show.value,
    (val, oval) => {
        if (val === oval) return

        val ? open() : close()
    }
)

onMounted(() => {
    if (show.value) {
        open()
    }
})

function open() {
    show.value = true
}

function close() {
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

function onEnter(evt) {
    emits('open', evt)
}

function onAfterEnter(evt) {
    emits('opened', evt)
}

function onLeave(evt) {
    emits('close', evt)
}

function onAfterLeave(evt) {
    emits('closed', evt)
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
