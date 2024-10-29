<template>
    <template v-if="disabled">
        <slot></slot>
    </template>
    <template v-else>
        <view
            :class="bem('placeholder')"
            :style="{ height: addUnit(height) }">
            <slot></slot>
        </view>
    </template>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUpdated } from 'vue'
import { getRect, addUnit } from '../utils'

const props = defineProps({
    disabled: Boolean,
    selector: String,
    bem: { type: Function, default: () => {} },
})

const instance = getCurrentInstance()
const height = ref(0)

onMounted(() => {
    init()
})

onUpdated(() => {
    init()
})

function init() {
    if (props.disabled || !props.selector) return

    getRect(instance.proxy, `.${props.selector}`).then((data) => {
        if (!data) return
        height.value = data.height
    })
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
