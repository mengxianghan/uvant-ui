<template>
    <view>
        <van-data-tab
            v-model:active="active"
            :list="[
                { label: '基础用法', value: 1 },
                { label: '自定义锚点', value: 2 },
                { label: '仅头部拖拽', value: 3 },
            ]"></van-data-tab>

        <template v-if="active === 1">
            <van-floating-panel>
                <van-cell-group>
                    <van-cell
                        v-for="i in 26"
                        :key="i"
                        :title="String.fromCharCode(i + 64)"
                        size="large" />
                </van-cell-group>
            </van-floating-panel>
        </template>

        <template v-if="active === 2">
            <van-floating-panel :anchors="anchors">
                <div style="text-align: center; padding: 15px">
                    <p>面板显示高度 {{ height.toFixed(0) }} px</p>
                </div>
            </van-floating-panel>
        </template>

        <template v-if="active === 3">
            <van-floating-panel :content-draggable="false">
                <div style="text-align: center; padding: 15px">
                    <p>内容不可拖拽</p>
                </div>
            </van-floating-panel>
        </template>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const active = ref()

const { windowHeight } = uni.getSystemInfoSync()
const anchors = [100, Math.round(0.4 * windowHeight), Math.round(0.7 * windowHeight)]
const height = ref(anchors[0])
</script>

<style lang="scss" scoped></style>
