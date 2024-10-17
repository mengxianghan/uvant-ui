<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-cell-group inset>
                <van-cell
                    title="展示弹出层"
                    is-link
                    @click="show = true" />
            </van-cell-group>
            <van-popup v-model:show="show">
                <view class="p-16 bg-white">内容</view>
            </van-popup>
        </demo-block>

        <demo-block title="弹出位置">
            <van-grid clickable>
                <van-grid-item
                    icon="arrow-up"
                    text="顶部弹出"
                    @click="showTop = true"></van-grid-item>
                <van-grid-item
                    icon="arrow-down"
                    text="底部弹出"
                    @click="showBottom = true"></van-grid-item>
                <van-grid-item
                    icon="arrow-left"
                    text="左侧弹出"
                    @click="showLeft = true"></van-grid-item>
                <van-grid-item
                    icon="arrow"
                    text="右侧弹出"
                    @click="showRight = true"></van-grid-item>
            </van-grid>
            <van-popup
                v-model:show="showTop"
                position="top">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showBottom"
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showLeft"
                position="left">
                <view class="h-screen w-28 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showRight"
                position="right">
                <view class="h-screen w-28 bg-white"></view>
            </van-popup>
        </demo-block>

        <demo-block
            title="关闭图标"
            :card="false">
            <van-cell-group inset>
                <van-cell
                    title="关闭图标"
                    is-link
                    @click="showIcon = true" />
                <van-cell
                    title="自定义图标"
                    is-link
                    @click="showIconCustom = true" />
                <van-cell
                    title="图标位置"
                    is-link
                    @click="showIconPosition = true" />
            </van-cell-group>
            <van-popup
                v-model:show="showClose"
                closeable
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showCustomClose"
                closeable
                close-icon="close"
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showIconPosition"
                closeable
                close-icon-position="top-left"
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showIcon = ref(false)
const showIconCustom = ref(false)
const showIconPosition = ref(false)
</script>

<style lang="scss" scoped></style>
