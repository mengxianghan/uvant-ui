<template>
    <view :class="[bem([type]), tabsSelector]">
        <van-sticky
            :disabled="!sticky"
            :offset="offsetTop"
            :container="getContainer"
            :page-scroll="pageScroll">
            <view
                :class="[
                    bem('wrap'),
                    {
                        [BORDER_TOP_BOTTOM]: type === 'line' && border,
                    },
                ]">
                <slot name="nav-left"></slot>
                <scroll-view
                    :scroll-x="scrollable"
                    :scroll-with-animation="state.scrollWithAnimation"
                    :scroll-left="state.scrollLeft"
                    :show-scrollbar="false"
                    :class="bem('scroll', [type, { shrink }])">
                    <view
                        :class="[
                            bem('nav', [
                                type,
                                {
                                    // shrink,
                                    complete: scrollable,
                                },
                            ]),
                            navSelector,
                        ]"
                        :style="navStyles">
                        <!--tab-->
                        <view
                            v-for="(item, index) in children"
                            :key="item.proxy.name || item.uid"
                            :class="[
                                bemTab([
                                    type,
                                    {
                                        grow: scrollable && !shrink,
                                        shrink,
                                        active: active === item.proxy.name || active === index,
                                        disabled: item.proxy.disabled,
                                    },
                                ]),
                                `${tabSelector}-${index}`,
                            ]"
                            @click="(e) => onClickTab(item, index, e)">
                            <vc-badge
                                :dot="item.proxy.dot"
                                :badge="item.proxy.badge"
                                :badge-props="{ showZero: item.proxy.showZeroBadge }">
                                <view :class="bemTab('wrap')">
                                    <template v-if="item.proxy.icon">
                                        <view
                                            v-if="item.proxy.icon"
                                            :class="bemTab('icon')">
                                            <van-icon :name="item.proxy.icon"></van-icon>
                                        </view>
                                    </template>

                                    <view :class="bemTab('text', { ellipsis: !scrollable })">
                                        <template v-if="item.proxy.name">
                                            <slot :name="item.proxy.name">{{ item.proxy.title }}</slot>
                                        </template>
                                        <template v-else>
                                            {{ item.proxy.title }}
                                        </template>
                                    </view>

                                    <template v-if="item.proxy.rightIcon">
                                        <view :class="bemTab('right-icon')">
                                            <van-icon :name="item.proxy.rightIcon"></van-icon>
                                        </view>
                                    </template>
                                </view>
                            </vc-badge>
                        </view>

                        <!--line-->
                        <template v-if="type === 'line' && children.length">
                            <view
                                :class="[bem('line'), lineSelector]"
                                :style="state.lineStyles"></view>
                        </template>
                    </view>
                </scroll-view>

                <slot name="nav-right"></slot>
            </view>
            <slot name="nav-bottom"></slot>
        </van-sticky>
        <!--content-->
        <view
            :class="
                bem('content', {
                    animated: animated || swipeable,
                })
            ">
            <view
                :class="bem('track', { animated: animated || swipeable })"
                :style="trackStyles">
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script setup>
import { computed, reactive, onMounted, watch, nextTick, getCurrentInstance } from 'vue'
import {
    makeStringProp,
    makeNumericProp,
    truthProp,
    numericProp,
    createNamespace,
    BORDER_TOP_BOTTOM,
    createUniqueSelector,
    getRect,
    callInterceptor,
    isNullOrEmpty,
    isDef,
    addUnit,
    querySelector,
} from '../utils'
import { useChildren } from '../composables'

const props = defineProps({
    type: makeStringProp('line'),
    color: String,
    border: Boolean,
    sticky: Boolean,
    shrink: Boolean,
    // active: makeNumericProp(0),
    duration: makeNumericProp(0.3),
    animated: Boolean,
    ellipsis: truthProp,
    swipeable: Boolean,
    scrollspy: Boolean,
    offsetTop: makeNumericProp(0),
    background: String,
    lazyRender: truthProp,
    showHeader: truthProp,
    lineWidth: numericProp,
    lineHeight: numericProp,
    beforeChange: Function,
    swipeThreshold: makeNumericProp(5),
    titleActiveColor: String,
    titleInactiveColor: String,
    pageScroll: { type: Function, default: () => {} },
})
const emits = defineEmits(['change', 'scroll', 'rendered', 'clickTab'])
const active = defineModel('active', makeNumericProp(0))

const { name, bem } = createNamespace('tabs')
const { bem: bemTab } = createNamespace('tab')
const [tabsSelector, tabSelector, lineSelector, navSelector] = createUniqueSelector(name, 4)
const { children, linkChildren } = useChildren('tabs')
const instance = getCurrentInstance()
const state = reactive({
    inited: false,
    lineStyles: {},
    prevIndex: -1,
    currentIndex: -1,
    scrollWithAnimation: false,
    scrollLeft: 0,
    animated: props.animated,
})

const scrollable = computed(() => children.length > +props.swipeThreshold || !props.ellipsis || props.shrink)
const navStyles = computed(() => ({
    borderColor: props.color,
    background: props.background,
}))
const trackStyles = computed(() => {
    if (!props.animated && !props.swipeable) {
        return
    }

    return {
        left: `${-100 * state.currentIndex}%`,
        transitionDuration: state.animated && state.inited ? `${props.duration}s` : '0s',
    }
})
const currentName = computed(() => {
    const activeTab = children[state.currentIndex]?.proxy

    if (activeTab) {
        return getTabName(activeTab, state.currentIndex)
    }

    return null
})

watch(() => [props.color, props.duration, props.lineWidth, props.lineHeight], setLine)

watch(
    () => children.length,
    () => {
        if (state.inited) {
            setCurrentIndexByName(active.value)
            setLine()
            nextTick(() => {
                scrollIntoView()
            })
        }
    }
)

onMounted(() => {
    init()
})

function init() {
    setCurrentIndexByName(active.value, true)
    nextTick(() => {
        state.inited = true
        scrollIntoView()
    })
}

function getTabName(tab, index) {
    return tab.name ?? index
}

function getTabsRect() {
    const queue = children.map((item, index) => getRect(instance.proxy, `.${tabSelector}-${index}`))
    return new Promise((resolve) => {
        Promise.all(queue).then((data) => {
            resolve(data)
        })
    })
}

function getNavRect() {
    return new Promise((resolve, reject) => {
        getRect(instance.proxy, `.${navSelector}`).then(resolve).catch(reject)
    })
}

function getContainer() {
    return querySelector(`.${tabsSelector}`)
}

function setCurrentIndex(currentIndex, skipScrollIntoView) {
    const newIndex = findAvailableTab(currentIndex)

    if (isNullOrEmpty(newIndex)) {
        return
    }

    const newTab = children[newIndex].proxy
    const newName = getTabName(newTab, newIndex)
    const shouldEmitChange = state.currentIndex !== null

    if (state.currentIndex !== newIndex) {
        state.prevIndex = state.currentIndex
        state.currentIndex = newIndex
        state.animated = Math.abs(state.currentIndex - state.prevIndex) === 1

        if (!skipScrollIntoView) {
            scrollIntoView()
        }
        setLine()
    }

    if (newName !== active.value) {
        active.value = newName
        if (shouldEmitChange) {
            emits('change', newName, newTab.title)
        }
    }
}

function setLine() {
    const shouldAnimate = state.inited
    nextTick(() => {
        getTabsRect().then((tabRects) => {
            const offsetLeft = tabRects.slice(0, state.currentIndex).reduce((prev, curr) => prev + curr.width, 0)
            const { lineWidth, lineHeight } = props
            const left = offsetLeft + tabRects[state.currentIndex].width / 2 + (scrollable.value ? 8 : 0)

            const lineStyles = {
                width: addUnit(lineWidth),
                backgroundColor: props.color,
                transform: `translateX(${left}px) translateX(-50%)`,
            }

            if (shouldAnimate) {
                lineStyles.transitionDuration = `${props.duration}s`
            }

            if (isDef(lineHeight)) {
                const height = addUnit(lineHeight)
                lineStyles.height = height
                lineStyles.borderRadius = height
            }

            state.lineStyles = lineStyles
        })
    })
}

function setCurrentIndexByName(name, skipScrollIntoView) {
    const matched = children.find((tab, index) => getTabName(tab, index) === name)
    const index = matched ? children.indexOf(matched) : 0
    setCurrentIndex(index, skipScrollIntoView)
}

function scrollIntoView() {
    if (!scrollable.value) {
        return
    }

    Promise.all([getTabsRect(), getNavRect()]).then(([tabRects, navRect]) => {
        const tabRect = tabRects[state.currentIndex]
        const offsetLeft = tabRects.slice(0, state.currentIndex).reduce((prev, curr) => prev + curr.width, 0)

        state.scrollLeft = offsetLeft - (navRect.width - tabRect.width) / 2

        if (!state.scrollWithAnimation) {
            nextTick(() => {
                state.scrollWithAnimation = true
            })
        }
    })
}

function findAvailableTab(index) {
    const diff = index < state.currentIndex ? -1 : 1

    while (index >= 0 && index < children.length) {
        if (!children[index].proxy.disabled) {
            return index
        }

        index += diff
    }
}

function onRendered(name, title) {
    emits('rendered', name, title)
}

function onClickTab(item, index, event) {
    const { title, disabled } = children[index].proxy
    const name = getTabName(children[index].proxy, index)

    if (!disabled) {
        callInterceptor(props.beforeChange, {
            args: [name],
            done: () => {
                setCurrentIndex(index)
            },
        })
    }

    emits('clickTab', {
        name,
        title,
        event,
        disabled,
    })
}

linkChildren({
    props,
    active,
    onRendered,
    currentName,
})
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
