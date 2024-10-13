<template>
    <view class="van-tabs">
        <scroll-view
            class="van-tabs__wrap"
            scroll-with-animation
            :scroll-x="cpScrollable"
            :scroll-left="scrollLeft"
            :show-scrollbar="false"
            :class="cpWrapClass"
            :id="scrollViewId">
            <view
                class="van-tabs__nav"
                :class="cpNavClass">
                <view
                    v-for="(item, index) in list"
                    :key="item.value"
                    :id="[`${tabId}-${index}`]"
                    :class="{
                        'van-tab--active': item.value === active,
                        'van-tab--disabled': item.disabled,
                        ...cpTabClass,
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
                            :class="cpTextClass">
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
                    :id="lineId"
                    :style="cpLineStyle"></view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { uniqueId } from 'lodash-es'
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import { addUnit, isEmpty, getRect } from '../utils'
import { findIndex } from 'lodash-es'
import { head } from 'lodash-es'

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
const tabId = ref(uniqueId('van-tab-'))
const lineId = ref(uniqueId('van-tab-line-'))
const scrollViewId = ref(uniqueId('van-tabs-wrap-'))
const scrollLeft = ref(0)
const lineOffsetLeft = ref(0)

const cpWrapClass = computed(() => {
    const className = {
        'van-hairline--top-bottom': props.border,
        'van-tabs__wrap--shrink': props.shrink,
    }

    return className
})
const cpNavClass = computed(() => {
    const className = {
        'van-tabs__nav--shrink': props.shrink,
    }

    return className
})
const cpTabClass = computed(() => {
    const className = {
        'van-tab--shrink': props.shrink,
        'van-tab--grow': cpScrollable.value,
    }

    return className
})
const cpTextClass = computed(() => {
    const className = {
        'van-tab__text--ellipsis': props.ellipsis,
    }

    return className
})
const cpLineStyle = computed(() => {
    const { lineWidth, lineHeight, lineColor, duration } = props
    const style = {
        transform: `translate(${addUnit(lineOffsetLeft.value)})`,
        transitionDuration: `${duration}s`,
    }

    if (!isEmpty(lineWidth)) {
        style.width = addUnit(lineWidth)
    }

    if (!isEmpty(lineHeight)) {
        style.height = addUnit(lineHeight)
    }

    if (!isEmpty(lineColor)) {
        style.background = lineColor
    }

    return style
})
const cpActiveIndex = computed(() => findIndex(props.list, { value: active.value }))
const cpScrollable = computed(() => props.list.length > +props.swipeThreshold || !props.ellipsis)

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
    const { list } = props
    const queue = list.map((item, index) => getRect(instance.proxy, `#${tabId.value}-${index}`))
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
    return await getRect(instance.proxy, `#${lineId.value}`)
}

/**
 * 获取菜单尺寸
 */
async function getScrollViewRect() {
    return await getRect(instance.proxy, `#${scrollViewId.value}`)
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
    const offsetLeft = await getItemRectWidth(0, cpActiveIndex.value)
    const itemRect = head(await getItemRect(cpActiveIndex.value, 1))
    const lineRect = await getLineRect()

    lineOffsetLeft.value = offsetLeft + (itemRect.width - lineRect.width) / 2
}

/**
 * 设置滚动条位置
 */
async function setScrollLeft() {
    const itemRect = head(await getItemRect(cpActiveIndex.value, 1))
    const offsetLeft = await getItemRectWidth(0, cpActiveIndex.value)
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
