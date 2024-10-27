<template>
    <view
        :class="
            bem({
                [span]: span,
                [`offset-${offset}`]: offset,
            })
        "
        :style="styles"
        @click="handleClick">
        <slot></slot>
    </view>
</template>

<script>
export default {
    options: { virtualHost: true },
}
</script>

<script setup>
import { computed } from 'vue'
import { useParent } from '../composables'
import { createNamespace, numericProp } from '../utils'

defineProps({
    span: numericProp,
    offset: numericProp,
})

const emits = defineEmits(['click'])

const { parent, index } = useParent('van-row')
const { bem } = createNamespace('col')

const styles = computed(() => {
    if (!parent) {
        return
    }

    const { spaces, verticalSpaces } = parent
    let styles = {}
    if (spaces && spaces.value && spaces.value[index.value]) {
        const { left, right } = spaces.value[index.value]
        styles = {
            paddingLeft: left ? `${left}px` : null,
            paddingRight: right ? `${right}px` : null,
        }
    }

    const { bottom } = verticalSpaces.value[index.value] || {}

    return Object.assign(styles, {
        marginBottom: bottom ? `${bottom}px` : null,
    })
})

function handleClick(e) {
    emits('click', e)
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
