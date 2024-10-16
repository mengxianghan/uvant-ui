<template>
    <view class="van-tabs">
        <scroll-view
            scroll-with-animation
            :scroll-x="scrollable"
            :scroll-left="scrollLeft"
            :show-scrollbar="false"
            :class="[
                'van-tabs__wrap',
                scrollViewSelector,
                {
                    'van-hairline--top-bottom': border,
                    'van-tabs__wrap--shrink': shrink,
                },
            ]">
            <view
                class="van-tabs__nav"
                :class="{
                    'van-tabs__nav--shrink': shrink,
                }">
                <view
                    v-for="(item, index) in list"
                    :key="item.value"
                    :class="{
                        [`${tabSelector}-${index}`]: true,
                        'van-tab--active': item.value === active,
                        'van-tab--disabled': item.disabled,
                        'van-tab--shrink': shrink,
                        'van-tab--grow': scrollable,
                    }"
                    :style="{
                        color: item.value === active ? titleActiveColor : titleInactiveColor,
                    }"
                    class="van-tab"
                    @click="handleClick(item, index)">
                    <vc-badge
                        :dot="item.dot"
                        :badge="item.badge"
                        :badge-props="item.badgeProps">
                        <view
                            class="van-tab__text"
                            :class="{
                                'van-tab__text--ellipsis': ellipsis,
                            }">
                            <slot
                                :record="item"
                                :index="index">
                                {{ item.label }}
                            </slot>
                        </view>
                    </vc-badge>
                </view>
                <view
                    class="van-tabs__line"
                    :class="[lineSelector]"
                    :style="lineStyles"></view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { addUnit, isEmpty, getRect } from '../utils'
import { findIndex, head, uniqueId } from 'lodash-es'

const props = defineProps({
    list: { type: Array, default: () => [] },
    background: String,
    duration: { type: [Number, String], default: 0.3 },
    lineWidth: [Number, String],
    lineHeight: [Number, String],
    lineColor: String,
    border: { type: Boolean, default: false },
    ellipsis: { type: Boolean, default: true },
    sticky: { type: Boolean, default: false },
    shrink: { type: Boolean, default: false },
    offsetTop: [Number, String],
    swipeThreshold: { type: [Number, String], default: 5 },
    titleActiveColor: String,
    titleInactiveColor: String,
    beforeChange: { type: Function, default: () => true },
})
const active = defineModel('active', { type: [Number, String] })
const emits = defineEmits(['click', 'change'])

const instance = getCurrentInstance()
const tabSelector = ref(uniqueId('van-tab-'))
const lineSelector = ref(uniqueId('van-tab-line-'))
const scrollViewSelector = ref(uniqueId('van-tabs-wrap-'))
const scrollLeft = ref(0)
const lineOffsetLeft = ref(0)

const lineStyles = computed(() => ({
    transform: `translate(${addUnit(lineOffsetLeft.value)})`,
    transitionDuration: `${props.duration}s`,
    width: !isEmpty(props.lineWidth) ? addUnit(props.lineWidth) : '',
    height: !isEmpty(props.lineHeight) ? addUnit(props.lineHeight) : '',
    background: !isEmpty(props.lineColor) ? props.lineColor : '',
}))
const activeIndex = computed(() => findIndex(props.list, { value: active.value }))
const scrollable = computed(() => props.list.length > +props.swipeThreshold || !props.ellipsis)

watch([() => active.value, () => props.list, () => props.swipeThreshold], () => {
    initialize()
})

onMounted(async () => {
    initialize()
})

async function initialize() {
    await nextTick()
    setLineOffset()
    setScrollLeft()
}

/**
 * 获取标签项 DOMRect
 * @param {number} [start] - 开始位置
 * @param {number} [count] - 个数
 */
function getItemRect(start = 0, count = props.list.length) {
    const queue = props.list.map((item, index) => getRect(instance.proxy, `.${tabSelector.value}-${index}`))
    return new Promise((resolve) => {
        Promise.all(queue).then((data) => {
            resolve(data.slice(start, start + count))
        })
    })
}

/**
 * 获取标签项的总宽度
 */
async function getItemRectWidth(start = 0, count = props.list.length) {
    const itemRectList = await getItemRect(start, count)
    return itemRectList.reduce((prev, current) => {
        return prev + current?.width
    }, 0)
}

/**
 * 获取下划线 DOMRect
 */
async function getLineRect() {
    return await getRect(instance.proxy, `.${lineSelector.value}`)
}

/**
 * 获取菜单尺寸
 */
async function getScrollViewRect() {
    return await getRect(instance.proxy, `.${scrollViewSelector.value}`)
}

async function handleClick(record, index) {
    if (record.disabled) return

    if (!(await props.beforeChange({ record, index }))) return

    active.value = record.value
    emits('click', record)
    emits('change', active.value, { record })
}

/**
 * 设置底部条偏移位置
 */
async function setLineOffset() {
    const offsetLeft = await getItemRectWidth(0, activeIndex.value)
    const itemRect = head(await getItemRect(activeIndex.value, 1))
    const lineRect = await getLineRect()

    lineOffsetLeft.value = offsetLeft + (itemRect.width - lineRect.width) / 2
}

/**
 * 设置滚动条位置
 */
async function setScrollLeft() {
    const itemRect = head(await getItemRect(activeIndex.value, 1))
    const offsetLeft = await getItemRectWidth(0, activeIndex.value)
    const scrollViewRect = await getScrollViewRect()
    const itemsWith = await getItemRectWidth()

    scrollLeft.value = Math.min(
        itemsWith - scrollViewRect.width,
        Math.max(0, offsetLeft + itemRect.width / 2 - scrollViewRect.width / 2)
    )
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
