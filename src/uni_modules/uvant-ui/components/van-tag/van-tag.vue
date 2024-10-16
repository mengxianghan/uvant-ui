<template>
    <template v-if="show">
        <view
            class="van-tag"
            :class="{
                [`van-tag--${type}`]: true,
                [`van-tag--plain`]: plain,
                [`van-tag--round`]: round,
                [`van-tag--mark`]: mark,
                [`van-tag--${size}`]: size,
            }"
            :style="{
                background: props.color && !props.plain ? props.color : '',
                color: props.plain ? props.color : props.textColor || props.color,
            }"
            @click="handleClick">
            <slot></slot>
            <template v-if="closeable">
                <view
                    class="van-tag__close"
                    @click.stop="handleClose">
                    <van-icon name="cross"></van-icon>
                </view>
            </template>
        </view>
    </template>
</template>

<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'default',
        validator: (value) => ['default', 'primary', 'success', 'danger', 'warning'].includes(value),
    },
    size: { type: String, validator: (value) => ['large', 'medium'].includes(value) },
    color: String,
    show: { type: Boolean, default: true },
    plain: { type: Boolean, default: false },
    round: { type: Boolean, default: false },
    mark: { type: Boolean, default: false },
    textColor: { type: String, default: 'white' },
    closeable: { type: Boolean, default: false },
})

const emits = defineEmits(['click', 'close'])

function handleClick(e) {
    emits('click', e)
}

function handleClose(e) {
    emits('close', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
