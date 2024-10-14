<template>
    <view
        class="pb-8"
        :style="{ height: '300vh' }">
        <demo-block title="基础用法">
            <van-sticky
                position="top"
                :page-scroll="onPageScroll">
                <van-button type="primary">基础用法</van-button>
            </van-sticky>
        </demo-block>

        <demo-block title="吸顶距离">
            <van-sticky
                :offset="50"
                :page-scroll="onPageScroll">
                <van-button type="primary">吸顶距离</van-button>
            </van-sticky>
        </demo-block>

        <demo-block title="指定容器">
            <view
                class="h-40 bg-white"
                id="container">
                <van-sticky
                    :container="container"
                    :page-scroll="onPageScroll">
                    <view class="text-right">
                        <van-button type="warning">指定容器</van-button>
                    </view>
                </van-sticky>
            </view>
        </demo-block>

        <demo-block title="吸低距离">
            <view class="h-screen"></view>
            <van-sticky
                :offset="50"
                position="bottom"
                :page-scroll="onPageScroll">
                <view class="text-center">
                    <van-button type="primary">吸低距离</van-button>
                </view>
            </van-sticky>
        </demo-block>
    </view>
</template>

<script setup>
import { onPageScroll } from '@dcloudio/uni-app'

console.log(uni.getSystemInfoSync())

const container = () => uni.createSelectorQuery().select('#container')
</script>

<style lang="scss" scoped></style>
