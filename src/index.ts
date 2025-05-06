
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
import { initI18n } from '../lib/i18n'
declare const Alpine: Alpine
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    initTHeme(Alpine, i18n)

    Alpine.data('list', () => ({
        open: false,
        items: [
            { id: 'a', name: 'A' },
            { id: 'b', name: 'B' },
            { id: 'c', name: 'C' },
        ],
        message: 'this is a message',
        toggle() {
            this.open = !this.open
        },
        openOptions() {
            console.log('openOptions', chrome.runtime.openOptionsPage)
            chrome.runtime.openOptionsPage()
        },
    }))
})