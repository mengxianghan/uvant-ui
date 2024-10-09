<template>
    <template v-if="show">
        <view
            class="van-tag"
            :class="cpClass"
            :style="cpStyle"
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
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'default',
        validator: (value) => ['primary', 'success', 'danger', 'warning'].includes(value),
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

const cpClass = computed(() => {
    const { type, size, plain, round, mark } = props
    const classNames = {
        [`van-tag--${type}`]: true,
        [`van-tag--plain`]: plain,
        [`van-tag--round`]: round,
        [`van-tag--mark`]: mark,
    }

    if (size) {
        classNames[`van-tag--${size}`] = true
    }

    return classNames
})
const cpStyle = computed(() => {
    const { textColor, color, plain } = props

    const style = { color: textColor || color }

    if (color && !plain) {
        style.background = color
        style.color = textColor || color
    }

    if (plain) {
        style.color = color
    }

    return style
})

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
