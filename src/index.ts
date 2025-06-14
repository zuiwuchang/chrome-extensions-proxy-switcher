
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
import { initI18n } from '../lib/i18n'
import { initOpensource } from "../lib/opensource"

declare const Alpine: Alpine
interface ListElement {

}
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    const theme = initTHeme(Alpine, i18n)
    initOpensource(Alpine, theme)

    Alpine.data('list', () => ({
        fixed: new Array<ListElement>(),
        items: [
            { id: 'a', name: 'A' },
            { id: 'b', name: 'B' },
            { id: 'c', name: 'C' },
        ],
        active: '_d',
        isDirect() {
            return this.active === '_d' ? 'is-active' : ''
        },
        isSystem() {
            return this.active === '_s' ? 'is-active' : ''
        },
        isAuto() {
            return this.active === '_a' ? 'is-active' : ''
        },
        clickSystem() {
            console.log("System")
            window.close()
        },
        clickDirect() {
            console.log("Direct")
            window.close()
        },
        clickAuto() {
            console.log("Auto")
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
        tAuto() {
            return i18n.get("Auto Detect")
        },
        tSettings() {
            return i18n.get("Settings")
        },

    }))
})