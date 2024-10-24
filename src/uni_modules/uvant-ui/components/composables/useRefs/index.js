import { ref, onBeforeUpdate } from 'vue'

export function useRefs() {
    const refs = ref([])
    const cache = []

    onBeforeUpdate(() => {
        refs.value = []
    })

    const setRefs = (index) => {
        if (!cache[index]) {
            cache[index] = (el) => {
                refs.value[index] = el
            }
        }
        return cache[index]
    }

    return [refs, setRefs]
}
