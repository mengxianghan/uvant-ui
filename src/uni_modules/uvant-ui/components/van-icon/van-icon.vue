<template>
    <vc-badge
        :dot="dot"
        :badge="badge"
        :badge-props="badgeProps">
        <view
            :class="classes"
            :style="styles"
            @click="onClick">
            <template v-if="isImage">
                <view
                    :class="bem('image')"
                    :style="getSizeStyle(size)">
                    <van-image
                        :src="name"
                        :height="size"
                        :show-loading="false"
                        :show-error="false"></van-image>
                </view>
            </template>
        </view>
    </vc-badge>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit, getSizeStyle, createNamespace } from '../utils'

const props = defineProps({
    name: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
    color: String,
    size: [String, Number],
    classPrefix: { type: String, default: 'van-icon' },
})
const emits = defineEmits(['click'])

const { bem } = createNamespace('icon')

const isImage = computed(() => props.name?.includes('/'))
const classes = computed(() => ({
    [`${props.classPrefix}`]: props.classPrefix,
    [`${props.classPrefix}-${props.name}`]: !isImage.value && !!props.name,
}))
const styles = computed(() => ({
    color: props.color || '',
    fontSize: props.size ? addUnit(props.size) : '',
}))

function onClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
