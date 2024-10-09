<template>
    <view class="pb-8">
        <demo-block title="基础用法">
            <van-icon name="chat-o" />
        </demo-block>

        <demo-block title="使用图片 URL">
            <van-icon name="https://fastly.jsdelivr.net/npm/@vant/assets/icon-demo.png" />
        </demo-block>

        <demo-block title="徽标提示">
            <view class="flex flex-wrap gap-4">
                <van-icon
                    name="chat-o"
                    dot />
                <van-icon
                    name="chat-o"
                    badge="9" />
                <van-icon
                    name="chat-o"
                    badge="99+" />
            </view>
        </demo-block>

        <demo-block title="图标颜色">
            <view class="flex flex-wrap gap-4">
                <van-icon
                    name="cart-o"
                    color="#1989fa" />
                <van-icon
                    name="fire-o"
                    color="#ee0a24" />
            </view>
        </demo-block>

        <demo-block title="图标大小">
            <view class="flex flex-wrap gap-4">
                <!-- 不指定单位，默认使用 px -->
                <van-icon
                    name="chat-o"
                    size="40" />
                <!-- 指定使用 rem 单位 -->
                <van-icon
                    name="chat-o"
                    size="3rem" />
            </view>
        </demo-block>

        <demo-block title="自定义图标">
            <view class="flex flex-wrap gap-4">
                <!-- 不指定单位，默认使用 px -->
                <van-icon
                    class-prefix="my-icon"
                    name="logo"
                    size="40" />
            </view>
        </demo-block>
    </view>
</template>

<script setup></script>

<style lang="scss">
page {
    @font-face {
        font-family: 'my-icon';
        src:
            url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.woff2?t=1728460455317') format('woff2'),
            url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.woff?t=1728460455317') format('woff'),
            url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.ttf?t=1728460455317') format('truetype');
    }
}

.my-icon {
    font-family: 'my-icon';
}

.my-icon-logo::before {
    content: '\ec5f';
}
</style>
