<template>
    <view
        class="pb-8"
        :style="{ height: '1000px' }">
        <demo-block title="吸顶">
            <van-sticky position="top">
                <van-button type="primary">吸顶</van-button>
            </van-sticky>
        </demo-block>

        <demo-block title="吸底">
            <van-sticky position="bottom">
                <van-button type="primary">吸底</van-button>
            </van-sticky>
        </demo-block>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped></style>
