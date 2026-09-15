import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'

export default [
    // 1. 基礎 JavaScript 推薦設定
    js.configs.recommended,
    // { ignores: ['dist'] },

    {
        // 2. 指定套用這套規則的檔案範圍
        files: ['assets/**/*.{js,jsx}'],

        // 3. 整合 React 與 React Hooks 外掛
        plugins: {
            react,
            'react-hooks': reactHooks,
            // 'react-refresh': reactRefresh,
        },

        // 4. 代替舊版 parserOptions 與 env
        languageOptions: {
            ecmaVersion: 2020,  // 支援現代 ES6+ 語法
            sourceType: "module",
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true
                },
                // sourceType: 'module',
            },
            globals: {
                ...globals.browser, // 替代 env.browser
                ...globals.node     // 替代 env.node
            },
        },

        // 5. 套用 React、React Hooks 的推薦規則與你自訂的 rules
        rules: {
            ...js.configs.recommended.rules,
            // 載入 React 推薦規則
            ...react.configs.recommended.rules,

            ...react.configs['jsx-runtime'].rules,

            // 載入 React Hooks 推薦規則
            ...reactHooks.configs.recommended.rules,

            // 'react/jsx-no-target-blank': 'off',
            // 'react-refresh/only-export-components': [
            //     'warn',
            //     { allowConstantExport: true },
            // ],

            // 自訂規則 (0 代表 "off")
            "no-console": "off",
            "no-unused-vars": "off",
        },

        // 6. React 特定的設定（例如自動偵測版本）
        settings: {
            react: {
                version: 'detect'
            }
        },
    },
    {
        // 7. 全域排除不需要檢查的 Symfony 目錄
        ignores: ["public/assets/**/*", "var/**/*", "vendor/**/*", "node_modules/**/*"]
    }
]
