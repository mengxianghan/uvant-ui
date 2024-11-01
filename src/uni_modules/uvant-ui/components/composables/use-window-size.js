import { ref } from 'vue'

let width
let height

export function useWindowSize() {
    if (!width) {
        width = ref(0)
        height = ref(0)

        update()

        // #ifdef H5
        window.addEventListener('resize', update, { passive: true })
        window.addEventListener('orientationchange', update, { passive: true })
        // #endif

        // #ifdef MP-WEIXIN
        uni.startDeviceMotionListening(update)
        // #endif
    }

    function update() {
        const systemInfo = uni.getSystemInfoSync()
        width.value = systemInfo.windowWidth
        height.value = systemInfo.windowHeight
    }

    return { width, height }
}
