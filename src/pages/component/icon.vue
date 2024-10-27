<template>
    <view class="icon-container">
        <van-fixed position="top">
            <van-tabs
                v-model:active="active"
                sticky
                :list="[
                    { label: '用法示例', value: 1 },
                    { label: '基础图标', value: 2 },
                    { label: '线框风格', value: 3 },
                    { label: '实底风格', value: 4 },
                ]"></van-tabs>
        </van-fixed>

        <view class="p-5">
            <view class="bg-white rounded-xl">
                <!-- 用法示例 -->
                <template v-if="active === 1">
                    <demo-block
                        title="基础用法"
                        :card="false">
                        <van-row>
                            <van-col
                                span="6"
                                @click="copy(demoIcon)">
                                <icon-block>
                                    <van-icon :name="demoIcon" />
                                </icon-block>
                            </van-col>
                        </van-row>
                    </demo-block>

                    <demo-block
                        title="使用图片 URL"
                        :card="false">
                        <van-row>
                            <van-col
                                span="6"
                                @click="copy(demoImage)">
                                <icon-block>
                                    <van-icon :name="demoImage" />
                                </icon-block>
                            </van-col>
                        </van-row>
                    </demo-block>

                    <demo-block
                        title="徽标提示"
                        :card="false">
                        <van-row>
                            <van-col
                                span="6"
                                @click="copy(demoIcon, { dot: true })">
                                <icon-block>
                                    <van-icon
                                        :name="demoIcon"
                                        dot />
                                </icon-block>
                            </van-col>
                            <van-col
                                span="6"
                                @click="copy(demoIcon, { badge: '9' })">
                                <icon-block>
                                    <van-icon
                                        :name="demoIcon"
                                        badge="9" />
                                </icon-block>
                            </van-col>
                            <van-col
                                span="6"
                                @click="copy(demoIcon, { badge: '99+' })">
                                <icon-block>
                                    <van-icon
                                        :name="demoIcon"
                                        badge="99+" />
                                </icon-block>
                            </van-col>
                        </van-row>
                    </demo-block>

                    <demo-block
                        title="图标颜色"
                        :card="false">
                        <van-row>
                            <van-col
                                span="6"
                                @click="copy('cart-o', { color: '#1989fa' })">
                                <icon-block>
                                    <van-icon
                                        name="cart-o"
                                        color="#1989fa" />
                                </icon-block>
                            </van-col>
                            <van-col
                                span="6"
                                @click="copy('fire-o', { color: '#ee0a24' })">
                                <icon-block>
                                    <van-icon
                                        name="fire-o"
                                        color="#ee0a24" />
                                </icon-block>
                            </van-col>
                        </van-row>
                    </demo-block>

                    <demo-block
                        title="图标大小"
                        :card="false">
                        <van-row>
                            <van-col
                                span="6"
                                @click="copy(demoIcon, { size: '40' })">
                                <icon-block>
                                    <van-icon
                                        :name="demoIcon"
                                        size="40" />
                                </icon-block>
                            </van-col>
                            <van-col
                                span="6"
                                @click="copy(demoIcon, { size: '3rem' })">
                                <icon-block>
                                    <van-icon
                                        :name="demoIcon"
                                        size="3rem" />
                                </icon-block>
                            </van-col>
                        </van-row>
                    </demo-block>

                    <demo-block
                        title="自定义图标"
                        :card="false">
                        <van-row>
                            <van-col
                                span="6"
                                @click="copy('logo', { size: '40', classPrefix: 'my-icon' })">
                                <icon-block>
                                    <van-icon
                                        class-prefix="my-icon"
                                        name="logo"
                                        size="40" />
                                </icon-block>
                            </van-col>
                        </van-row>
                    </demo-block>
                </template>

                <!-- 基础图标 -->
                <template v-if="active === 2">
                    <van-row>
                        <van-col
                            v-for="icon in icons.basic"
                            :key="icon"
                            span="6"
                            @click="copy(icon)">
                            <icon-block :title="icon">
                                <van-icon :name="icon" />
                            </icon-block>
                        </van-col>
                    </van-row>
                </template>

                <!-- 线框风格 -->
                <template v-if="active === 3">
                    <van-row>
                        <van-col
                            v-for="icon in icons.outline"
                            :key="icon"
                            span="6"
                            @click="copy(icon)">
                            <icon-block :title="icon">
                                <van-icon :name="icon" />
                            </icon-block>
                        </van-col>
                    </van-row>
                </template>

                <!-- 实底风格 -->
                <template v-if="active === 4">
                    <van-row>
                        <van-col
                            v-for="icon in icons.filled"
                            :key="icon"
                            span="6"
                            @click="copy(icon)">
                            <icon-block :title="icon">
                                <van-icon :name="icon" />
                            </icon-block>
                        </van-col>
                    </van-row>
                </template>
            </view>
        </view>
    </view>
</template>

<script setup>
import { cdnURL } from '@/utils'
import { ref } from 'vue'
import icons from '@/utils/icons'

const active = ref(1)
const demoIcon = 'chat-o'
const demoImage = cdnURL('icon-demo.png')

const copy = (icon, option = {}) => {
    let tag = `<van-icon name="${icon}"`
    if ('dot' in option) {
        tag = `${tag} ${option.dot ? 'dot' : ''}`
    }
    if ('badge' in option) {
        tag = `${tag} badge="${option.badge}"`
    }
    if ('color' in option) {
        tag = `${tag} color="${option.color}"`
    }
    if ('size' in option) {
        tag = `${tag} size="${option.size}"`
    }
    if ('classPrefix' in option) {
        tag = `${tag} class-prefix="${option.classPrefix}"`
    }
    tag = `${tag} />`

    uni.setClipboardData({
        data: tag,
        success: () => {
            uni.showToast({
                title: `复制成功：${tag}`,
                icon: 'none',
                duration: 1500,
            })
        },
    })
}
</script>

<style lang="scss">
@font-face {
    font-family: 'my-icon';
    src:
        url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.woff2?t=1728460455317') format('woff2'),
        url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.woff?t=1728460455317') format('woff'),
        url('//at.alicdn.com/t/c/font_1094427_q4p92jk2dbi.ttf?t=1728460455317') format('truetype');
}

.my-icon {
    font-family: 'my-icon';
}

.my-icon-logo::before {
    content: '\ec5f';
}
</style>
