<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-submit-bar
                :fixed="false"
                :price="3050"
                :safe-area-inset-bottom="false"
                button-text="提交订单"
                @submit="onSubmit" />
        </demo-block>

        <demo-block
            title="禁用状态"
            :card="false">
            <van-submit-bar
                :fixed="false"
                :price="3050"
                :safe-area-inset-bottom="false"
                disabled
                button-text="提交订单"
                tip="你的收货地址不支持配送"
                tip-icon="info-o"
                @submit="onSubmit" />
        </demo-block>

        <demo-block
            title="加载状态"
            :card="false">
            <van-submit-bar
                :fixed="false"
                :price="3050"
                :safe-area-inset-bottom="false"
                loading
                button-text="提交订单"
                @submit="onSubmit" />
        </demo-block>

        <demo-block
            title="高级用法"
            :card="false">
            <van-submit-bar
                :fixed="false"
                :price="3050"
                :safe-area-inset-bottom="false"
                button-text="提交订单"
                @submit="onSubmit">
                <van-checkbox>全选</van-checkbox>
                <template #tip>
                    你的收货地址不支持配送,
                    <text
                        class="text-blue-500"
                        @click="onClickLink">
                        修改地址
                    </text>
                </template>
            </van-submit-bar>
        </demo-block>
    </view>
</template>

<script setup>
const onSubmit = () => uni.showToast({ title: '点击按钮' })
const onClickLink = () => uni.showToast({ title: '修改地址' })
</script>

<style lang="scss" scoped></style>
