import { ref, reactive } from 'vue'
import { deepAssign } from '../utils'
import defaultMessages from './lang/zh-CN'

const lang = ref('zh-CN')

const messages = reactive({
    'zh-CN': defaultMessages,
})

export const Locale = {
    /**
     * @returns {object<string, any>}
     */
    messages() {
        return messages[lang.value]
    },

    /**
     * @param {string} newLang
     * @param {object<string, any>} [newMessages]
     */
    use(newLang, newMessages) {
        lang.value = newLang
        this.add({ [newLang]: newMessages })
    },

    /**
     * @param {object} newMessages
     */
    add(newMessages) {
        deepAssign(messages, newMessages)
    },
}

export const useCurrentLang = () => lang

export default Locale
