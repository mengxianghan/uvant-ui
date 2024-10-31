<template>
    <view :class="bem()">
        <view :class="bem('wrapper', { disabled })">
            <!-- 预览 -->
            <template
                v-for="(item, index) in fileList"
                :key="index">
                <view
                    :class="bem('preview')"
                    :style="getSizeStyle(previewSize)"
                    @click="onClickPreview(item, index)">
                    <template v-if="item.isImage">
                        <image
                            :class="bem('preview-image')"
                            :src="item.thumb || item.url"
                            :mode="imageFit"
                            :alt="item.name || `图片${index}`"
                            @click="onPreviewImage(item, index)" />
                    </template>
                    <template v-else-if="item.isVideo">
                        <video
                            :class="bem('preview-image')"
                            :src="item.thumb || item.url"
                            :title="item.name || `视频${index}`"
                            :poster="item.thumb"
                            :autoplay="item.autoplay"
                            :object-fit="videoFit"
                            :referrer-policy="referrerPolicy"
                            @click="onPreviewVideo(item, index)"></video>
                    </template>
                    <template v-else>
                        <view
                            :class="bem('file')"
                            @click="onPreviewFile(item, index)">
                            <view :class="bem('file-icon')">
                                <van-icon name="description"></van-icon>
                            </view>
                            <view :class="[bem('file-name'), 'van-ellipsis']">{{ item.name || item.url }}</view>
                        </view>
                    </template>

                    <!-- #ifdef H5 -->
                    <template v-if="slots['preview-cover']">
                        <view :class="bem('preview-cover')">
                            <slot
                                name="preview-cover"
                                :file="item"
                                :index="index"></slot>
                        </view>
                    </template>
                    <!-- #endif -->

                    <template v-if="['uploading', 'failed'].includes(item.status)">
                        <view :class="bem('mask')">
                            <!-- 上传中 icon -->
                            <template v-if="item.status === 'uploading'">
                                <view :class="bem('loading')">
                                    <van-loading></van-loading>
                                </view>
                            </template>
                            <!-- 上传失败 icon -->
                            <template v-if="item.status === 'failed'">
                                <view :class="bem('mask-icon')">
                                    <van-icon name="close"></van-icon>
                                </view>
                            </template>
                            <template v-if="item.message">
                                <view :class="bem('mask-message')">{{ item.message }}</view>
                            </template>
                        </view>
                    </template>

                    <!-- 删除按钮 -->
                    <template v-if="deletable || item.deletable">
                        <view
                            :class="bem('preview-delete', ['shadow'])"
                            @click.stop="onDeleteItem(item, index)">
                            <view :class="bem('preview-delete-icon')">
                                <slot name="preview-delete">
                                    <van-icon name="cross"></van-icon>
                                </slot>
                            </view>
                        </view>
                    </template>
                </view>
            </template>

            <!-- 上传按钮 -->
            <template v-if="isInCount">
                <template v-if="slots.default">
                    <view
                        :class="bem('input-wrapper')"
                        @click="startUpload">
                        <slot></slot>
                    </view>
                </template>
                <template v-else>
                    <view
                        :class="bem('upload')"
                        :style="getSizeStyle(previewSize)"
                        @click="startUpload">
                        <view :class="bem('upload-icon')">
                            <van-icon name="photograph"></van-icon>
                        </view>
                        <template v-if="!isNullOrEmpty(uploadText)">
                            <view :class="bem('upload-text')">{{ uploadText }}</view>
                        </template>
                    </view>
                </template>
            </template>
        </view>
    </view>
</template>

<script setup>
import { useSlots, computed, nextTick, ref } from 'vue'
import {
    createNamespace,
    makeNumericProp,
    makeStringProp,
    truthProp,
    makeArrayProp,
    numericProp,
    makeNumberProp,
    isPromise,
    isBoolean,
    getSizeStyle,
    toArray,
    callInterceptor,
} from '../utils'
import { chooseFile as _chooseFile, isImageFile, isVideoFile } from './utils'

const props = defineProps({
    name: makeNumericProp(''),
    accept: makeStringProp('image'),
    sizeType: makeArrayProp(['original', 'compressed']),
    previewSize: numericProp,
    previewImage: truthProp,
    previewFullImage: truthProp,
    previewFile: truthProp,
    multiple: Boolean,
    disabled: Boolean,
    showUpload: truthProp,
    deletable: truthProp,
    capture: makeArrayProp(['album', 'camera']),
    maxSize: {
        type: [Number, String, Function],
        default: Infinity,
    },
    maxCount: makeNumericProp(Infinity),
    uploadText: String,
    videoFit: makeStringProp('contain'),
    imageFit: makeStringProp('scaleToFill'),
    useBeforeRead: Boolean,
    compressed: truthProp,
    maxDuration: makeNumberProp(60),
    mediaType: makeArrayProp(['image', 'video', 'mix']),
    extension: Array,
    showmenu: truthProp,
    uploadIcon: makeStringProp('photograph'),
    camera: makeStringProp('back'),
    // readonly: Boolean,
    reupload: Boolean,
    afterRead: Function,
    beforeRead: Function,
    // beforeDelete: Function,
    referrerPolicy: makeStringProp('no-referrer'),
})
const emits = defineEmits(['beforeRead', 'afterRead', 'oversize', 'clickPreview', 'clickReupload', 'delete'])
const fileList = defineModel(makeArrayProp())

const slots = useSlots()
const { bem } = createNamespace('uploader')

const reuploadIndex = ref(-1)
const isReuploading = ref(false)

const isInCount = computed(() => fileList.value.length < props.maxCount)

function formatFileList(list) {
    return list.map((file) => ({
        ...file,
        isImage: isImageFile(file),
        isVideo: isVideoFile(file),
        deletable: isBoolean(file.deletable) ? file.deletable : true,
    }))
}

function getDetail(index) {
    return {
        name: props.name,
        index: index == null ? fileList.value.length : index,
    }
}

function onAfterRead(file) {
    file = formatFileList(toArray(file))
    const oversize = file.some((item) => item.file.size > props.maxSize)

    if (oversize) {
        emits('oversize', file, getDetail())
        return
    }

    if (reuploadIndex.value > -1) {
        const arr = [...fileList.value]
        arr.splice(reuploadIndex.value, 1, ...file)
        fileList.value = arr
        reuploadIndex.value = -1
    } else {
        fileList.value.push(...file)
    }

    if (typeof props.afterRead === 'function') {
        props.afterRead(file, getDetail())
    }

    emits('afterRead', file, getDetail())
}

function onBeforeRead(file) {
    let res = true

    if (typeof props.beforeRead === 'function') {
        res = props.beforeRead(file, getDetail())
    }

    if (props.useBeforeRead) {
        res = new Promise((resolve, reject) => {
            emits('beforeRead', file, {
                ...getDetail(),
                callback: (ok) => {
                    ok ? resolve() : reject()
                },
            })
        })
    }

    if (!res) {
        return
    }

    if (isPromise(res)) {
        res.then((data) => onAfterRead(data || file))
    } else {
        onAfterRead(file)
    }
}

function chooseFile() {
    if (props.disabled) return

    _chooseFile({
        accept: props.accept,
        multiple: props.multiple && reuploadIndex.value === -1,
        capture: props.capture,
        compressed: props.compressed,
        maxDuration: props.maxDuration,
        sizeType: props.sizeType,
        camera: props.camera,
        maxCount: props.maxCount - fileList.value.length,
        mediaType: props.mediaType,
        extension: props.extension,
    })
        .then((res) => {
            onBeforeRead(props.multiple ? res : res[0])
        })
        .catch((error) => {
            emits('error', error)
        })
}

function onPreviewImage(item, index) {
    if (props.reupload) {
        reuploadFile(index)
        return
    }

    if (!props.previewFullImage) return

    uni.previewImage({
        urls: fileList.value.filter((item) => isImageFile(item)).map((item) => item.url),
        current: item.url,
        showmenu: props.showmenu,
        fail() {
            uni.showToast({ title: '预览图片失败', icon: 'none' })
        },
    })
}

function onPreviewVideo(item, index) {
    if (props.reupload) {
        reuploadFile(index)
        return
    }

    if (!props.previewFullImage) return

    const sources = []

    const current = fileList.value.reduce((sum, cur, curIndex) => {
        if (!isVideoFile(cur)) {
            return sum
        }

        sources.push({ ...cur, type: 'video' })

        if (curIndex < index) {
            sum++
        }

        return sum
    }, 0)

    uni.previewMedia({
        sources,
        current,
        fail() {
            uni.showToast({ title: '预览视频失败', icon: 'none' })
        },
    })
}

function onPreviewFile(item, index) {
    if (props.reupload) {
        reuploadFile(index)
        return
    }

    if (!props.previewFile) return

    uni.openDocument({
        filePath: item.url,
        showMenu: true,
    })
}

function onClickPreview(item, index) {
    if (props.reupload) {
        emits('clickReupload', item, getDetail(index))
        return
    }
    emits('clickPreview', item, getDetail(index))
}

function onDeleteItem(item, index) {
    callInterceptor(item.beforeDelete, {
        args: [item, { name: item.name, index }],
        done: () => {
            fileList.value.splice(index, 1)
            emits('delete', item, getDetail(index))
        },
    })
}

function reuploadFile(index) {
    isReuploading.value = true
    reuploadIndex.value = index
    nextTick(() => chooseFile())
}

function startUpload() {
    if (!isReuploading.value) {
        reuploadIndex.value = -1
    }
    isReuploading.value = false
    chooseFile()
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
