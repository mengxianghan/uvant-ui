<template>
    <view
        :class="[
            bem({
                round,
                autosize: computedAutosize,
            }),
            imageSelector,
        ]"
        :style="styles"
        @click="onClick">
        <image
            :src="src"
            :mode="fit"
            :lazy-load="lazyLoad"
            :alt="alt"
            :webp="webp"
            :class="bem('img')"
            @error="onError"
            @load="onLoad" />

        <template v-if="loading && showLoading">
            <view :class="bem('loading')">
                <slot name="loading">
                    <view :class="bem('loading-icon')">
                        <van-icon
                            :name="loadingIcon"
                            :size="iconSize"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </slot>
            </view>
        </template>

        <template v-if="error && showError">
            <view :class="bem('error')">
                <slot name="error">
                    <view :class="bem('error-icon')">
                        <van-icon
                            :name="errorIcon"
                            :size="iconSize"
                            :class-prefix="iconPrefix"></van-icon>
                    </view>
                </slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, reactive, ref } from 'vue'
import {
    getSizeStyle,
    addUnit,
    createNamespace,
    makeStringProp,
    numericProp,
    truthProp,
    createUniqueSelector,
    getRect,
} from '../utils'

const props = defineProps({
    src: String,
    fit: makeStringProp('scaleToFill'),
    alt: String,
    width: numericProp,
    height: numericProp,
    radius: numericProp,
    round: Boolean,
    block: Boolean,
    lazyLoad: Boolean,
    showError: truthProp,
    showLoading: truthProp,
    errorIcon: makeStringProp('photo-fail'),
    loadingIcon: makeStringProp('photo'),
    iconSize: numericProp,
    iconPrefix: String,
    webp: Boolean,
    aspectRatio: Number,
    autosize: Boolean,
})
const emits = defineEmits(['click', 'load', 'error'])

const { name, bem } = createNamespace('image')
const [imageSelector] = createUniqueSelector(name)
const instance = getCurrentInstance()

const loading = ref(true)
const error = ref(false)
const imageRect = reactive({
    width: 0,
    height: 0,
    originWidth: 0,
    originHeight: 0,
})

const styles = computed(() => {
    let style = {
        borderRadius: addUnit(props.radius),
    }

    // 如果设置了宽 & 高
    if (props.width && props.height) {
        style = {
            ...style,
            ...getSizeStyle([props.width, props.height]),
        }

        return style
    }

    if (props.autosize) return style

    if (props.aspectRatio) {
        if (props.width) {
            style.width = addUnit(props.width)
            style.height = `calc(${addUnit(props.width)} / ${props.aspectRatio})`
            return style
        }

        if (props.height) {
            style.width = `calc(${addUnit(props.height)} * ${props.aspectRatio})`
            style.height = addUnit(props.height)
            return style
        }

        if (imageRect.width) {
            style.width = addUnit(imageRect.width)
            style.height = addUnit(imageRect.width / props.aspectRatio)
            return style
        }

        if (imageRect.height) {
            style.width = addUnit(imageRect.height * props.aspectRatio)
            style.height = addUnit(imageRect.height)
            return style
        }
    } else {
        if (props.width) {
            style.width = addUnit(props.width)
            style.height = `calc(${addUnit(props.width)} * ${imageRect.originHeight} / ${imageRect.originWidth})`
            return style
        }

        if (props.height) {
            style.width = `calc(${addUnit(props.height)} * ${imageRect.originWidth} / ${imageRect.originHeight})`
            style.height = addUnit(props.height)
            return style
        }

        if (imageRect.width) {
            style.width = addUnit(imageRect.width)
            style.height = addUnit((imageRect.width * imageRect.originHeight) / imageRect.originWidth)
            return style
        }

        if (imageRect.height) {
            style.width = addUnit((imageRect.originWidth * imageRect.height) / imageRect.originHeight)
            style.height = addUnit(imageRect.height)
            return style
        }
    }

    return style
})
const computedAutosize = computed(() => props.autosize && !props.width && !props.height)

onMounted(() => {
    getImageRect()
})

function getImageRect() {
    if (imageRect.width || imageRect.height) return
    nextTick(() => {
        getRect(instance.proxy, `.${imageSelector}`).then((data) => {
            imageRect.width = data.width
            imageRect.height = data.height
        })
    })
}

function onClick(e) {
    emits('click', e)
}

function onLoad(e) {
    const { width, height } = e.detail
    loading.value = false
    error.value = false
    imageRect.originWidth = width
    imageRect.originHeight = height
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
