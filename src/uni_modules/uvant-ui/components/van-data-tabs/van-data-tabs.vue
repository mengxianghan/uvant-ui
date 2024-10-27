<template>
    <view :class="bem()">
        <scroll-view
            scroll-with-animation
            :scroll-x="scrollable"
            :scroll-left="scrollLeft"
            :show-scrollbar="false"
            :class="[
                bem('scroll', {
                    shrink,
                }),
                scrollViewSelector,
                {
                    'van-hairline--top-bottom': border,
                },
            ]">
            <view
                :class="
                    bem('nav', {
                        shrink,
                    })
                ">
                <view
                    v-for="(item, index) in list"
                    :key="item.value"
                    :class="[
                        bem('item', {
                            active: item.value === active,
                            disabled: item.disabled,
                            shrink,
                            grow: scrollable,
                        }),
                        `${tabSelector}-${index}`,
                    ]"
                    :style="{
                        color: item.value === active ? titleActiveColor : titleInactiveColor,
                    }"
                    @click="handleClick(item, index)">
                    <vc-badge
                        :dot="item.dot"
                        :badge="item.badge"
                        :badge-props="item.badgeProps">
                        <view
                            :class="
                                bem('text', {
                                    ellipsis,
                                })
                            ">
                            <slot
                                :record="item"
                                :index="index">
                                {{ item.label }}
                            </slot>
                        </view>
                    </vc-badge>
                </view>
                <view
                    :class="[bem('line'), lineSelector]"
                    :style="lineStyles"></view>
            </view>
        </scroll-view>
    </view>
</template>

<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch } from 'vue'
import {
    addUnit,
    isNullOrEmpty,
    getRect,
    getSizeStyle,
    createNamespace,
    createUniqueSelector,
    makeArrayProp,
    makeNumericProp,
    numericProp,
    truthProp,
} from '../utils'
import { findIndex, head, get } from 'lodash-es'

const props = defineProps({
    list: makeArrayProp(),
    background: String,
    duration: makeNumericProp(0.3),
    lineWidth: numericProp,
    lineHeight: numericProp,
    lineColor: String,
    border: Boolean,
    ellipsis: truthProp,
    sticky: Boolean,
    shrink: Boolean,
    offsetTop: numericProp,
    swipeThreshold: makeNumericProp(5),
    titleActiveColor: String,
    titleInactiveColor: String,
    beforeChange: { type: Function, default: () => true },
})
const active = defineModel('active', { type: numericProp })
const emits = defineEmits(['click', 'change'])

const { name, bem } = createNamespace('tabs')
const [tabSelector, lineSelector, scrollViewSelector] = createUniqueSelector(name, 3)
const instance = getCurrentInstance()
const scrollLeft = ref(0)
const lineOffsetLeft = ref(0)

const lineStyles = computed(() => ({
    transform: `translate(${addUnit(lineOffsetLeft.value)})`,
    transitionDuration: `${props.duration}s`,
    background: !isNullOrEmpty(props.lineColor) ? props.lineColor : '',
    ...getSizeStyle([props.lineWidth, props.lineHeight]),
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
    if (isNullOrEmpty(active.value)) {
        active.value = get(head(props.list), 'value')
    }
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
    const queue = props.list.map((item, index) => getRect(instance.proxy, `.${tabSelector}-${index}`))
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
    return await getRect(instance.proxy, `.${lineSelector}`)
}

/**
 * 获取菜单尺寸
 */
async function getScrollViewRect() {
    return await getRect(instance.proxy, `.${scrollViewSelector}`)
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
