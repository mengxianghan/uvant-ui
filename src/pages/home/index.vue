<template>
    <view class="container">
        <view class="flex pl-6">
            <image
                class="w-8 h-8"
                src="/static/logo.png"
                mode="scaleToFill" />
            <view class="text-3xl ml-4">uvant ui</view>
        </view>
        <view class="text-neutral-400 pl-6 mt-4 mb-8 text-sm">轻量、可靠的 uniapp 组件库</view>

        <template
            v-for="item in list"
            :key="item.key">
            <view class="text-neutral-500 mt-6 ml-4 mb-2">{{ item.name }}</view>
            <view
                v-for="child in item.children"
                :key="child.key"
                class="bg-[#f7f8fa] hover:bg-[#eef0f4] transition-all duration-300 rounded-full py-3 px-5 font-medium mb-3 flex items-center"
                @click="handleNavigator(child.url)">
                <view class="flex-1">{{ child.key }} {{ child.name }}</view>
                <template v-if="!child.url">
                    <view
                        class="mr-2 font-normal"
                        :class="{
                            'text-blue-500': child.statusText,
                            'text-neutral-500': !child.statusText,
                        }">
                        {{ child.statusText || '未开始' }}
                    </view>
                </template>
                <van-icon name="arrow"></van-icon>
            </view>
        </template>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const list = ref([
    {
        key: 'base',
        name: '基础组件',
        children: [
            { key: 'Button', name: '按钮', url: '/pages/component/button' },
            { key: 'Cell', name: '单元格', url: '/pages/component/cell' },
            { key: 'Icon', name: '图标', url: '/pages/component/icon' },
            { key: 'Image', name: '图片', url: '/pages/component/image' },
            { key: 'Layout', name: '布局', url: '/pages/component/layout' },
            { key: 'Popup', name: '弹出层', url: '' },
            { key: 'Space', name: '间距', url: '/pages/component/space' },
            { key: 'Toast', name: '轻提示', url: '' },
        ],
    },
    {
        key: 'form',
        name: '表单组件',
        children: [
            { key: 'Calendar', name: '日历', url: '' },
            { key: 'Cascader', name: '级联选择', url: '' },
            { key: 'Checkbox', name: '复选框', url: '' },
            { key: 'DatePicker', name: '日期选择', url: '' },
            { key: 'Field', name: '输入框', url: '/pages/component/field' },
            { key: 'Form', name: '表单', url: '' },
            { key: 'NumberKeyboard', name: '数字键盘', url: '' },
            { key: 'PasswordInput', name: '密码输入框', url: '' },
            { key: 'Picker', name: '选择器', url: '' },
            { key: 'PickerGroup', name: '选择器组', url: '' },
            { key: 'Radio', name: '单选框', url: '' },
            { key: 'Rate', name: '评分', url: '' },
            { key: 'Search', name: '搜索', url: '/pages/component/search' },
            { key: 'Slider', name: '滑块', url: '' },
            { key: 'Signature', name: '签名', url: '' },
            { key: 'Stepper', name: '步进器', url: '' },
            { key: 'Switch', name: '开关', url: '' },
            { key: 'TimePicker', name: '时间选择', url: '' },
            { key: 'Uploader', name: '文件上传', url: '' },
        ],
    },
    {
        key: 'feedback',
        name: '反馈组件',
        children: [
            { key: 'ActionSheet', name: '动作面板', url: '' },
            { key: 'Barrage', name: '弹幕', url: '' },
            { key: 'Dialog', name: '弹出框', url: '' },
            { key: 'DropdownMenu', name: '下拉菜单', url: '' },
            { key: 'FloatingPanel', name: '浮动面板', url: '' },
            { key: 'FloatingBubble', name: '浮动气泡', url: '' },
            { key: 'Loading', name: '加载', url: '/pages/component/loading' },
            { key: 'Notify', name: '消息通知', url: '' },
            { key: 'Overlay', name: '遮罩层', url: '' },
            { key: 'PullRefresh', name: '下拉刷新', url: '' },
            { key: 'ShareSheet', name: '分享面板', url: '' },
            { key: 'SwipeCell', name: '滑动单元格', url: '' },
        ],
    },
    {
        key: 'show',
        name: '展示组件',
        children: [
            { key: 'Badge', name: '徽标', url: '/pages/component/badge' },
            { key: 'Circle', name: '环形进度条', url: '/pages/component/circle' },
            { key: 'Collapse', name: '折叠面板', url: '' },
            { key: 'CountDown', name: '倒计时', url: '' },
            { key: 'Divider', name: '分割线', url: '' },
            { key: 'Empty', name: '空状态', url: '/pages/component/empty' },
            { key: 'Highlight', name: '高亮文本', url: '' },
            { key: 'ImagePreview', name: '图片预览', url: '' },
            { key: 'Lazyload', name: '懒加载', url: '' },
            { key: 'List', name: '列表', url: '' },
            { key: 'NoticeBar', name: '通知栏', url: '' },
            { key: 'Popover', name: '气泡弹出框', url: '' },
            { key: 'Progress', name: '进度条', url: '' },
            { key: 'RollingText', name: '翻滚文本动效', url: '' },
            { key: 'Skeleton', name: '骨架屏', url: '' },
            { key: 'Steps', name: '步骤条', url: '' },
            { key: 'Sticky', name: '粘性布局', url: '/pages/component/sticky' },
            { key: 'Swipe', name: '轮播', url: '' },
            { key: 'Tag', name: '标签', url: '/pages/component/tag' },
            { key: 'TextEllipsis', name: '文本省略', url: '' },
            { key: 'Watermark', name: '水印', url: '' },
        ],
    },
    {
        key: 'navigator',
        name: '导航组件',
        children: [
            { key: 'ActionBar', name: '动作栏', url: '/pages/component/action-bar' },
            { key: 'BackTop', name: '回到顶部', url: '' },
            { key: 'Grid', name: '宫格', url: '' },
            { key: 'IndexBar', name: '索引栏', url: '' },
            { key: 'NavBar', name: '导航栏', url: '' },
            { key: 'Pagination', name: '分页', url: '' },
            { key: 'Sidebar', name: '侧边导航', url: '' },
            { key: 'Tab', name: '标签页', url: '/pages/component/tab' },
            { key: 'Tabbar', name: '标签栏', url: '/pages/component/tabbar' },
            { key: 'TreeSelect', name: '分类选择', url: '' },
        ],
    },
    {
        key: 'business',
        name: '业务组件',
        children: [
            { key: 'AddressEdit', name: '地址编辑', url: '' },
            { key: 'AddressList', name: '地址列表', url: '' },
            { key: 'Area', name: '省市区选择', url: '' },
            { key: 'Card', name: '卡片', url: '' },
            { key: 'ContactCard', name: '联系人卡片', url: '' },
            { key: 'ContactEdit', name: '联系人编辑', url: '' },
            { key: 'ContactList', name: '联系人列表', url: '' },
            { key: 'Coupon', name: '优惠券选择器', url: '' },
            { key: 'SubmitBar', name: '提交订单栏', url: '/pages/component/submit-bar' },
        ],
    },
])

function handleNavigator(url) {
    if (!url) return
    uni.navigateTo({ url })
}
</script>

<style lang="scss" scoped>
.container {
    @apply px-5 pb-6 min-h-svh bg-white;

    /* #ifdef H5 */
    @apply pt-10;
    /* #endif */

    /* #ifndef H5 */
    @apply pt-8;
    /* #endif */
}
</style>
