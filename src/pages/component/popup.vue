<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :card="false">
            <van-cell-group inset>
                <van-cell
                    title="展示弹出层"
                    is-link
                    @click="showPopup" />
            </van-cell-group>
            <van-popup v-model:show="show">
                <view class="p-16 bg-white">内容</view>
            </van-popup>
        </demo-block>

        <demo-block
            title="弹出位置"
            :card="false">
            <van-gird>
                <van-gird-item>111</van-gird-item>
            </van-gird>
            <van-popup v-model:show="show">
                <view class="p-16 bg-white">内容</view>
            </van-popup>
        </demo-block>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const show = ref(false)
const showPopup = () => {
    show.value = true
}
</script>

<style lang="scss" scoped></style>
