<template>
    <view class="pb-8 bg-white">
        <demo-block
            title="基础用法"
            :card="false">
            <van-grid clickable>
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
            </van-grid>
        </demo-block>

        <demo-block
            title="自定义列数"
            :card="false">
            <van-grid :column-num="3">
                <van-grid-item
                    v-for="value in 6"
                    :key="value"
                    icon="photo-o"
                    text="文字" />
            </van-grid>
        </demo-block>

        <demo-block
            title="自定义内容"
            :card="false">
            <van-grid
                :border="false"
                :column-num="3">
                <van-grid-item>
                    <van-image
                        :src="cdnURL('apple-1.jpeg')"
                        height="80" />
                </van-grid-item>
                <van-grid-item>
                    <van-image
                        :src="cdnURL('apple-2.jpeg')"
                        height="80" />
                </van-grid-item>
                <van-grid-item>
                    <van-image
                        :src="cdnURL('apple-3.jpeg')"
                        height="80" />
                </van-grid-item>
            </van-grid>
        </demo-block>

        <demo-block
            title="正方形格子"
            :card="false">
            <van-grid square>
                <van-grid-item
                    v-for="value in 8"
                    :key="value"
                    icon="photo-o"
                    text="文字" />
            </van-grid>
        </demo-block>

        <demo-block
            title="格子间距"
            :card="false">
            <van-grid :gutter="10">
                <van-grid-item
                    v-for="value in 8"
                    :key="value"
                    icon="photo-o"
                    text="文字" />
            </van-grid>
        </demo-block>

        <demo-block
            title="内容横排"
            :card="false">
            <van-grid
                direction="horizontal"
                :column-num="3">
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
                <van-grid-item
                    icon="photo-o"
                    text="文字" />
            </van-grid>
        </demo-block>

        <demo-block
            title="徽标提示"
            :card="false">
            <van-grid :column-num="2">
                <van-grid-item
                    icon="home-o"
                    text="文字"
                    dot />
                <van-grid-item
                    icon="search"
                    text="文字"
                    badge="99+" />
            </van-grid>
        </demo-block>
    </view>
</template>

<script setup>
import { cdnURL } from '@/utils'
</script>

<style lang="scss" scoped></style>
