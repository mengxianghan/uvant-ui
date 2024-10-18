<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-cell-group inset>
                <van-cell
                    title="展示弹出层"
                    is-link
                    @click="showBasic = true" />
            </van-cell-group>
            <van-popup v-model:show="showBasic">
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
                    @click="showCloseIcon = true" />
                <van-cell
                    title="自定义图标"
                    is-link
                    @click="showCustomCloseIcon = true" />
                <van-cell
                    title="图标位置"
                    is-link
                    @click="showCustomIconPosition = true" />
            </van-cell-group>
            <van-popup
                v-model:show="showCloseIcon"
                closeable
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showCustomCloseIcon"
                closeable
                close-icon="close"
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showCustomIconPosition"
                closeable
                close-icon-position="top-left"
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
        </demo-block>

        <demo-block
            title="圆角弹窗"
            :card="false">
            <van-cell-group inset>
                <van-cell
                    title="圆角弹窗（居中）"
                    is-link
                    @click="showRoundCornerCenter = true" />
                <van-cell
                    title="圆角弹窗（底部）"
                    is-link
                    @click="showRoundCornerBottom = true" />
            </van-cell-group>
            <van-popup
                v-model:show="showRoundCornerCenter"
                round>
                <view class="w-40 h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showRoundCornerBottom"
                round
                position="bottom">
                <view class="h-40 bg-white"></view>
            </van-popup>
        </demo-block>

        <demo-block
            title="事件监听"
            :card="false">
            <van-cell-group inset>
                <van-cell
                    title="监听点击事件"
                    is-link
                    @click="showClickEvents = true" />
                <van-cell
                    title="监听显示事件"
                    is-link
                    @click="showDisplayEvents = true" />
            </van-cell-group>
            <van-popup
                v-model:show="showClickEvents"
                position="bottom"
                closeable
                @click-overlay="showToast('click-overlay')"
                @click-close-icon="showToast('click-close-icon')">
                <view class="h-40 bg-white"></view>
            </van-popup>
            <van-popup
                v-model:show="showDisplayEvents"
                round
                position="bottom"
                @open="showToast('open')"
                @opened="showToast('opened')"
                @close="showToast('close')"
                @closed="showToast('closed')">
                <view class="h-40 bg-white"></view>
            </van-popup>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const showBasic = ref(false)
const showTop = ref(false)
const showBottom = ref(false)
const showLeft = ref(false)
const showRight = ref(false)
const showCloseIcon = ref(false)
const showRoundCornerBottom = ref(false)
const showRoundCornerCenter = ref(false)
const showCustomCloseIcon = ref(false)
const showCustomIconPosition = ref(false)
const showClickEvents = ref(false)
const showDisplayEvents = ref(false)

const showToast = (title) => uni.showToast({ title, icon: 'none' })
</script>

<style lang="scss" scoped></style>
