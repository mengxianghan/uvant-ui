<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-switch v-model="checked" />
        </demo-block>

        <demo-block title="禁用状态">
            <van-switch
                v-model="checked"
                disabled />
        </demo-block>

        <demo-block title="加载状态">
            <van-switch
                v-model="checked"
                loading />
        </demo-block>

        <demo-block title="自定义大小">
            <van-switch
                v-model="checked2"
                size="22px" />
        </demo-block>

        <demo-block title="自定义颜色">
            <van-switch
                v-model="checked3"
                active-color="#ee0a24"
                inactive-color="#dcdee0" />
        </demo-block>

        <demo-block title="自定义按钮">
            <van-switch v-model="checked3">
                <template #node>
                    <van-icon
                        :name="checked3 ? 'success' : 'cross'"
                        :size="16" />
                </template>
            </van-switch>
        </demo-block>

        <demo-block title="异步控制">
            <van-switch
                :model-value="checked4"
                @update:model-value="onUpdateValue" />
        </demo-block>

        <demo-block title="搭配单元格使用">
            <van-cell
                center
                title="标题">
                <template #rightIcon>
                    <van-switch v-model="checked5" />
                </template>
            </van-cell>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const checked = ref(true)
const checked2 = ref(true)
const checked3 = ref(true)
const checked4 = ref(true)
const checked5 = ref(true)

const onUpdateValue = (checked) => {
    uni.showModal({
        title: '标题',
        content: '是否切换开关？',
        showCancel: true,
        success: ({ confirm }) => {
            if (confirm) {
                checked4.value = checked
            }
        },
    })
    // showConfirmDialog({
    //     title: t('title'),
    //     message: t('message'),
    // }).then(() => {
    //     checked4.value = checked
    // })
}
</script>

<style lang="scss" scoped></style>
