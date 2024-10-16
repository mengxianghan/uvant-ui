<template>
    <view class="bg-white h-screen">
        <van-row>
            <van-col :span="12">
                <demo-block title="基础用法">
                    <van-sidebar v-model="active">
                        <van-sidebar-item title="标签名称" />
                        <van-sidebar-item title="标签名称" />
                        <van-sidebar-item title="标签名称" />
                    </van-sidebar>
                </demo-block>
            </van-col>
            <van-col :span="12">
                <demo-block title="徽标提示">
                    <van-sidebar v-model="active">
                        <van-sidebar-item
                            title="标签名称"
                            dot />
                        <van-sidebar-item
                            title="标签名称"
                            badge="5" />
                        <van-sidebar-item title="标签名称" />
                    </van-sidebar>
                </demo-block>
            </van-col>
            <van-col :span="12">
                <demo-block title="禁用选项">
                    <van-sidebar v-model="active">
                        <van-sidebar-item title="标签名称" />
                        <van-sidebar-item
                            title="标签名称"
                            disabled />
                        <van-sidebar-item title="标签名称" />
                    </van-sidebar>
                </demo-block>
            </van-col>
            <van-col :span="12">
                <demo-block title="监听切换事件">
                    <van-sidebar
                        v-model="active"
                        @change="onChange">
                        <van-sidebar-item title="标签名 1" />
                        <van-sidebar-item title="标签名 2" />
                        <van-sidebar-item title="标签名 3" />
                    </van-sidebar>
                </demo-block>
            </van-col>
        </van-row>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const active = ref(0)

const onChange = (index) => uni.showToast({ title: `标签名 ${index + 1}`, icon: 'none' })
</script>

<style lang="scss" scoped></style>
