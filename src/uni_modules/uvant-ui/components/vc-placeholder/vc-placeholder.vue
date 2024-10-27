<template>
    <template v-if="disabled">
        <view
            :class="[customClass]"
            :style="customStyle">
            <slot></slot>
        </view>
    </template>
    <template v-else>
        <view
            :class="[placeholderSelector, customClass]"
            :style="customStyle">
            <slot></slot>
        </view>
        <view
            :style="{
                height: addUnit(height),
            }"></view>
    </template>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, onUpdated } from 'vue'
import { addUnit, createUniqueSelector, getRect } from '../utils'

const props = defineProps({
    disabled: Boolean,
    customStyle: [String, Object],
    customClass: [String, Object, Array],
})

const instance = getCurrentInstance()
const [placeholderSelector] = createUniqueSelector('van-placeholder')
const height = ref(0)

onMounted(() => {
    initialize()
})

onUpdated(() => {
    initialize()
})

function initialize() {
    if (props.disabled) return

    getRect(instance.proxy, `.${placeholderSelector}`).then((data) => {
        if (!data) return
        height.value = data.height
    })
}
</script>

<style lang="scss" scoped></style>
