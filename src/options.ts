
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
import { initI18n } from '../lib/i18n'
import { initOpensource } from "../lib/opensource"
declare const Alpine: Alpine
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    const theme = initTHeme(Alpine, i18n)
    initOpensource(Alpine, theme)

    Alpine.data('list', () => ({


    }))
})