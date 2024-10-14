<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-action-bar
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-action-bar-icon
                    icon="chat-o"
                    text="客服"
                    @click="onClickIcon" />
                <van-action-bar-icon
                    icon="cart-o"
                    text="购物车"
                    @click="onClickIcon" />
                <van-action-bar-icon
                    icon="shop-o"
                    text="店铺"
                    @click="onClickIcon" />
                <van-action-bar-button
                    type="danger"
                    text="立即购买"
                    @click="onClickButton" />
            </van-action-bar>
        </demo-block>

        <demo-block
            title="徽标提示"
            :card="false">
            <van-action-bar
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-action-bar-icon
                    icon="chat-o"
                    text="客服"
                    dot />
                <van-action-bar-icon
                    icon="cart-o"
                    text="购物车"
                    badge="5" />
                <van-action-bar-icon
                    icon="shop-o"
                    text="店铺"
                    badge="12" />
                <van-action-bar-button
                    type="warning"
                    text="加入购物车" />
                <van-action-bar-button
                    type="danger"
                    text="立即购买" />
            </van-action-bar>
        </demo-block>

        <demo-block
            title="自定义图标颜色"
            :card="false">
            <van-action-bar
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-action-bar-icon
                    icon="chat-o"
                    text="客服"
                    color="#ee0a24" />
                <van-action-bar-icon
                    icon="cart-o"
                    text="购物车" />
                <van-action-bar-icon
                    icon="star"
                    text="已收藏"
                    color="#ff5000" />
                <van-action-bar-button
                    type="warning"
                    text="加入购物车" />
                <van-action-bar-button
                    type="danger"
                    text="立即购买" />
            </van-action-bar>
        </demo-block>

        <demo-block
            title="自定义按钮颜色"
            :card="false">
            <van-action-bar :fixed="false">
                <van-action-bar-icon
                    icon="chat-o"
                    text="客服" />
                <van-action-bar-icon
                    icon="shop-o"
                    text="店铺" />
                <van-action-bar-button
                    color="#be99ff"
                    type="warning"
                    text="加入购物车" />
                <van-action-bar-button
                    color="#7232dd"
                    type="danger"
                    text="立即购买" />
            </van-action-bar>
        </demo-block>
    </view>
</template>

<script setup>
const onClickIcon = () => uni.showToast({ title: '点击图标' })
const onClickButton = () => uni.showToast({ title: '点击按钮' })
</script>

<style lang="scss" scoped></style>
