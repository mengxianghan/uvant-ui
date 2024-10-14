import { provide, reactive } from 'vue'

export function useChildren(key) {
    const publicChildren = reactive([])
    const internalChildren = reactive([])

    const linkChildren = (value) => {
        const link = (child) => {
            if (child.proxy) {
                internalChildren.push(child)
                publicChildren.push(child.proxy)
            }
        }

        const unlink = (child) => {
            const index = internalChildren.indexOf(child)
            publicChildren.splice(index, 1)
            internalChildren.splice(index, 1)
        }

        provide(
            key,
            Object.assign(
                {
                    link,
                    unlink,
                    children: publicChildren,
                    internalChildren,
                },
                value
            )
        )
    }

    return {
        children: publicChildren,
        linkChildren,
    }
}
