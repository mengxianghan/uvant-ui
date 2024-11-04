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
        safe-area-inset-bottom
        round
        position="bottom">
        <template v-if="hasTitle || hasDescription">
            <!--header-->
            <view :class="bem('header')">
                <template v-if="hasTitle">
                    <view :class="bem('title')">
                        <slot name="title">{{ title }}</slot>
                    </view>
                </template>
                <template v-if="hasDescription">
                    <view :class="bem('description')">
                        <slot name="description">{{ description }}</slot>
                    </view>
                </template>
            </view>
        </template>
        <!--rows-->
        <scroll-view
            v-for="(options, optionsIndex) in computedOptions"
            :key="optionsIndex"
            :show-scrollbar="false"
            :scroll-x="true">
            <view :class="bem('options', { border: optionsIndex !== 0 })">
                <view
                    v-for="(option, index) in options"
                    :key="index"
                    :class="[bem('option'), option.className, HAPTICS_FEEDBACK]"
                    @click="onSelect(option, index)">
                    <template v-if="isImage(option.icon)">
                        <image
                            :src="option.icon"
                            :class="bem('image-icon')"></image>
                    </template>
                    <template v-else>
                        <view :class="bem('icon', { [`${option.icon}`]: option.icon })">
                            <van-icon :name="iconMap[option.icon] || option.icon"></van-icon>
                        </view>
                    </template>
                    <template v-if="option.name">
                        <view :class="bem('name')">{{ option.name }}</view>
                    </template>
                    <template v-if="option.description">
                        <view :class="bem('option-description')">{{ description }}</view>
                    </template>
                </view>
            </view>
        </scroll-view>
        <!--cancel button-->
        <template v-if="slots.cancel || cancelText">
            <view
                :class="bem('cancel')"
                @click="onCancel">
                <slot name="cancel">
                    {{ cancelText }}
                </slot>
            </view>
        </template>
    </van-popup>
</template>

<script setup>
import {
    truthProp,
    makeArrayProp,
    numericProp,
    unknownProp,
    createNamespace,
    defaultTo,
    HAPTICS_FEEDBACK,
} from '../utils'
import { useSlots, computed } from 'vue'

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
    options: makeArrayProp(),
    cancelText: String,
    description: String,
    closeOnPopstate: truthProp,
    safeAreaInsetBottom: truthProp,
})
const emits = defineEmits(['select', 'cancel'])
const show = defineModel('show', { type: Boolean })
const slots = useSlots()

const { bem, t } = createNamespace('share-sheet')
const iconMap = {
    qq: 'qq',
    link: 'link-o',
    weibo: 'weibo',
    qrcode: 'qr',
    poster: 'photo-o',
    wechat: 'wechat',
    'weapp-qrcode': 'miniprogram-o',
    'wechat-moments': 'wechat-moments',
}

const hasTitle = computed(() => slots.title || props.title)
const hasDescription = computed(() => slots.description || props.description)
const cancelText = computed(() => defaultTo(props.cancelText, t('cancel')))
const computedOptions = computed(() => (Array.isArray(props.options[0]) ? props.options : [props.options]))

function isImage(name) {
    return name?.includes('/')
}

function updateShow(_show) {
    show.value = _show
}

function onCancel() {
    updateShow(false)
    emits('cancel')
}

function onSelect(option, index) {
    emits('select', option, index)
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
