
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
import { initI18n } from '../lib/i18n'
declare const Alpine: Alpine
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    initTHeme(Alpine, i18n)

    Alpine.data('list', () => ({


    }))
})