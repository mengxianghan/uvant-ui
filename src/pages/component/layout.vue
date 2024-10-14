<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-row>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
            </van-row>

            <van-row>
                <van-col span="4">span: 4</van-col>
                <van-col
                    span="10"
                    offset="4">
                    offset: 4, span: 10
                </van-col>
            </van-row>

            <van-row>
                <van-col
                    offset="12"
                    span="12">
                    offset: 12, span: 12
                </van-col>
            </van-row>
        </demo-block>

        <demo-block title="在列元素之间增加间距">
            <van-row gutter="20">
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
            </van-row>
        </demo-block>

        <demo-block title="垂直间距">
            <!-- 设置垂直间距 -->
            <van-row :gutter="[20, 20]">
                <van-col span="12">span: 12</van-col>
                <van-col span="12">span: 12</van-col>
                <van-col span="12">span: 12</van-col>
                <van-col span="12">span: 12</van-col>
            </van-row>
        </demo-block>

        <demo-block title="对齐方式">
            <!-- 居中 -->
            <van-row justify="center">
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
            </van-row>

            <!-- 右对齐 -->
            <van-row justify="end">
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
            </van-row>

            <!-- 两端对齐 -->
            <van-row justify="space-between">
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
            </van-row>

            <!-- 每个元素的两侧间隔相等 -->
            <van-row justify="space-around">
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
                <van-col span="6">span: 6</van-col>
            </van-row>
        </demo-block>

        <demo-block title="自动换行">
            <van-row>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
                <van-col span="8">span: 8</van-col>
            </van-row>
        </demo-block>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped>
:deep(.van-col) {
    margin-bottom: 10px;
    color: var(--van-white);
    font-size: 13px;
    line-height: 30px;
    text-align: center;
    background-clip: content-box;
    color: #fff;

    &:nth-child(odd) {
        background-color: #39a9ed;
    }

    &:nth-child(even) {
        background-color: #66c6f2;
    }
}
</style>
