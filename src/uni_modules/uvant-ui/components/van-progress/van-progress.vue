<template>
    <view
        :class="bem()"
        :style="{
            background: trackColor,
            height: addUnit(strokeWidth),
        }">
        <view
            :class="bem('portion', { inactive })"
            :style="{
                width: `${percentage}%`,
                background,
            }">
        </view>

        <template v-if="showPivot && text">
            <view
                :class="bem('pivot', { inactive })"
                :style="{
                    color: textColor,
                    left: `${+percentage}%`,
                    transform: `translate(-${+percentage}%,-50%)`,
                    background: pivotColor || background,
                }">
                {{ text }}
            </view>
        </template>
    </view>
</template>

<script setup>
import { createNamespace, defaultTo, numericProp, truthProp, addUnit } from '../utils'
import { computed } from 'vue'

const props = defineProps({
    color: String,
    inactive: Boolean,
    pivotText: String,
    textColor: String,
    showPivot: truthProp,
    pivotColor: String,
    trackColor: String,
    strokeWidth: numericProp,
    percentage: {
        type: numericProp,
        default: 0,
        validator: (value) => +value >= 0 && +value <= 100,
    },
})

const { bem } = createNamespace('progress')

const background = computed(() => (props.inactive ? undefined : props.color))
const text = computed(() => defaultTo(props.pivotText, `${props.percentage}%`))
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
