<template>
    <template v-if="!disabled">
        <view
            :class="[placeholderSelector, cpClass]"
            :style="customStyle">
            <slot></slot>
        </view>
        <view :style="cpPlaceholderStyle"></view>
    </template>
    <template v-else>
        <view
            :class="cpClass"
            :style="customStyle">
            <slot></slot>
        </view>
    </template>
</template>

<script setup>
import { computed, ref, getCurrentInstance, onMounted, onUpdated } from 'vue'
import { addUnit, getRect } from '../utils'
import { uniqueId } from 'lodash-es'

const props = defineProps({
    disabled: { type: Boolean, default: false },
    customStyle: [String, Object],
    customClass: [String, Object, Array],
})

const instance = getCurrentInstance()
const placeholderSelector = ref(uniqueId('van-placeholder-'))
const height = ref(0)

const cpPlaceholderStyle = computed(() => {
    return {
        height: addUnit(height.value),
    }
})
const cpClass = computed(() => props.customClass)

onMounted(() => {
    initialize()
})

onUpdated(() => {
    initialize()
})

function initialize() {
    if (props.disabled) return

    getRect(instance.proxy, `.${placeholderSelector.value}`).then((data) => {
        console.log(data)
        if (!data) return
        height.value = data.height
    })
}
</script>

<style lang="scss" scoped></style>
