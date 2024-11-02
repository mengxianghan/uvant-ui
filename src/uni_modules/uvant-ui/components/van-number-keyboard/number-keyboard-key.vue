<template>
    <view
        :class="bem('wrapper', { wider })"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd">
        <view
            :class="
                bem([
                    color,
                    {
                        large,
                        active,
                        delete: type === 'delete',
                    },
                ])
            ">
            <template v-if="loading">
                <view :class="bem('loading-icon')">
                    <van-loading></van-loading>
                </view>
            </template>

            <slot>
                <template v-if="isDef(text)">{{ text }}</template>
                <template v-else-if="type === 'delete'"></template>
                <template v-else-if="type === 'extra'"></template>
            </slot>
        </view>
    </view>
</template>

<script setup>
import { createNamespace, isDef, numericProp, preventDefault } from '../utils'
import { ref, useSlots } from 'vue'
import { useTouch } from '../composables'

const props = defineProps({
    type: String,
    text: numericProp,
    color: String,
    wider: Boolean,
    large: Boolean,
    loading: Boolean,
})
const emits = defineEmits(['press'])

const slots = useSlots()
const touch = useTouch()
const { bem } = createNamespace('key')

const active = ref(false)

const onTouchStart = (event) => {
    touch.start(event)
    active.value = true
}

const onTouchMove = (event) => {
    touch.move(event)

    if (touch.direction.value) {
        active.value = false
    }
}

const onTouchEnd = (event) => {
    if (active.value) {
        if (!slots.default) {
            preventDefault(event)
        }
        active.value = false
        emits('press', props.text, props.type)
    }
}
</script>

<style lang="scss">
@import './style.scss';
</style>
