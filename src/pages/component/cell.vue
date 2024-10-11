<template>
    <view class="pb-8">
        <demo-block
            title="基础用法"
            :body-style="{ padding: 0 }">
            <van-cell-group>
                <van-cell
                    title="单元格"
                    value="内容" />
                <van-cell
                    title="单元格"
                    value="内容"
                    label="描述信息" />
            </van-cell-group>
        </demo-block>

        <demo-block
            title="卡片风格"
            :body-style="{ padding: 0 }">
            <van-cell-group inset>
                <van-cell
                    title="单元格"
                    value="内容" />
                <van-cell
                    title="单元格"
                    value="内容"
                    label="描述信息" />
            </van-cell-group>
        </demo-block>

        <demo-block
            title="单元格大小"
            :body-style="{ padding: 0 }">
            <van-cell
                title="单元格"
                value="内容"
                size="large" />
            <van-cell
                title="单元格"
                value="内容"
                size="large"
                label="描述信息" />
        </demo-block>

        <demo-block
            title="展示图标"
            :body-style="{ padding: 0 }">
            <van-cell
                title="单元格"
                icon="location-o" />
        </demo-block>

        <demo-block
            title="展示箭头"
            :body-style="{ padding: 0 }">
            <van-cell
                title="单元格"
                is-link />
            <van-cell
                title="单元格"
                is-link
                value="内容" />
            <van-cell
                title="单元格"
                is-link
                arrow-direction="down"
                value="内容" />
        </demo-block>

        <demo-block
            title="分组标题"
            :body-style="{ padding: 0, '--van-cell-group-background': 'transparent' }">
            <van-cell-group
                title="分组1"
                :border="false">
                <van-cell
                    title="单元格"
                    value="内容" />
            </van-cell-group>
            <van-cell-group
                title="分组2"
                :border="false">
                <van-cell
                    title="单元格"
                    value="内容" />
            </van-cell-group>
        </demo-block>

        <demo-block
            title="使用插槽"
            :body-style="{ padding: 0 }">
            <van-cell
                value="内容"
                is-link>
                <!-- 使用 title 插槽来自定义标题 -->
                <template #title>
                    <span class="custom-title">单元格</span>
                    <van-tag type="primary">标签</van-tag>
                </template>
            </van-cell>

            <van-cell
                title="单元格"
                icon="shop-o">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon
                        name="search"
                        class="search-icon" />
                </template>
            </van-cell>
        </demo-block>

        <demo-block
            title="垂直居中"
            :body-style="{ padding: 0 }">
            <van-cell
                center
                title="单元格"
                value="内容"
                label="描述信息" />
        </demo-block>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.custom-title {
    margin-right: 4px;
    vertical-align: middle;
}

.search-icon {
    font-size: 16px;
    line-height: inherit;
}
</style>
