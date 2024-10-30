import { inject, watch } from 'vue'

export const POPUP_TOGGLE_KEY = Symbol()

export function onPopupReopen(callback) {
    const popupToggleStatus = inject(POPUP_TOGGLE_KEY, null)

    if (popupToggleStatus) {
        watch(popupToggleStatus, (show) => {
            if (show) {
                callback()
            }
        })
    }
}
