<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <view class="flex flex-wrap gap-4">
                <van-badge :content="5">
                    <view class="child"></view>
                </van-badge>
                <van-badge :content="10">
                    <view class="child"></view>
                </van-badge>
                <van-badge content="Hot">
                    <view class="child"></view>
                </van-badge>
                <van-badge dot>
                    <view class="child"></view>
                </van-badge>
            </view>
        </demo-block>

        <demo-block title="最大值">
            <view class="flex flex-wrap gap-4">
                <van-badge
                    :content="20"
                    max="9">
                    <view class="child"></view>
                </van-badge>
                <van-badge
                    :content="50"
                    max="20">
                    <view class="child"></view>
                </van-badge>
                <van-badge
                    :content="200"
                    max="99">
                    <view class="child"></view>
                </van-badge>
            </view>
        </demo-block>

        <demo-block title="自定义颜色">
            <view class="flex flex-wrap gap-4">
                <van-badge
                    :content="5"
                    color="#1989fa">
                    <view class="child"></view>
                </van-badge>
                <van-badge
                    :content="10"
                    color="#1989fa">
                    <view class="child"></view>
                </van-badge>
                <van-badge
                    dot
                    color="#1989fa">
                    <view class="child"></view>
                </van-badge>
            </view>
        </demo-block>

        <demo-block title="自定义徽标内容">
            <view class="flex flex-wrap gap-4">
                <van-badge>
                    <view class="child"></view>
                    <template #content>
                        <van-icon name="success" />
                    </template>
                </van-badge>
                <van-badge>
                    <view class="child"></view>
                    <template #content>
                        <van-icon name="cross" />
                    </template>
                </van-badge>
                <van-badge>
                    <view class="child"></view>
                    <template #content>
                        <van-icon name="down" />
                    </template>
                </van-badge>
            </view>
        </demo-block>

        <demo-block title="独立展示">
            <view class="flex flex-wrap gap-4">
                <van-badge :content="20" />

                <van-badge
                    :content="200"
                    max="99" />
            </view>
        </demo-block>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.child {
    width: 40px;
    height: 40px;
    background: #f2f3f5;
    border-radius: 4px;
}
</style>
