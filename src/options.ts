
import { Alpine } from 'alpinejs'
import { initTHeme } from '../lib/theme'
import { I18n, initI18n } from '../lib/i18n'
import { initOpensource } from "../lib/opensource"
declare const Alpine: Alpine

interface MenuItem {
    id: string
    active(): string
    text(): string | Record<string, any> | null
    click(): void
}
interface AppData {
    id: string
    general: Array<MenuItem>
}
class App {
    readonly data: AppData
    constructor(readonly alpinejs: Alpine, readonly i18n: I18n) {
        this.data = alpinejs.reactive({
            id: '::version',
            general: [
                this._createStatic('version', 'fa-solid fa-info'),
                this._createStatic('sync', 'fa-solid fa-rotate'),
                this._createStatic('proxy', 'fa-solid fa-wrench'),
            ],
        })
    }
    private _createStatic(key: string, icon: string) {
        const id = `::${key}`
        const text = `options.${key}`
        return {
            id: id,
            icon: icon,
            active: () => this.data.id === id ? 'is-active' : '',
            text: () => this.i18n.get(text),
            click: () => {
                this.data.id = id
            },
        }
    }
    getGeneral() {
        return this.i18n.get('options.general')
    }
    getProfile() {
        return this.i18n.get('options.profile')
    }
    isVersion() {
        return this.data.id == '::version' ? 'is-active' : ''
    }
    isSync() {
        return this.data.id == '::sync' ? 'is-active' : ''
    }
    isProxy() {
        return this.data.id == '::proxy' ? 'is-active' : ''
    }

}
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    const theme = initTHeme(Alpine, i18n)
    initOpensource(Alpine, theme)

    Alpine.data('title', () => ({
        getTitle() {
            return i18n.get('options.title')
        },
    }))
    Alpine.data('app', () => new App(Alpine, i18n))
})