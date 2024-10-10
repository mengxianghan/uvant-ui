<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :body-style="{ padding: 0 }">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                :formatter="formatter" />
        </demo-block>

        <demo-block
            title="事件监听"
            :body-style="{ padding: 0 }">
            <van-search
                v-model="value"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="onCancel" />
        </demo-block>

        <demo-block
            title="搜索框内容对齐"
            :body-style="{ padding: 0 }">
            <van-search
                v-model="value"
                placeholder="请输入搜索关键词"
                input-align="center" />
        </demo-block>

        <demo-block
            title="禁用搜索框"
            :body-style="{ padding: 0 }">
            <van-search
                v-model="value"
                disabled
                placeholder="请输入搜索关键词" />
        </demo-block>

        <demo-block
            title="自定义背景色"
            :body-style="{ padding: 0 }">
            <van-search
                v-model="value"
                shape="round"
                background="#4fc08d"
                placeholder="请输入搜索关键词" />
        </demo-block>

        <demo-block
            title="自定义按钮"
            :body-style="{ padding: 0 }">
            <van-search
                v-model="value"
                show-action
                label="地址"
                placeholder="请输入搜索关键词"
                @search="onSearch">
                <template #action>
                    <div @click="onClickButton">搜索</div>
                </template>
            </van-search>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('')

const onSearch = (val) => uni.showToast({ title: val, icon: 'none' })
const onCancel = () => uni.showToast({ title: '取消' })
const formatter = (val) => val.replace(/\d/g, '')
</script>

<style lang="scss" scoped></style>
