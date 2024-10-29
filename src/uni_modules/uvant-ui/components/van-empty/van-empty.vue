<template>
    <view :class="bem()">
        <view
            :class="bem('image')"
            :style="getSizeStyle(imageSize)">
            <slot name="image">
                <image
                    :class="bem('image-img')"
                    :src="imageSrc"
                    mode="aspectFit" />
            </slot>
        </view>
        <template v-if="hasDescription">
            <view :class="bem('description')">
                <slot name="description">{{ description }}</slot>
            </view>
        </template>
        <template v-if="slots.default">
            <view :class="bem('bottom')">
                <slot></slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { useSlots, computed } from 'vue'
import { getSizeStyle, isNullOrEmpty, createNamespace, makeStringProp } from '../utils'
import { get } from 'lodash-es'

const props = defineProps({
    image: makeStringProp('default'),
    imageSize: [Number, String, Array],
    description: String,
})

const slots = useSlots()
const { bem } = createNamespace('empty')

const PRESET_IMAGES = {
    error: 'https://img01.yzcdn.cn/vant/empty-image-error.png',
    search: 'https://img01.yzcdn.cn/vant/empty-image-search.png',
    network: 'https://img01.yzcdn.cn/vant/empty-image-network.png',
    default: 'https://img01.yzcdn.cn/vant/empty-image-default.png',
}

const imageSrc = computed(() => get(PRESET_IMAGES, props.image, props.image))
const hasDescription = computed(() => !isNullOrEmpty(props.description) || slots.description)
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
