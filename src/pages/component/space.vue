<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-space size="8">
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
            </van-space>
        </demo-block>

        <demo-block title="垂直排列">
            <van-space
                direction="vertical"
                fill
                size="8">
                <van-button
                    type="primary"
                    block
                    >按钮</van-button
                >
                <van-button
                    type="primary"
                    block
                    >按钮</van-button
                >
                <van-button
                    type="primary"
                    block
                    >按钮</van-button
                >
            </van-space>
        </demo-block>

        <demo-block title="自定义间距">
            <!-- 20px -->
            <van-space :size="20">
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
            </van-space>

            <view class="mt-2">
                <!-- 2rem -->
                <van-space size="2rem">
                    <van-button type="primary">按钮</van-button>
                    <van-button type="primary">按钮</van-button>
                    <van-button type="primary">按钮</van-button>
                </van-space>
            </view>
        </demo-block>

        <demo-block title="对齐方式">
            <radio-group @change="onChange">
                <label
                    v-for="item in ['start', 'center', 'end', 'baseline']"
                    :key="item"
                    class="mr-2">
                    <radio
                        :value="item"
                        :checked="align === item"
                        class="scale-75">
                    </radio>
                    <text>{{ item }}</text>
                </label>
            </radio-group>

            <view class="p-4 bg-[#f3f2f5] mt-2">
                <van-space :align="align">
                    <van-button type="primary">{{ align }}</van-button>
                    <view class="px-5 py-10 bg-white ml-2">Block</view>
                </van-space>
            </view>
        </demo-block>

        <demo-block title="自动换行">
            <van-space
                wrap
                size="8">
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
                <van-button type="primary">按钮</van-button>
            </van-space>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const align = ref('center')

const onChange = (e) => {
    align.value = e.detail.value
}
</script>

<style lang="scss" scoped></style>
