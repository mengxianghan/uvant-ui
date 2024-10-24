<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-radio-group v-model="radio1">
                <van-radio name="1">单选框 1</van-radio>
                <view class="h-2"></view>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="水平排列">
            <van-radio-group
                v-model="radioHorizontal"
                direction="horizontal">
                <van-radio name="1">单选框 1</van-radio>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="禁用状态">
            <van-radio-group
                v-model="radio2"
                disabled>
                <van-radio name="1">单选框 1</van-radio>
                <view class="h-2"></view>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="自定义形状">
            <van-radio-group
                v-model="radioSquare"
                shape="square">
                <van-radio name="1">单选框 1</van-radio>
                <view class="h-2"></view>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>
            <view class="h-2"></view>
            <van-radio-group
                v-model="radioDot"
                shape="dot">
                <van-radio name="1">单选框 1</van-radio>
                <view class="h-2"></view>
                <van-radio name="2">单选框 2</van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="自定义颜色">
            <van-radio-group v-model="radio3">
                <van-radio
                    name="1"
                    checked-color="#ee0a24">
                    单选框 1
                </van-radio>
                <view class="h-2"></view>
                <van-radio
                    name="2"
                    checked-color="#ee0a24">
                    单选框 2
                </van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="自定义大小">
            <van-radio-group v-model="radioIconSize">
                <van-radio
                    name="1"
                    icon-size="24px">
                    单选框 1
                </van-radio>
                <view class="h-2"></view>
                <van-radio
                    name="2"
                    icon-size="24px">
                    单选框 2
                </van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="自定义图标">
            <van-radio-group v-model="radio4">
                <van-radio name="1">
                    单选框 1
                    <template #icon>
                        <van-image
                            :src="
                                radio4 === '1'
                                    ? 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png'
                                    : 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
                            "
                            width="20px"
                            height="20px"
                            fit="aspectFit" />
                    </template>
                </van-radio>
                <view class="h-2"></view>
                <van-radio name="2">
                    单选框 2
                    <template #icon>
                        <van-image
                            :src="
                                radio4 === '2'
                                    ? 'https://fastly.jsdelivr.net/npm/@vant/assets/user-active.png'
                                    : 'https://fastly.jsdelivr.net/npm/@vant/assets/user-inactive.png'
                            "
                            width="20px"
                            height="20px"
                            fit="aspectFit" />
                    </template>
                </van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="左侧文本">
            <van-radio-group v-model="radioLeftLabel">
                <van-radio
                    name="1"
                    label-position="left">
                    单选框 1
                </van-radio>
                <view class="h-2"></view>
                <van-radio
                    name="2"
                    label-position="left">
                    单选框 2
                </van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block title="禁用文本点击">
            <van-radio-group v-model="radioLabel">
                <van-radio
                    name="1"
                    label-disabled>
                    单选框 1
                </van-radio>
                <view class="h-2"></view>
                <van-radio
                    name="2"
                    label-disabled>
                    单选框 2
                </van-radio>
            </van-radio-group>
        </demo-block>

        <demo-block
            title="搭配单元格组件使用"
            :card="false">
            <van-radio-group v-model="radio5">
                <van-cell-group inset>
                    <van-cell
                        clickable
                        :title="'单选框' + 1"
                        @click="radio5 = '1'">
                        <template #rightIcon>
                            <van-radio name="1" />
                        </template>
                    </van-cell>
                    <van-cell
                        clickable
                        :title="'单选框' + 2"
                        @click="radio5 = '2'">
                        <template #rightIcon>
                            <van-radio name="2" />
                        </template>
                    </van-cell>
                </van-cell-group>
            </van-radio-group>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const radio1 = ref('1')
const radio2 = ref('2')
const radio3 = ref('1')
const radio4 = ref('1')
const radio5 = ref('1')
const radioLabel = ref('1')
const radioSquare = ref('1')
const radioDot = ref('1')
const radioIconSize = ref('1')
const radioHorizontal = ref('1')
const radioLeftLabel = ref('1')
</script>

<style lang="scss" scoped></style>
