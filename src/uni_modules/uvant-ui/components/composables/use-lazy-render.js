import { ref, watch } from 'vue'

/**
 *
 * @param {boolean | undefined} show
 * @returns
 */
export function useLazyRender(show) {
    const inited = ref(false)

    watch(
        show,
        (value) => {
            if (value) {
                inited.value = value
            }
        },
        { immediate: true }
    )

    return (render) => () => (inited.value ? render() : null)
}
