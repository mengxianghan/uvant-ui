<template>
    <view class="pb-8">
        <van-cell-group inset>
            <van-cell
                title="基础用法"
                center>
                <template #value>
                    <van-stepper v-model="value" />
                </template>
            </van-cell>
            <van-cell
                title="步长设置"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        step="2" />
                </template>
            </van-cell>
            <van-cell
                title="限制输入范围"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        min="5"
                        max="8" />
                </template>
            </van-cell>
            <van-cell
                title="限制输入整数"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        integer />
                </template>
            </van-cell>
            <van-cell
                title="禁用状态"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        disabled />
                </template>
            </van-cell>
            <van-cell
                title="禁用输入框"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        disable-input />
                </template>
            </van-cell>
            <van-cell
                title="固定小数位数"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        :decimal-length="1" />
                </template>
            </van-cell>
            <van-cell
                title="自定义大小"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        input-width="40px"
                        button-size="32px" />
                </template>
            </van-cell>
            <van-cell
                title="异步变更"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        :before-change="beforeChange" />
                </template>
            </van-cell>
            <van-cell
                title="圆角风格"
                center>
                <template #value>
                    <van-stepper
                        v-model="value"
                        theme="round"
                        button-size="22"
                        disable-input />
                </template>
            </van-cell>
        </van-cell-group>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(1)

const beforeChange = (value) => {
    uni.showLoading({ title: value, forbidClick: true })

    return new Promise((resolve) => {
        setTimeout(() => {
            uni.hideLoading()
            // 在 resolve 函数中返回 true 或 false
            resolve(true)
        }, 500)
    })
}
</script>

<style lang="scss" scoped></style>
