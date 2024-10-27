<template>
    <view
        :class="
            bem({
                vertical,
            })
        ">
        <view
            :class="
                bem('spinner', {
                    [type]: !hasIcon,
                })
            "
            :style="{
                color: color,
                ...getSizeStyle(size),
            }">
            <slot name="icon">
                <template v-if="'spinner' === type">
                    <view
                        v-for="item in 12"
                        :key="item"
                        :class="bem('dot')"></view>
                </template>
            </slot>
        </view>
        <template v-if="slots.default">
            <view
                :class="bem('text')"
                :style="{
                    fontSize: isDef(textSize) ? addUnit(textSize) : '',
                    color: textColor || color,
                }">
                <slot></slot>
            </view>
        </template>
    </view>
</template>

<script setup>
import { computed, useSlots } from 'vue'
import { addUnit, getSizeStyle, isDef, createNamespace, makeStringProp, numericProp } from '../utils'

defineProps({
    color: String,
    type: makeStringProp('circular'),
    size: numericProp,
    textSize: numericProp,
    textColor: String,
    vertical: Boolean,
})
const slots = useSlots()
const { bem } = createNamespace('loading')

const hasIcon = computed(() => slots.icon)
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
