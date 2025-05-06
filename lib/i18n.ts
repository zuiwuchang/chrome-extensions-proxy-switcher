import { Alpine } from 'alpinejs'
import { Completer } from './completer'
import { zhHant } from '../i18n/zh_hant'
import { zhHans } from '../i18n/zh_hans'
import { enUS } from '../i18n/en_us'
export interface I18nState {
    locale: null | Language
    assets: null | Record<string, any>
}
export interface Language {
    id: string
    name: string
    match(v: string): boolean
    assets?: any
    merge?: Record<string, any>
    /**
     * 匹配順序，值越大越先進行匹配
     */
    sort: number
    /**
     * 是否爲默認語言
     */
    default?: boolean
}
interface Locale {
    id: string
    name: string
}
export class I18n {
    constructor(readonly alpinejs: Alpine, items: Array<Language>) {
        this.state_ = alpinejs.reactive<I18nState>({
            locale: null,
            assets: null,
        })
        this._init(items)
    }
    private state_: I18nState
    private locales_ = new Completer<Array<Locale>>()
    private matchd_?: Array<Language>
    private default_?: Language
    private initialized_ = false
    private _init(items: Array<Language>) {
        if (this.initialized_) {
            console.warn('alpinejs-i18n repeat initialization')
            return
        }
        const locales: Array<Locale> = []
        const matchd: Array<Language> = []
        const language = localStorage.getItem("language")
        let locale: Language | null = null
        for (const item of items) {
            locales.push({
                id: item.id,
                name: item.name,
            })
            if (item.default) {
                this.default_ = item
            }
            matchd.push(item)
            if (item.id == language) {
                locale = item
            }
        }
        if (!this.default_) {
            throw new Error("not define defualt lang")
        }
        matchd.sort((a, b) => b.sort - a.sort)


        if (locale) {
            this.state_.locale = locale
        }
        this.matchd_ = matchd
        this.initialized_ = true

        this._load(locale ?? this.getDisplay())
        this.locales_.resolve(locales)
    }
    /**
     * @returns 返回所有支持的語言列表
     */
    getLocaleList() {
        return this.locales_.promise
    }
    /**
     * @returns {string}  返回當前設置的語言 id
     */
    getLocale() {
        const locale = this.state_.locale
        if (locale) {
            return locale.id
        }
        return null
    }
    /**
     * 檢查用戶設置
     */
    is(name: string | null) {
        const locale = this.state_.locale
        if (locale) {
            return locale.id === name
        }
        return name === null || name === undefined
    }
    /**
     * 設置當前語言
     */
    setLocale(id: string | null | undefined) {
        if (!this.initialized_) {
            throw new Error('alpinejs-i18n not initialized')
        }

        const state = this.state_
        if (id === null || id === undefined) {
            if (state.locale) {
                state.locale = null
                localStorage.removeItem("language")
                this._load(this.getDisplay())
            }
            return
        }
        const locale = state.locale
        if (locale && locale.id === id) {
            return
        }

        for (const m of this.matchd_!) {
            if (m.id === id) {
                if (state.locale != m) {
                    state.locale = m
                    localStorage.setItem("language", m.id)
                    this._load(m)
                }
                return
            }
        }
        if (state.locale) {
            state.locale = null
            localStorage.removeItem("language")
            this._load(this.getDisplay())
        }
    }

    /**
     * 返回 name 翻譯後的文本
     * @param {string} name
     * @param  { {[name: string]: string} } vars
     * @returns
     */
    get(name: string, vars?: Record<string, any>) {
        let o = this.state_.assets
        if (o === null || o === undefined) {
            return name
        }
        // found message
        for (const k of name.split('.')) {
            o = o[k]
            if (o === null || o === undefined) {
                throw new Error(`not found ${name}`)
            }
        }
        // replace vars
        for (const key in vars) {
            if (o && o.replaceAll) {
                if (Object.prototype.hasOwnProperty.call(vars, key)) {
                    const val = vars[key]
                    const regexp = new RegExp('\\${s*(' + key + ')s*}', 'g')
                    o = o.replaceAll(regexp, val)
                }
            }
        }
        return o
    }
    /**
     * 返回語言是否就緒
     */
    get assets() {
        return this.state_.assets ? true : false
    }

    /**
     * 返回當前應該顯示的語言環境
     */
    getDisplay(): Language {
        if (!this.initialized_) {
            throw new Error('alpinejs-i18n not initialized')
        }

        const locale = this.state_.locale
        if (locale) {
            return locale
        }

        for (let lang of navigator.languages) {
            lang = lang.toLowerCase()
            for (const m of this.matchd_!) {
                if (m.match(lang)) {
                    return m
                }
            }
        }
        return this.default_!
    }
    /**
     * 加載語言資源
     */
    async _load(lang: Language) {
        try {
            let o
            if (typeof lang.assets === "function") {
                o = await lang.assets()
            } else {
                o = await lang.assets
            }
            const state = this.state_
            if (!state.assets || lang.id == this.getDisplay().id) {
                const m = lang.merge
                if (m) {
                    for (const k in m) {
                        o[k] = m[k]
                    }
                    lang.merge = undefined
                }
                state.assets = o
            }
        } catch (e) {
            console.warn(e)
        }
    }

}
export function initI18n(alpinejs: Alpine) {
    const i18n = new I18n(alpinejs,
        [
            {
                // 語言 id 必須唯一
                id: 'zh_hant',
                // 語言顯示名稱
                name: '🇹🇼 繁體中文',
                // 匹配順序，值越大越先進行匹配
                sort: 1,
                // 匹配函數
                match(locale: string) {
                    return locale == 'zh' || locale.startsWith('zh-')
                },
                assets: zhHant,
            },
            {
                id: 'zh_hans',
                name: '🇨🇳 简体中文',
                sort: 2,
                match(locale: string) {
                    return locale.startsWith('zh-') && (locale.indexOf('cn') != -1 || locale.indexOf('hans') != -1)
                },
                assets: zhHans,
            },
            {
                id: 'en',
                name: '🇺🇸 English',
                sort: 0,
                match(locale: string) {
                    return locale == 'en' || locale.startsWith('en-')
                },
                default: true,
                assets: enUS,
            },
        ])
    // alpinejs.magic('_', () => ((name: string, vars?: Record<string, any>) => {
    //     return i18n.get(name, vars)
    // }))
    alpinejs.data('i18n', () => {
        return {

            active: false,
            isActive() {
                return this.active ? 'is-active' : ''
            },
            click() {
                this.active = !this.active
            },
            clickOutside() {
                this.active = false
            },

            isAuto() {
                return i18n.is(null) ? 'is-active' : ''
            },
            setAuto() {
                i18n.setLocale(null)
            },
            isEn() {
                return i18n.is('en') ? 'is-active' : ''
            },
            setEn() {
                i18n.setLocale('en')
            },
            isZhHant() {
                return i18n.is('zh_hant') ? 'is-active' : ''
            },
            setZhHant() {
                i18n.setLocale('zh_hant')
            },
            isZhHans() {
                return i18n.is('zh_hans') ? 'is-active' : ''
            },
            setZhHans() {
                i18n.setLocale('zh_hans')
            },

            getAuto() {
                let tag: string
                switch (i18n.getDisplay().id) {
                    case 'zh_hant':
                        tag = '🇹🇼 '
                        break
                    case 'zh_hans':
                        tag = '🇨🇳 '
                        break
                    default:
                        tag = '🇺🇸 '
                        break
                }
                return tag + i18n.get('Auto')
            },
        }
    })
    alpinejs.directive('nav-i18n', el => {
        el.classList.add(
            'nav-item',
        )
        el.setAttribute('x-on:click.outside', "clickOutside")
        el.innerHTML = ` <button class="button" :class="$theme.iconColor" @click="click">
<span class="icon">
    <i class="fa-solid fa-language"></i>
</span>
</button>

<div class="dropdown is-right" :class="isActive">
<div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
    <a class="dropdown-item" :class="isEn" @click="setEn">
        <span>🇺🇸 English</span>
    </a>
    <a class="dropdown-item" :class="isZhHans" @click="setZhHans">
        <span>🇨🇳 简体中文</span>
    </a>
    <a class="dropdown-item" :class="isZhHant" @click="setZhHant">
        <span>🇹🇼 繁體中文</span>
    </a>
    <hr class="dropdown-divider" />
    <a class="dropdown-item" :class="isAuto" @click="setAuto">
        <span x-text="getAuto"></span>
    </a>
    </div>
</div>
</div>`
    })
    return i18n
}