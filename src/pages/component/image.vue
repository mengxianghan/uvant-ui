<template>
    <view class="pb-8 bg-white">
        <demo-block title="基础用法">
            <van-row :gutter="16">
                <van-col :span="8">
                    <van-image
                        width="100"
                        height="100"
                        :src="cdnURL('cat.jpeg')" />
                    <view class="mt-2 text-neutral-400">基础用法</view>
                </van-col>

                <van-col :span="8">
                    <view class="w-32 h-32">
                        <van-image
                            :src="cdnURL('cat.jpeg')"
                            autosize />
                    </view>
                    <view class="mt-2 text-neutral-400">宽高自适应父元素</view>
                </van-col>
            </van-row>
        </demo-block>

        <demo-block title="填充模式">
            <van-row :gutter="16">
                <van-col
                    v-for="item in list"
                    :key="item.mode"
                    :span="8">
                    <van-image
                        :fit="item.mode"
                        width="6rem"
                        height="6rem"
                        :src="cdnURL('cat.jpeg')" />
                    <view class="mt-2 text-neutral-400">{{ item.mode }}</view>
                </van-col>
            </van-row>
        </demo-block>

        <demo-block title="圆形图片">
            <van-row :gutter="16">
                <van-col
                    v-for="item in list"
                    :key="item.mode"
                    :span="8">
                    <van-image
                        :fit="item.mode"
                        round
                        width="6rem"
                        height="6rem"
                        :src="cdnURL('cat.jpeg')" />
                    <view class="mt-2 text-neutral-400">{{ item.mode }}</view>
                </van-col>
            </van-row>
        </demo-block>

        <demo-block title="图片懒加载">
            <view class="flex flex-col">
                <van-image
                    width="100"
                    height="100"
                    lazy-load
                    :src="cdnURL('cat.jpeg')" />
                <view class="mt-2 text-neutral-400">只针对page与scroll-view下的image有效</view>
            </view>
        </demo-block>

        <demo-block title="加载中提示">
            <van-row :gutter="16">
                <van-col :span="8">
                    <van-image
                        width="100"
                        height="100">
                    </van-image>
                    <view class="mt-2 text-neutral-400">默认提示</view>
                </van-col>

                <van-col :span="8">
                    <van-image
                        width="100"
                        height="100">
                        <template #loading>
                            <van-loading
                                type="spinner"
                                size="20" />
                        </template>
                    </van-image>
                    <view class="mt-2 text-neutral-400">自定义提示</view>
                </van-col>
            </van-row>
        </demo-block>

        <demo-block title="加载失败提示">
            <van-row :gutter="16">
                <van-col :span="8">
                    <van-image
                        src="https://x"
                        width="100"
                        height="100">
                    </van-image>
                    <view class="mt-2 text-neutral-400">默认提示</view>
                </van-col>

                <van-col :span="8">
                    <van-image
                        src="https://x"
                        width="100"
                        height="100">
                        <template #error> 加载失败 </template>
                    </van-image>
                    <view class="mt-2 text-neutral-400">自定义提示</view>
                </van-col>
            </van-row>
        </demo-block>
    </view>
</template>

<script setup>
import { cdnURL } from '@/utils'

const list = [
    {
        mode: 'scaleToFill',
        text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应',
    },
    {
        mode: 'aspectFit',
        text: 'aspectFit：保持纵横比缩放图片，使图片的长边能完全显示出来',
    },
    {
        mode: 'aspectFill',
        text: 'aspectFill：保持纵横比缩放图片，只保证图片的短边能完全显示出来',
    },
]
</script>

<style lang="scss" scoped></style>
