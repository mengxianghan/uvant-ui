<template>
    <view>
        <template v-if="hideOnClickOutside">
            <van-overlay
                :show="show"
                :custom-class="bem('overlay')"
                :z-index="computedZIndex"
                @click="onClickOverlay"></van-overlay>
        </template>
        <van-transition
            name="van-slide-up"
            :show="show"
            :custom-class="
                bem({
                    unfit: !safeAreaInsetBottom,
                    'with-title': showTitle,
                })
            "
            :custom-style="normalizeStyle({ zIndex: computedZIndex })">
            <!--title-->
            <template v-if="showTitle">
                <view :class="bem('header')">
                    <!--left slot-->
                    <template v-if="slots['title-left']">
                        <view :class="bem('title-left')">
                            <slot name="title-left"></slot>
                        </view>
                    </template>
                    <!--title-->
                    <template v-if="title">
                        <view :class="bem('title')">{{ title }}</view>
                    </template>
                    <!--close-->
                    <template v-if="showClose">
                        <view
                            :class="[bem('close'), HAPTICS_FEEDBACK]"
                            @click="onClose">
                            {{ closeButtonText }}
                        </view>
                    </template>
                </view>
            </template>

            <!--body-->
            <view :class="bem('body')">
                <view :class="bem('keys')">
                    <number-keyboard-key
                        v-for="key in keys"
                        :key="key.text"
                        :text="key.text"
                        :type="key.type"
                        :wider="key.wider"
                        :color="key.color"
                        @press="onPress">
                        <template v-if="key.type === 'delete'">
                            <slot name="delete"></slot>
                        </template>
                        <template v-else-if="key.type === 'extra'">
                            <slot name="extra-key"></slot>
                        </template>
                    </number-keyboard-key>
                </view>

                <!--sidebar-->
                <template v-if="theme === 'custom'">
                    <view :class="bem('sidebar')">
                        <template v-if="showDeleteKey">
                            <number-keyboard-key
                                :text="deleteButtonText"
                                large
                                type="delete"
                                @press="onPress">
                                <slot name="delete"></slot>
                            </number-keyboard-key>
                        </template>
                        <number-keyboard-key
                            :text="closeButtonText"
                            :loading="closeButtonLoading"
                            large
                            type="close"
                            color="blue"
                            @press="onPress"></number-keyboard-key>
                    </view>
                </template>
            </view>
        </van-transition>
    </view>
</template>

<script setup>
import {
    createNamespace,
    makeStringProp,
    numericProp,
    makeNumericProp,
    truthProp,
    HAPTICS_FEEDBACK,
    isDef,
} from '../utils'
import { computed, onMounted, useSlots, watch, normalizeStyle } from 'vue'
import NumberKeyboardKey from './number-keyboard-key.vue'
import { useGlobalZIndex } from '../composables'

const props = defineProps({
    title: String,
    theme: makeStringProp('default'),
    zIndex: numericProp,
    teleport: [String, Object],
    maxlength: makeNumericProp(Infinity),
    transition: truthProp,
    blurOnClose: truthProp,
    showDeleteKey: truthProp,
    randomKeyOrder: Boolean,
    closeButtonText: String,
    deleteButtonText: String,
    closeButtonLoading: Boolean,
    hideOnClickOutside: truthProp,
    safeAreaInsetBottom: truthProp,
    extraKey: {
        type: [String, Array],
        default: '',
    },
})
const emits = defineEmits(['show', 'hide', 'blur', 'input', 'close', 'delete'])
const show = defineModel('show', { type: Boolean })
const modelValue = defineModel(makeStringProp(''))

const slots = useSlots()
const { bem } = createNamespace('number-keyboard')

const showTitle = computed(() => props.title || showClose.value || slots['title-left'])
const showClose = computed(() => props.closeButtonText && props.theme === 'default')
const keys = computed(() => (props.theme === 'custom' ? genCustomKeys() : genDefaultKeys()))
const computedZIndex = computed(() => (isDef(props.zIndex) ? +props.zIndex : useGlobalZIndex()))

watch(
    () => show.value,
    (val, oval) => {
        if (val === oval) return

        val ? open() : close()
    }
)

onMounted(() => {
    if (show.value) {
        open()
    }
})

function open() {
    show.value = true
}

function close() {
    show.value = false
}

function onClose() {
    emits('close')

    if (props.blurOnClose) {
        onBlur()
    }
}

function onBlur() {
    if (show.value) {
        emits('blur')
    }
}

function onClickOverlay() {
    if (props.hideOnClickOutside) {
        onBlur()
    }
}

function onPress(text, type) {
    if (text === '') {
        if (type === 'extra') {
            onBlur()
        }
        return
    }

    const value = props.modelValue

    if (type === 'delete') {
        emits('delete')
        modelValue.value = value.slice(0, value.length - 1)
    } else if (type === 'close') {
        onClose()
    } else if (value.length < +props.maxlength) {
        emits('input', text)
        modelValue.value = value + text
    }
}

function genCustomKeys() {
    const keys = genBasicKeys()
    const { extraKey } = props
    const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey]

    if (extraKeys.length === 0) {
        keys.push({ text: 0, wider: true })
    } else if (extraKeys.length === 1) {
        keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' })
    } else if (extraKeys.length === 2) {
        keys.push({ text: extraKeys[0], type: 'extra' }, { text: 0 }, { text: extraKeys[1], type: 'extra' })
    }

    return keys
}

function genBasicKeys() {
    const keys = Array(9)
        .fill('')
        .map((_, i) => ({ text: i + 1 }))

    if (props.randomKeyOrder) {
        shuffle(keys)
    }

    return keys
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    }
    return array
}

function genDefaultKeys() {
    return [
        ...genBasicKeys(),
        { text: props.extraKey, type: 'extra' },
        { text: 0 },
        {
            text: props.showDeleteKey ? props.deleteButtonText : '',
            type: props.showDeleteKey ? 'delete' : '',
        },
    ]
}
</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    options: {
        virtualHost: true,
        addGlobalClass: true,
        styleIsolation: 'shared',
    },
})
</script>

<style lang="scss">
@import './style.scss';
</style>
