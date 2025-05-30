
import { Alpine } from 'alpinejs'
import { Nullable, initProxyClass } from "../lib/core";
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

function createFixedMenuItem(app: { id: string, i18n: I18n, },
    opts: { key: string, icon: string, }) {
    const id = `::${opts.key}`
    const text = `options.${opts.key}`
    return {
        id: id,
        icon: opts.icon,
        active: () => app.id === id ? 'is-active' : '',
        text: () => app.i18n.get(text),
        click: () => app.id = id,
    }
}
function pushServer(strs: Array<string>, name: string, conf?: chrome.proxy.ProxyServer) {
    if (conf) {
        strs.push(`${name} ${conf.scheme}://${conf.host}:${conf.port}`)
    }
}
class ProxyView {
    mode: Nullable<string> = null
    rules: Nullable<chrome.proxy.ProxyRules> = null
    pacScript: Nullable<chrome.proxy.PacScript> = null
    init() {
        const update = (details: {
            value: chrome.proxy.ProxyConfig
            levelOfControl: chrome.types.LevelOfControl
            incognitoSpecific?: boolean
        }) => {
            const o = details.value
            this.mode = o.mode
            this.rules = o.rules ?? null
            this.pacScript = o.pacScript ?? null
        }
        chrome.proxy.settings.get({}).then((details) => {
            if (this.mode === null) {
                update(details)
            }
        })
        chrome.proxy.settings.onChange.addListener(update)
    }
    mandatory() {
        return this.pacScript?.mandatory ? true : false
    }
    hasURL() {
        return this.pacScript?.url ? true : false
    }
    hasScript() {
        return this.pacScript?.data ? true : false
    }
    bypassList() {
        return this.rules?.bypassList?.join("\n") ?? ''
    }
    servers() {
        const strs: string[] = []
        const rules = this.rules
        if (rules) {
            pushServer(strs, 'Single', rules.singleProxy)
            pushServer(strs, 'HTTPS', rules.proxyForHttps)
            pushServer(strs, 'HTTP', rules.proxyForHttp)
            pushServer(strs, 'FTP', rules.proxyForFtp)
            pushServer(strs, 'Fallback', rules.fallbackProxy)
        }
        return strs
    }
}

class App {
    /**
     * 當前選擇的菜單項目
     */
    id = '::proxy'
    /**
     * 固定菜單項
     */
    fixed: Nullable<MenuItem[]> = null
    constructor(readonly i18n: I18n) { }
    init() {
        // 創建 固定菜單
        this.fixed = [
            createFixedMenuItem(this, {
                key: 'version',
                icon: 'fa-solid fa-info',
            }),
            createFixedMenuItem(this, {
                key: 'sync',
                icon: 'fa-solid fa-rotate',
            }),
            createFixedMenuItem(this, {
                key: 'proxy',
                icon: 'fa-solid fa-wrench',
            }),
        ]

        // 初始化代理視圖
        initProxyClass(this.proxy)
    }

    isVersion() { return this.fixed![0].active() }
    isSync() { return this.fixed![1].active() }
    isProxy() { return this.fixed![2].active() }
    proxy = new ProxyView()

    tGeneral() { return this.i18n.get('options.general') }
    tProfile() { return this.i18n.get('options.profile') }
}
document.addEventListener('alpine:init', () => {
    const i18n = initI18n(Alpine)
    const theme = initTHeme(Alpine, i18n)
    initOpensource(Alpine, theme)

    Alpine.data('title', () => ({
        getTitle: () => i18n.get('options.title'),
    }))
    Alpine.data('app', () => new App(i18n))
})