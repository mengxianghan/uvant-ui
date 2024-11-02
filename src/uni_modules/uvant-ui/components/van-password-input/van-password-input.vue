<template>
    <view :class="bem()">
        <view
            :class="[bem('security'), { [BORDER_SURROUND]: !gutter }]"
            @touchstart.passive="onTouchStart">
            <view
                v-for="(item, index) in points"
                :key="index"
                :class="[
                    bem('item', { focus: item.showCursor }),
                    {
                        [BORDER_LEFT]: item.showBorder,
                    },
                ]">
                <template v-if="mask">
                    <view
                        :class="bem('point')"
                        :style="{ visibility: item.char ? 'visible' : 'hidden' }"></view>
                </template>
                <template v-else>
                    {{ item.char }}
                </template>
                <template v-if="item.showCursor">
                    <view :class="bem('cursor')"></view>
                </template>
            </view>
        </view>
        <template v-if="hasInfo">
            <view :class="bem(errorInfo ? 'error-info' : 'info')">
                {{ info }}
            </view>
        </template>
    </view>
</template>

<script setup>
import {
    createNamespace,
    truthProp,
    makeStringProp,
    makeNumericProp,
    numericProp,
    BORDER_SURROUND,
    BORDER_LEFT,
    addUnit,
} from '../utils'
import { computed } from 'vue'

const props = defineProps({
    info: String,
    mask: truthProp,
    gutter: numericProp,
    length: makeNumericProp(6),
    focused: Boolean,
    errorInfo: String,
})
const modelValue = defineModel('value', makeStringProp(''))
const emits = defineEmits(['focus'])

const { bem } = createNamespace('password-input')

const hasInfo = computed(() => props.errorInfo || props.info)
const points = computed(() => {
    const { mask, gutter, focused } = props
    return Array.from({ length: +props.length }, (_, i) => {
        const char = modelValue.value[i]
        const showBorder = i !== 0 && !gutter
        const showCursor = focused && i === modelValue.value.length

        let style
        if (i !== 0 && gutter) {
            style = { marginLeft: addUnit(gutter) }
        }

        return {
            style,
            mask,
            char,
            showCursor,
            showBorder,
        }
    })
})

function onTouchStart(event) {
    event.stopPropagation()
    emits('focus', event)
}
</script>

<style scoped lang="scss">
@import './style.scss';
</style>
