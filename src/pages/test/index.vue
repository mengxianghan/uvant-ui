<template>
    <view class="p-3">
        <input
            v-model="content"
            type="text"
            class="border border-solid border-neutral-200 px-2 py-2 rounded-md bg-white"
            @input="debounceInput" />
        <view class="mt-3">content:{{ content }}</view>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { debounce } from 'lodash-es'

const content = ref('')

const debounceInput = debounce(onInput, 100)

function formatter(value) {
    return value.replace(/\d/g, '')
}

function onInput(e) {
    content.value = formatter(e.detail.value)
}
</script>

<style lang="scss" scoped></style>
