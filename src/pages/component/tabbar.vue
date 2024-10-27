<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-tabbar
                v-model="active"
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-tabbar-item
                    icon="home-o"
                    :icon-size="20">
                    标签
                </van-tabbar-item>
                <van-tabbar-item
                    icon="search"
                    :icon-size="20">
                    标签
                </van-tabbar-item>
                <van-tabbar-item
                    icon="friends-o"
                    :icon-size="20">
                    标签
                </van-tabbar-item>
                <van-tabbar-item
                    icon="setting-o"
                    :icon-size="20">
                    标签
                </van-tabbar-item>
            </van-tabbar>
        </demo-block>

        <demo-block
            title="通过名称匹配"
            :card="false">
            <van-tabbar
                v-model="active1"
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-tabbar-item
                    name="home"
                    icon="home-o"
                    >标签</van-tabbar-item
                >
                <van-tabbar-item
                    name="search"
                    icon="search"
                    >标签</van-tabbar-item
                >
                <van-tabbar-item
                    name="friends"
                    icon="friends-o"
                    >标签</van-tabbar-item
                >
                <van-tabbar-item
                    name="setting"
                    icon="setting-o"
                    >标签</van-tabbar-item
                >
            </van-tabbar>
        </demo-block>

        <demo-block
            title="徽标提示"
            :card="false">
            <van-tabbar
                v-model="active"
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item
                    icon="search"
                    dot
                    >标签</van-tabbar-item
                >
                <van-tabbar-item
                    icon="friends-o"
                    badge="5"
                    >标签</van-tabbar-item
                >
                <van-tabbar-item
                    icon="setting-o"
                    badge="20"
                    >标签</van-tabbar-item
                >
            </van-tabbar>
        </demo-block>

        <demo-block
            title="自定义图标"
            :card="false">
            <van-tabbar
                v-model="active"
                :fixed="false"
                :safe-area-inset-bottom="false">
                <van-tabbar-item badge="3">
                    <span>自定义</span>
                    <template #icon="props">
                        <van-image
                            fit="aspectFit"
                            width="20"
                            height="20"
                            :src="props.active ? icon.active : icon.inactive" />
                    </template>
                </van-tabbar-item>
                <van-tabbar-item icon="search">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>
        </demo-block>

        <demo-block
            title="自定义颜色"
            :card="false">
            <van-tabbar
                v-model="active"
                :fixed="false"
                :safe-area-inset-bottom="false"
                active-color="#ee0a24"
                inactive-color="gray">
                <van-tabbar-item icon="home-o">标签</van-tabbar-item>
                <van-tabbar-item icon="search">标签</van-tabbar-item>
                <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
            </van-tabbar>
        </demo-block>

        <demo-block
            title="监听切换事件"
            :card="false">
            <van-tabbar
                v-model="active"
                :fixed="false"
                :safe-area-inset-bottom="false"
                @change="onChange">
                <van-tabbar-item icon="home-o">标签 1</van-tabbar-item>
                <van-tabbar-item icon="search">标签 2</van-tabbar-item>
                <van-tabbar-item icon="friends-o">标签 3</van-tabbar-item>
                <van-tabbar-item icon="setting-o">标签 4</van-tabbar-item>
            </van-tabbar>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'
import { cdnURL } from '@/utils'

const icon = {
    active: cdnURL('user-active.png'),
    inactive: cdnURL('user-inactive.png'),
}
const active = ref(0)
const active1 = ref('home')
const onChange = (index) => uni.showToast({ title: `标签 ${index}`, icon: 'none' })
</script>

<style lang="scss" scoped></style>
