<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :body-style="{ padding: 0 }">
            <van-submit-bar
                :fixed="false"
                :price="3050"
                button-text="提交订单"
                @submit="onSubmit" />
        </demo-block>

        <demo-block
            title="禁用状态"
            :body-style="{ padding: 0 }">
            <van-submit-bar
                :fixed="false"
                disabled
                :price="3050"
                button-text="提交订单"
                tip="你的收货地址不支持配送"
                tip-icon="info-o"
                @submit="onSubmit" />
        </demo-block>

        <demo-block
            title="加载状态"
            :body-style="{ padding: 0 }">
            <van-submit-bar
                :fixed="false"
                loading
                :price="3050"
                button-text="提交订单"
                @submit="onSubmit" />
        </demo-block>

        <demo-block
            title="高级用法"
            :body-style="{ padding: 0 }">
            <van-submit-bar
                :fixed="false"
                :price="3050"
                button-text="提交订单"
                @submit="onSubmit">
                <van-checkbox v-model="checked">全选</van-checkbox>
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
import { ref } from 'vue'

const checked = ref(false)
const onSubmit = () => uni.showToast({ title: '点击按钮' })
const onClickLink = () => uni.showToast({ title: '修改地址' })
</script>

<style lang="scss" scoped></style>
