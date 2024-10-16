<template>
    <vc-badge
        :dot="dot"
        :badge="badge"
        :badge-props="badgeProps">
        <view
            :class="classNames"
            :style="styles"
            @click="handleClick">
            <template v-if="isImage">
                <image
                    class="van-icon__image"
                    :style="getSizeStyle(size)"
                    :src="name" />
            </template>
        </view>
    </vc-badge>
</template>

<script setup>
import { computed } from 'vue'
import { addUnit, getSizeStyle } from '../utils'

const props = defineProps({
    name: String,
    dot: { type: Boolean, default: false },
    badge: [Number, String],
    badgeProps: Object,
    color: String,
    size: String,
    classPrefix: { type: String, default: 'van-icon' },
})
const emits = defineEmits(['click'])

const isImage = computed(() => props.name?.includes('/'))
const classNames = computed(() => ({
    [`${props.classPrefix}`]: true,
    [`${props.classPrefix}-${props.name}`]: !isImage.value && !!props.name,
}))
const styles = computed(() => ({
    color: props.color || '',
    fontSize: props.size ? addUnit(props.size) : '',
}))

function handleClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
