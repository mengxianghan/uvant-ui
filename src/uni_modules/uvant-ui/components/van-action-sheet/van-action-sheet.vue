<template>
    <van-popup
        v-model:show="show"
        :z-index="zIndex"
        :overlay="overlay"
        :duration="duration"
        :lock-scroll="lockScroll"
        :before-close="beforeClose"
        :overlay-style="overlayStyle"
        :overlay-class="overlayClass"
        :close-on-click-overlay="closeOnClickOverlay"
        :custom-class="bem()"
        safe-area-inset-bottom
        round
        position="bottom">
        <!--header-->
        <template v-if="title">
            <view :class="bem('header')">
                {{ title }}
                <template v-if="closeable">
                    <view :class="[bem('close'), HAPTICS_FEEDBACK]">
                        <van-icon
                            :name="closeIcon"
                            @click="onCancel"></van-icon>
                    </view>
                </template>
            </view>
        </template>
        <!--description-->
        <template v-if="description || slots.description">
            <view :class="bem('description')">
                <slot name="description">{{ description }}</slot>
            </view>
        </template>
        <!--content-->
        <view :class="bem('content')">
            <view
                v-for="(action, index) in actions"
                :key="index"
                :class="[bem('item', { loading: action.loading, disabled: action.disabled }), action.className]"
                @click="onClick(action, index)">
                <template v-if="action.icon">
                    <view :class="bem('item-icon')">
                        <van-icon :name="action.icon"></van-icon>
                    </view>
                </template>
                <template v-if="action.loading">
                    <view :class="bem('loading-icon')">
                        <van-loading></van-loading>
                    </view>
                </template>
                <view :class="bem('name')">{{ action.name }}</view>
                <template v-if="action.subname">
                    <view :class="bem('subname')">{{ action.subname }}</view>
                </template>
            </view>
            <slot></slot>
        </view>
        <!--cancel-->
        <template v-if="slots.cancel || cancelText">
            <view :class="bem('gap')"></view>
            <view
                :class="bem('cancel')"
                @click="onCancel">
                <slot name="cancel">{{ cancelText }}</slot>
            </view>
        </template>
    </van-popup>
</template>

<script setup lang="ts">
import { createNamespace, truthProp, makeArrayProp, makeStringProp, numericProp, unknownProp } from '../utils'
import { nextTick, useSlots } from 'vue'

const props = defineProps({
    zIndex: numericProp,
    overlay: truthProp,
    duration: numericProp,
    lockScroll: truthProp,
    beforeClose: Function,
    overlayStyle: Object,
    overlayClass: unknownProp,
    closeOnClickOverlay: truthProp,
    title: String,
    round: truthProp,
    actions: makeArrayProp(),
    closeIcon: makeStringProp('cross'),
    closeable: truthProp,
    cancelText: String,
    description: String,
    closeOnPopstate: truthProp,
    closeOnClickAction: Boolean,
    safeAreaInsetBottom: truthProp,
})
const emits = defineEmits(['select', 'cancel'])
const show = defineModel('show', { type: Boolean, default: false })
const slots = useSlots()

const { bem } = createNamespace('action-sheet')

function updateShow(_show) {
    show.value = _show
}

function onCancel() {
    updateShow(false)
    emits('cancel')
}

function onClick(action, index) {
    if (action.disabled || action.loading) {
        return
    }

    if (action.callback) {
        action.callback()
    }

    if (props.closeOnClickAction) {
        updateShow(false)
    }

    nextTick(() => {
        emits('select', action, index)
    })
}
</script>

<script lang="ts">
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
