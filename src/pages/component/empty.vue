<template>
    <view class="pb-8 empty">
        <demo-block title="基础用法">
            <van-empty description="描述文字" />
        </demo-block>

        <demo-block title="图片类型">
            <van-tabs
                v-model:active="imageType"
                :list="[
                    { label: '通用错误', value: 'error' },
                    { label: '网络错误', value: 'network' },
                    { label: '搜索提示', value: 'search' },
                ]"></van-tabs>
            <van-empty
                :image="imageType"
                description="描述文字" />
        </demo-block>

        <demo-block title="自定义大小">
            <van-empty
                image-size="100"
                description="描述文字" />
        </demo-block>

        <demo-block title="自定义图片">
            <van-empty
                image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
                image-size="80"
                description="描述文字" />
        </demo-block>

        <demo-block title="底部内容">
            <van-empty description="描述文字">
                <van-button
                    round
                    type="primary">
                    按钮
                </van-button>
            </van-empty>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const imageType = ref('error')
</script>

<style lang="scss" scoped>
.empty {
    --van-tabs-nav-background: transparent;
    --van-button-normal-padding: 0 56px;
}
</style>
