import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
    { files: ['**/*.{js,vue}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    eslintConfigPrettier,
    eslintPluginPrettierRecommended,
    {
        languageOptions: {
            globals: {
                uni: true,
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
            'prettier/prettier': 'error',
        },
    },
]
