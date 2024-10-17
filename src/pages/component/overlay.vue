<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-button
                type="primary"
                text="显示遮罩层"
                @click="show = true" />
            <van-overlay
                :show="show"
                @click="show = false" />
        </demo-block>

        <demo-block title="嵌入内容">
            <van-button
                type="primary"
                text="嵌入内容"
                @click="show1 = true" />
            <van-overlay
                :show="show1"
                @click="show1 = false">
                <view class="flex items-center justify-center h-full">
                    <view class="w-32 h-32 bg-white"></view>
                </view>
            </van-overlay>
        </demo-block>

        <demo-block title="设置 z-index">
            <van-button
                type="primary"
                text="设置 z-index"
                @click="show2 = true" />
            <van-overlay
                :show="show2"
                :z-index="100"
                @click="show2 = false">
            </van-overlay>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
</script>

<style lang="scss" scoped></style>
