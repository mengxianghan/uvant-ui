<template>
    <div
        class="van-image"
        :class="{
            'van-image--round': round,
        }"
        :style="{
            width: !isEmpty(width) ? addUnit(width) : '',
            height: !isEmpty(height) ? addUnit(height) : '',
        }"
        @click="handleClick">
        <image
            :src="src"
            :mode="fit"
            :lazy-load="lazyLoad"
            :alt="alt"
            :webp="webp"
            class="van-image__img"
            @error="onError"
            @load="onLoad" />

        <template v-if="loading">
            <div class="van-image__loading">
                <slot name="loading">
                    <view class="van-image__loading-icon">
                        <van-icon
                            :name="loadingIcon"
                            :size="iconSize"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </slot>
            </div>
        </template>

        <template v-if="error.value && props.showError">
            <div class="van-image__error">
                <slot name="error">
                    <view class="van-image__error-icon">
                        <van-icon
                            :name="errorIcon"
                            :size="iconSize"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </slot>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { isEmpty, addUnit } from '../utils'

const props = defineProps({
    src: String,
    fit: {
        type: String,
        defualt: 'scaleToFill',
        validator: (value) =>
            [
                'scaleToFill',
                'aspectFit',
                'aspectFill',
                'widthFix',
                'heightFix',
                'top',
                'bottom',
                'center',
                'left',
                'right',
                'top left',
                'top right',
                'bottom left',
                'bottom right',
            ].includes(value),
    },
    alt: String,
    width: [Number, String],
    height: [Number, String],
    radius: [Number, String],
    round: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    lazyLoad: { type: Boolean, default: false },
    showError: { type: Boolean, default: true },
    showLoading: { type: Boolean, default: true },
    errorIcon: { type: String, default: 'photo-fail' },
    loadingIcon: { type: String, default: 'photo' },
    iconSize: [Number, String],
    iconPrefix: String,
    webp: { type: Boolean, default: false },
})
const emits = defineEmits(['click', 'load', 'error'])

const loading = ref(true)
const error = ref(false)

function handleClick(e) {
    emits('click', e)
}

function onLoad(e) {
    loading.value = false
    error.value = false
    emits('load', e)
}

function onError(e) {
    loading.value = false
    error.value = true
    emits('error', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
