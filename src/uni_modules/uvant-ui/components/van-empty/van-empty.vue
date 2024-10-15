<template>
    <view class="van-empty">
        <view
            class="van-empty__image"
            :style="cpImageStyle">
            <slot name="image">
                <image
                    class="van-empty__image-img"
                    :src="cpImageSrc"
                    mode="aspectFit" />
            </slot>
        </view>
        <template v-if="cpHasDescription">
            <view class="van-empty__description">
                <slot name="description">{{ description }}</slot>
            </view>
        </template>
        <template v-if="slots.default">
            <view class="van-empty__bottom">
                <slot></slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { useSlots, computed } from 'vue'
import { get, isEmpty } from 'lodash-es'
import { getSizeStyle } from '../utils'

const props = defineProps({
    image: {
        type: String,
        default: 'default',
    },
    imageSize: [Number, String, Array],
    description: String,
})

const slots = useSlots()

const PRESET_IMAGES = {
    error: 'https://img01.yzcdn.cn/vant/empty-image-error.png',
    search: 'https://img01.yzcdn.cn/vant/empty-image-search.png',
    network: 'https://img01.yzcdn.cn/vant/empty-image-network.png',
    default: 'https://img01.yzcdn.cn/vant/empty-image-default.png',
}

const cpImageSrc = computed(() => get(PRESET_IMAGES, props.image, props.image))
const cpImageStyle = computed(() => getSizeStyle(props.imageSize))
const cpHasDescription = computed(() => !isEmpty(props.description) || slots.description)
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
