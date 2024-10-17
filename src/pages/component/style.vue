<template>
    <view class="pb-8">
        <demo-block title="文字省略">
            <view class="bg-white text-neutral-500 p-3 rounded-md">
                <div class="max-w-60">
                    <!-- 最多显示一行 -->
                    <div class="van-ellipsis mb-4">这是一段最多显示一行的文字，多余的内容会被省略</div>

                    <!-- 最多显示两行 -->
                    <div class="van-multi-ellipsis--l2">
                        这是一段最多显示两行的文字，后面的内容会省略。这是一段最多显示两行的文字，后面的内容会省略
                    </div>
                </div>
            </view>
        </demo-block>

        <demo-block title="1px 边框">
            <view class="bg-white py-3 rounded-md">
                <view class="van-hairline--top"></view>
            </view>
        </demo-block>

        <demo-block
            title="动画"
            :card="false">
            <view
                :class="['w-24 h-24 rounded bg-blue-500 fixed left-0 right-0 top-0 bottom-0 m-auto z-10', classes]"
                :style="styles"
                @animationstart="onAnimationstart"
                @animationend="onAnimationend"></view>

            <van-cell-group inset>
                <van-cell
                    title="Fade"
                    is-link
                    @click="handleTransition('van-fade')"></van-cell>
                <van-cell
                    title="Slide Up"
                    is-link
                    @click="handleTransition('van-slide-up')"></van-cell>
                <van-cell
                    title="Slide Down"
                    is-link
                    @click="handleTransition('van-slide-down')"></van-cell>
                <van-cell
                    title="Slide Left"
                    is-link
                    @click="handleTransition('van-slide-left')"></van-cell>
                <van-cell
                    title="Slide Right"
                    is-link
                    @click="handleTransition('van-slide-right')"></van-cell>
                <van-cell
                    title="Custom"
                    is-link
                    @click="handleTransition('custom-fade')"></van-cell>
            </van-cell-group>
        </demo-block>
    </view>
</template>

<script setup>
import { useCSSAnimation } from '@/uni_modules/uvant-ui'

const { open, close, classes, styles, onAnimationstart, onAnimationend } = useCSSAnimation()

function handleTransition(name) {
    open({ name })
    setTimeout(() => {
        close()
    }, 800)
}
</script>

<style lang="scss">
@keyframes custom-in {
    0% {
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        opacity: 0;
        -webkit-transform: perspective(400px) rotateX(90deg);
        transform: perspective(400px) rotateX(90deg);
    }
    40% {
        -webkit-animation-timing-function: ease-in;
        animation-timing-function: ease-in;
        -webkit-transform: perspective(400px) rotateX(-20deg);
        transform: perspective(400px) rotateX(-20deg);
    }
    60% {
        opacity: 1;
        -webkit-transform: perspective(400px) rotateX(10deg);
        transform: perspective(400px) rotateX(10deg);
    }
    80% {
        -webkit-transform: perspective(400px) rotateX(-5deg);
        transform: perspective(400px) rotateX(-5deg);
    }
    to {
        -webkit-transform: perspective(400px);
        transform: perspective(400px);
    }
}

@keyframes custom-out {
    0% {
        -webkit-transform: perspective(400px);
        transform: perspective(400px);
    }
    30% {
        opacity: 1;
        -webkit-transform: perspective(400px) rotateX(-20deg);
        transform: perspective(400px) rotateX(-20deg);
    }
    to {
        opacity: 0;
        -webkit-transform: perspective(400px) rotateX(90deg);
        transform: perspective(400px) rotateX(90deg);
    }
}

.custom-fade {
    &-enter-active {
        animation: custom-in 0.3s both;
    }

    &-leave-active {
        animation: custom-out 0.3s both;
    }
}
</style>
