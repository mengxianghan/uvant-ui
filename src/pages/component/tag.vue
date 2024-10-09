<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :body-style="{ padding: 0 }">
            <van-cell-group inset>
                <van-cell
                    v-for="item in ['primary', 'success', 'danger', 'warning']"
                    :key="item"
                    :title="`${item} 类型`">
                    <template #value>
                        <van-tag :type="item">标签</van-tag>
                    </template>
                </van-cell>
            </van-cell-group>
        </demo-block>

        <demo-block
            title="样式风格"
            :body-style="{ padding: 0 }">
            <van-cell-group inset>
                <van-cell title="空心样式">
                    <template #value>
                        <van-tag
                            type="primary"
                            plain
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
                <van-cell title="圆角样式">
                    <template #value>
                        <van-tag
                            type="primary"
                            round
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
                <van-cell title="标记样式">
                    <template #value>
                        <van-tag
                            mark
                            type="primary"
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
                <van-cell title="可关闭标签">
                    <template #value>
                        <van-tag
                            :show="show"
                            closeable
                            size="medium"
                            type="primary"
                            @close="close">
                            标签
                        </van-tag>
                    </template>
                </van-cell>
            </van-cell-group>
        </demo-block>

        <demo-block
            title="标签大小"
            :body-style="{ padding: 0 }">
            <van-cell-group inset>
                <van-cell title="小号标签">
                    <template #value>
                        <van-tag type="primary">标签</van-tag>
                    </template>
                </van-cell>
                <van-cell title="中号标签">
                    <template #value>
                        <van-tag
                            type="primary"
                            size="medium"
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
                <van-cell title="大号标签">
                    <template #value>
                        <van-tag
                            type="primary"
                            size="large"
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
            </van-cell-group>
        </demo-block>

        <demo-block
            title="自定义颜色"
            :body-style="{ padding: 0 }">
            <van-cell-group inset>
                <van-cell title="背景颜色">
                    <template #value>
                        <van-tag color="#7232dd">标签</van-tag>
                    </template>
                </van-cell>
                <van-cell title="文字颜色">
                    <template #value>
                        <van-tag
                            color="#ffe1e1"
                            text-color="#ad0000"
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
                <van-cell title="空心颜色">
                    <template #value>
                        <van-tag
                            color="#7232dd"
                            plain
                            >标签</van-tag
                        >
                    </template>
                </van-cell>
            </van-cell-group>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(true)
const close = () => {
    show.value = false
}
</script>

<style lang="scss" scoped></style>
