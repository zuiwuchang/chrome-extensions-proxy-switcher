
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
import { initI18n } from '../lib/i18n'
declare const Alpine: Alpine
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    initTHeme(Alpine, i18n)

    Alpine.data('list', () => ({
        items: [
            { id: 'a', name: 'A' },
            { id: 'b', name: 'B' },
            { id: 'c', name: 'C' },
        ],
        clickSystem() {
            console.log("System")
            window.close()
        },
        clickDirect() {
            console.log("Direct")
            window.close()
        },
        clickSettings() {
            chrome.runtime.openOptionsPage()
            window.close()
        },
        tSystem() {
            return i18n.get("System")
        },
        tDirect() {
            return i18n.get("Direct")
        },
        tSettings() {
            return i18n.get("Settings")
        },
    }))
})