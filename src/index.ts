
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
declare const Alpine: Alpine
document.addEventListener('alpine:init', () => {
    initTHeme(Alpine)

    Alpine.data('list', () => ({
        open: false,
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