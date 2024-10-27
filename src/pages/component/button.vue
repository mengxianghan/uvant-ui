<template>
    <view class="pb-8">
        <demo-block title="按钮类型">
            <view class="flex flex-wrap gap-2">
                <van-button type="primary">主要按钮</van-button>
                <van-button type="success">成功按钮</van-button>
                <van-button type="default">默认按钮</van-button>
                <van-button type="danger">危险按钮</van-button>
                <van-button type="warning">警告按钮</van-button>
            </view>
        </demo-block>

        <demo-block title="朴素按钮">
            <view class="flex flex-wrap gap-2">
                <van-button
                    plain
                    type="primary">
                    朴素按钮
                </van-button>
                <van-button
                    plain
                    type="success">
                    朴素按钮
                </van-button>
            </view>
        </demo-block>

        <demo-block title="细边框">
            <view class="flex flex-wrap gap-2">
                <van-button
                    plain
                    hairline
                    type="primary">
                    细边框按钮
                </van-button>
                <van-button
                    plain
                    hairline
                    type="success">
                    细边框按钮
                </van-button>
            </view>
        </demo-block>

        <demo-block title="禁用状态">
            <view class="flex flex-wrap gap-2">
                <van-button
                    disabled
                    type="primary"
                    >禁用状态</van-button
                >
                <van-button
                    disabled
                    type="success"
                    >禁用状态</van-button
                >
            </view>
        </demo-block>

        <demo-block title="加载状态">
            <view class="flex flex-wrap gap-2">
                <van-button
                    loading
                    type="primary" />
                <van-button
                    loading
                    type="primary"
                    loading-type="spinner" />
                <van-button
                    loading
                    type="success"
                    loading-text="加载中..." />
            </view>
        </demo-block>

        <demo-block title="按钮形状">
            <view class="flex flex-wrap gap-2">
                <van-button
                    square
                    type="primary"
                    >方形按钮</van-button
                >
                <van-button
                    round
                    type="success"
                    >圆形按钮</van-button
                >
            </view>
        </demo-block>

        <demo-block title="图标按钮">
            <view class="flex flex-wrap gap-2">
                <van-button
                    icon="plus"
                    type="primary" />
                <van-button
                    icon="plus"
                    type="primary"
                    >按钮</van-button
                >
                <van-button
                    plain
                    :icon="cdnURL('user-active.png')"
                    type="primary">
                    按钮
                </van-button>
            </view>
        </demo-block>

        <demo-block title="按钮尺寸">
            <view class="flex flex-wrap gap-2">
                <van-button
                    type="primary"
                    size="large"
                    >大号按钮</van-button
                >
                <van-button
                    type="primary"
                    size="normal"
                    >普通按钮</van-button
                >
                <van-button
                    type="primary"
                    size="small"
                    >小型按钮</van-button
                >
                <van-button
                    type="primary"
                    size="mini"
                    >迷你按钮</van-button
                >
            </view>
        </demo-block>

        <demo-block title="块级元素">
            <van-button
                type="primary"
                block>
                块级元素
            </van-button>
        </demo-block>

        <demo-block title="自定义颜色">
            <view class="flex flex-wrap gap-2">
                <van-button color="#7232dd">单色按钮</van-button>
                <van-button
                    color="#7232dd"
                    plain
                    >单色按钮</van-button
                >
                <van-button color="linear-gradient(to right, #ff6034, #ee0a24)"> 渐变色按钮 </van-button>
            </view>
        </demo-block>
    </view>
</template>

<script setup>
import { cdnURL } from '@/utils'
</script>

<style lang="scss" scoped></style>
