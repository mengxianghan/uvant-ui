<template>
    <view :class="bem()">
        <view :class="bem('header')">
            <!--thumb-->
            <template v-if="slots.thumb || thumb">
                <view
                    :class="bem('thumb')"
                    @click="onClickThumb">
                    <slot name="thumb">
                        <van-image
                            :custom-class="bem('thumb-img')"
                            :src="thumb"
                            fix="aspectFill"></van-image>
                    </slot>

                    <template v-if="slots.tag || tag">
                        <view :class="bem('tag')">
                            <slot name="tag">
                                <van-tag
                                    mark
                                    type="primary">
                                    {{ tag }}
                                </van-tag>
                            </slot>
                        </view>
                    </template>
                </view>
            </template>
            <view :class="bem('content', { centered })">
                <view>
                    <!--title-->
                    <slot name="title">
                        <view :class="[bem('title'), 'van-multi-ellipsis--l2']">{{ title }}</view>
                    </slot>
                    <!--desc-->
                    <slot name="desc">
                        <view :class="[bem('desc'), 'van-ellipsis']">{{ desc }}</view>
                    </slot>
                    <slot name="tags"></slot>
                </view>
                <!--bottom-->
                <template v-if="showBottom">
                    <view :class="bem('bottom')">
                        <slot name="price-top"></slot>
                        <template v-if="showPrice">
                            <view :class="bem('price')">
                                <slot name="price">
                                    <view>
                                        <text :class="bem('price-currency')">{{ currency }}</text>
                                        <text :class="bem('price-integer')">{{ integer }}</text>
                                        <template v-if="isDef(decimal)">
                                            <text>.</text><text :class="bem('price-decimal')">{{ decimal }}</text>
                                        </template>
                                    </view>
                                </slot>
                            </view>
                        </template>
                        <template v-if="showOriginPrice">
                            <view :class="bem('origin-price')">
                                <slot name="origin-price"> {{ currency }}{{ originPrice }} </slot>
                            </view>
                        </template>
                        <template v-if="showNum">
                            <view :class="bem('num')">
                                <slot name="num">x{{ num }}</slot>
                            </view>
                        </template>
                        <slot name="bottom"></slot>
                    </view>
                </template>
            </view>
        </view>
        <!--footer-->
        <template v-if="slots.footer">
            <view :class="bem('footer')"> <slot name="footer"></slot></view>
        </template>
    </view>
</template>

<script setup>
import { createNamespace, numericProp, makeStringProp, isDef } from '../utils'
import { useSlots, ref, watch, onMounted, computed } from 'vue'

const props = defineProps({
    tag: String,
    num: numericProp,
    desc: String,
    thumb: String,
    title: String,
    price: numericProp,
    centered: Boolean,
    lazyLoad: Boolean,
    currency: makeStringProp('¥'),
    thumbLink: String,
    originPrice: numericProp,
})
const emits = defineEmits(['clickThumb'])
const slots = useSlots()
const { bem } = createNamespace('card')
const integer = ref()
const decimal = ref()

watch(() => props.price, formatPrice)

const showNum = computed(() => slots.num || isDef(props.num))
const showPrice = computed(() => slots.price || isDef(props.price))
const showOriginPrice = computed(() => slots['origin-price'] || isDef(props.originPrice))
const showBottom = computed(() => showNum.value || showPrice.value || showOriginPrice.value)

onMounted(() => {
    formatPrice()
})

function onClickThumb(event) {
    emits('clickThumb', event)
}

function formatPrice() {
    const [_integer, _decimal] = props.price?.toString().split('.') || []
    integer.value = _integer
    decimal.value = _decimal
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
