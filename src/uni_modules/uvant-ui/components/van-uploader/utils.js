import { isImageUrl, isVideoUrl, omit } from '../utils'

export function isImageFile(item) {
    if (item.isImage != null) {
        return item.isImage
    }

    if (item.type) {
        return item.type === 'image'
    }

    if (item.url) {
        return isImageUrl(item.url)
    }

    return false
}

export function isVideoFile(item) {
    if (item.isVideo != null) {
        return item.isVideo
    }

    if (item.type) {
        return item.type === 'video'
    }

    if (item.url) {
        return isVideoUrl(item.url)
    }

    return false
}

function formatImage(res) {
    return res.tempFiles.map((item) => ({
        ...omit(item, ['path']),
        name: item.name,
        file: item,
        type: 'image',
        url: item.path,
        thumb: item.path,
    }))
}

function formatVideo(res) {
    return [
        {
            ...omit(res, ['tempFilePath', 'thumbTempFilePath', 'errMsg']),
            name: res.name,
            duration: res.duration,
            file: res.tempFile,
            type: 'video',
            url: res.tempFilePath,
            thumb: res.thumbTempFilePath,
        },
    ]
}

function formatMedia(res) {
    return res.tempFiles.map((item) => ({
        ...omit(item, ['fileType', 'thumbTempFilePath', 'tempFilePath']),
        name: item.name,
        file: item,
        type: item.fileType,
        url: item.tempFilePath,
        thumb: item.fileType === 'video' ? item.thumbTempFilePath : item.tempFilePath,
    }))
}

function formatFile(res) {
    return res.tempFiles.map((item) => ({
        ...omit(item, ['path']),
        url: item.path,
    }))
}

export function chooseFile({
    accept,
    multiple,
    capture,
    compressed,
    maxDuration,
    sizeType,
    camera,
    maxCount,
    mediaType,
    extension,
}) {
    return new Promise((resolve, reject) => {
        switch (accept) {
            case 'image':
                // if (isPC || isWxWork) {
                uni.chooseImage({
                    count: multiple ? Math.min(maxCount, 9) : 1,
                    sourceType: capture,
                    sizeType,
                    success: (res) => resolve(formatImage(res)),
                    fail: reject,
                })
                // } else {
                //     uni.chooseMedia({
                //         count: multiple ? Math.min(maxCount, 9) : 1,
                //         mediaType: ['image'],
                //         sourceType: capture,
                //         maxDuration,
                //         sizeType,
                //         camera,
                //         success: (res) => resolve(formatImage(res)),
                //         fail: reject,
                //     })
                // }
                break
            case 'media':
                uni.chooseMedia({
                    count: multiple ? Math.min(maxCount, 9) : 1,
                    mediaType,
                    sourceType: capture,
                    maxDuration,
                    sizeType,
                    camera,
                    success: (res) => resolve(formatMedia(res)),
                    fail: reject,
                })
                break
            case 'video':
                uni.chooseVideo({
                    sourceType: capture,
                    compressed,
                    maxDuration,
                    camera,
                    success: (res) => resolve(formatVideo(res)),
                    fail: reject,
                })
                break
            default:
                uni.chooseMessageFile({
                    count: multiple ? maxCount : 1,
                    type: accept,
                    ...(extension ? { extension } : {}),
                    success: (res) => resolve(formatFile(res)),
                    fail: reject,
                })
                break
        }
    })
}
