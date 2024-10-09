<template>
    <view class="pb-8">
        <demo-block title="加载类型">
            <view class="flex flex-wrap gap-4">
                <van-loading />

                <van-loading type="spinner" />
            </view>
        </demo-block>

        <demo-block title="自定义颜色">
            <view class="flex flex-wrap gap-4">
                <van-loading color="#1989fa" />

                <van-loading
                    type="spinner"
                    color="#1989fa" />
            </view>
        </demo-block>

        <demo-block title="自定义大小">
            <view class="flex flex-wrap gap-4">
                <van-loading size="24" />

                <van-loading
                    type="spinner"
                    size="24px" />
            </view>
        </demo-block>

        <demo-block title="加载文案">
            <view class="flex flex-wrap gap-4">
                <van-loading size="24px">加载中...</van-loading>
            </view>
        </demo-block>

        <demo-block title="垂直排列">
            <view class="flex flex-wrap gap-4">
                <van-loading
                    size="24px"
                    vertical
                    >加载中...</van-loading
                >
            </view>
        </demo-block>

        <demo-block title="自定义文本颜色">
            <view class="flex flex-wrap gap-4">
                <!-- 可修改文案和加载图标的颜色 -->
                <van-loading
                    color="#0094ff"
                    vertical
                    >加载中...</van-loading
                >

                <!-- 只修改文案颜色 -->
                <van-loading
                    text-color="#0094ff"
                    vertical
                    >加载中...</van-loading
                >
            </view>
        </demo-block>

        <demo-block title="自定义图标">
            <view class="flex flex-wrap gap-4">
                <van-loading vertical>
                    <template #icon>
                        <van-icon
                            name="star-o"
                            size="30" />
                    </template>
                    加载中...
                </van-loading>
            </view>
        </demo-block>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
