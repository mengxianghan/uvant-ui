<template>
    <template v-if="show">
        <view
            :class="
                bem({
                    [type]: true,
                    plain,
                    round,
                    mark,
                    [size]: size,
                })
            "
            :style="{
                background: props.color && !props.plain ? props.color : '',
                color: props.plain ? props.color : props.textColor || props.color,
            }"
            @click="onClick">
            <slot></slot>
            <template v-if="closeable">
                <view
                    :class="bem('close')"
                    @click.stop="onClose">
                    <van-icon name="cross"></van-icon>
                </view>
            </template>
        </view>
    </template>
</template>

<script setup>
import { createNamespace, makeStringProp, truthProp } from '../utils'

const props = defineProps({
    type: makeStringProp('default'),
    size: String,
    color: String,
    show: truthProp,
    plain: Boolean,
    round: Boolean,
    mark: Boolean,
    textColor: makeStringProp('white'),
    closeable: Boolean,
})

const emits = defineEmits(['click', 'close'])
const { bem } = createNamespace('tag')

function onClick(e) {
    emits('click', e)
}

function onClose(e) {
    emits('close', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
