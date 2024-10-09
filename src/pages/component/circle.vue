<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-circle
                v-model="currentRate"
                :speed="100"
                :text="text" />
        </demo-block>

        <demo-block title="样式定制">
            <view class="flex flex-wrap gap-4">
                <van-circle
                    v-model="currentRate"
                    :stroke-width="6"
                    text="宽度定制" />

                <van-circle
                    v-model="currentRate"
                    layer-color="#ebedf0"
                    text="颜色定制" />

                <van-circle
                    v-model="currentRate"
                    :color="gradientColor"
                    text="渐变色" />

                <van-circle
                    v-model="currentRate"
                    :clockwise="false"
                    text="逆时针方向" />

                <van-circle
                    v-model="currentRate"
                    :size="120"
                    text="大小定制" />
            </view>
        </demo-block>

        <view class="pt-8 px-4 flex gap-2">
            <van-button
                type="primary"
                size="small"
                @click="handleClick(10)"
                >增加</van-button
            >
            <van-button
                type="danger"
                size="small"
                @click="handleClick(-10)"
                >减少</van-button
            >
        </view>

        <demo-block title="起始位置">
            <view class="flex flex-wrap gap-4">
                <van-circle
                    v-model="currentRate"
                    text="左侧"
                    start-position="left" />
                <van-circle
                    v-model="currentRate"
                    text="右侧"
                    start-position="right" />
                <van-circle
                    v-model="currentRate"
                    text="底部"
                    start-position="bottom" />
            </view>
        </demo-block>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const gradientColor = {
    '0%': '#3fecff',
    '100%': '#6149f6',
}
const currentRate = ref(70)

const text = computed(() => currentRate.value.toFixed(0) + '%')

function handleClick(value) {
    if ((value > 0) & (currentRate.value === 100)) {
        return
    }
    if ((value < 0) & (currentRate.value === 0)) {
        return
    }
    currentRate.value += value
}
</script>

<style lang="scss" scoped></style>
