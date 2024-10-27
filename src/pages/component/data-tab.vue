<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-data-tabs
                v-model:active="active1"
                :list="list1">
            </van-data-tabs>
        </demo-block>

        <demo-block
            title="标签栏滚动"
            :card="false">
            <van-data-tabs
                v-model:active="active2"
                :list="list2">
            </van-data-tabs>
        </demo-block>

        <demo-block
            title="禁用标签"
            :card="false">
            <van-data-tabs
                v-model:active="active3"
                :list="list3">
            </van-data-tabs>
        </demo-block>

        <demo-block
            title="点击事件"
            :card="false">
            <van-data-tabs
                v-model:active="active4"
                :list="list4"
                @click="onClickTab">
            </van-data-tabs>
        </demo-block>

        <demo-block
            title="收缩布局"
            :card="false">
            <van-data-tabs
                v-model:active="active2"
                :list="list2"
                shrink>
            </van-data-tabs>
        </demo-block>

        <demo-block
            title="自定义标签"
            :card="false">
            <van-data-tabs
                v-model:active="active5"
                :list="list5">
                <template #default="{ record }">
                    <template v-if="record.leftIcon">
                        <van-icon :name="record.leftIcon"></van-icon>
                    </template>
                    {{ record.label }}
                </template>
            </van-data-tabs>
        </demo-block>

        <demo-block
            title="异步切换"
            :card="false">
            <van-data-tabs
                v-model:active="active1"
                :list="list1"
                :before-change="beforeChange">
            </van-data-tabs>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'
const active1 = ref(1)
const active2 = ref(1)
const active3 = ref(1)
const active4 = ref(1)
const active5 = ref(1)
const list1 = ref([
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2 },
    { label: '标签3', value: 3 },
    { label: '标签4', value: 4 },
])
const list2 = ref([
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2 },
    { label: '标签3', value: 3 },
    { label: '标签4', value: 4 },
    { label: '标签5', value: 5 },
    { label: '标签6', value: 6 },
    { label: '标签7', value: 7 },
    { label: '标签8', value: 8 },
    { label: '标签9', value: 9 },
    { label: '标签10', value: 10 },
])

const list3 = ref([
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2, disabled: true },
    { label: '标签3', value: 3 },
])

const list4 = ref([
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2 },
])

const list5 = ref([
    { label: '标签1', value: 1 },
    { label: '标签2', value: 2, dot: true },
    { label: '标签3', value: 3, badge: 3 },
    { label: '标签4', value: 4, leftIcon: 'more-o' },
])

const onClickTab = ({ label }) => uni.showToast({ title: label, icon: 'none' })

const beforeChange = ({ record }) => {
    // 返回 false 表示阻止此次切换
    if (record.value === 1) {
        return false
    }

    // 返回 Promise 来执行异步逻辑
    return new Promise((resolve) => {
        // 在 resolve 函数中返回 true 或 false
        setTimeout(() => resolve(record.value !== 3), 1000)
    })
}
</script>

<style lang="scss" scoped></style>
