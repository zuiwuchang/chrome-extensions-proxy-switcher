
import { Alpine } from 'alpinejs'
import { Theme } from '../lib/theme'
declare const Alpine: Alpine
document.addEventListener('alpine:init', () => {
    const alpinejs = Alpine

    //     // i18n
    //     {
    //         interface I18nState {
    //             locale: null | Language
    //             assets: null | Record<string, any>
    //         }
    //         interface Language {
    //             id: string
    //             name: string
    //             match(v: string): boolean
    //             assets?: any
    //             merge?: Record<string, any>
    //             /**
    //              * 匹配順序，值越大越先進行匹配
    //              */
    //             sort: number
    //             /**
    //              * 是否爲默認語言
    //              */
    //             default?: boolean
    //         }
    //         interface Locale {
    //             id: string
    //             name: string
    //         }
    //         class I18nHelper {
    //             static init(i18n: I18nHelper, items: Array<Language>) {
    //                 i18n._init(items)
    //             }
    //             private state_ = Alpine.reactive<I18nState>({
    //                 locale: null,
    //                 assets: null,
    //             })
    //             private locales_ = new Complater<Array<Locale>>()
    //             private matchd_?: Array<Language>
    //             private default_?: Language
    //             private initialized_ = false
    //             private _init(items: Array<Language>) {
    //                 if (this.initialized_) {
    //                     console.warn('alpinejs-i18n repeat initialization')
    //                     return
    //                 }
    //                 const locales = []
    //                 const matchd = []
    //                 const language = localStorage.getItem("language")
    //                 let locale: Language | null = null
    //                 for (const item of items) {
    //                     locales.push({
    //                         id: item.id,
    //                         name: item.name,
    //                     })
    //                     if (item.default) {
    //                         this.default_ = item
    //                     }
    //                     matchd.push(item)
    //                     if (item.id == language) {
    //                         locale = item
    //                     }
    //                 }
    //                 if (!this.default_) {
    //                     throw new Error("not define defualt lang")
    //                 }
    //                 matchd.sort((a, b) => b.sort - a.sort)


    //                 if (locale) {
    //                     this.state_.locale = locale
    //                 }
    //                 this.matchd_ = matchd
    //                 this.initialized_ = true

    //                 this._load(locale ?? this.getDisplay())
    //                 this.locales_.resolve(locales)
    //             }
    //             /**
    //              * @returns 返回所有支持的語言列表
    //              */
    //             getLocaleList() {
    //                 return this.locales_.promise
    //             }
    //             /**
    //              * @returns {string}  返回當前設置的語言 id
    //              */
    //             getLocale() {
    //                 const locale = this.state_.locale
    //                 if (locale) {
    //                     return locale.id
    //                 }
    //                 return null
    //             }
    //             /**
    //              * 檢查用戶設置
    //              */
    //             is(name: string | null) {
    //                 const locale = this.state_.locale
    //                 if (locale) {
    //                     return locale.id === name
    //                 }
    //                 return name === null || name === undefined
    //             }
    //             /**
    //              * 設置當前語言
    //              */
    //             setLocale(id: string | null | undefined) {
    //                 if (!this.initialized_) {
    //                     throw new Error('alpinejs-i18n not initialized')
    //                 }

    //                 const state = this.state_
    //                 if (id === null || id === undefined) {
    //                     if (state.locale) {
    //                         state.locale = null
    //                         localStorage.removeItem("language")
    //                         this._load(this.getDisplay())
    //                     }
    //                     return
    //                 }
    //                 const locale = state.locale
    //                 if (locale && locale.id === id) {
    //                     return
    //                 }

    //                 for (const m of this.matchd_!) {
    //                     if (m.id === id) {
    //                         if (state.locale != m) {
    //                             state.locale = m
    //                             localStorage.setItem("language", m.id)
    //                             this._load(m)
    //                         }
    //                         return
    //                     }
    //                 }
    //                 if (state.locale) {
    //                     state.locale = null
    //                     localStorage.removeItem("language")
    //                     this._load(this.getDisplay())
    //                 }
    //             }

    //             /**
    //              * 返回 name 翻譯後的文本
    //              * @param {string} name
    //              * @param  { {[name: string]: string} } vars
    //              * @returns
    //              */
    //             get(name: string, vars?: Record<string, any>) {
    //                 let o = this.state_.assets
    //                 if (o === null || o === undefined) {
    //                     return name
    //                 }

    //                 // found message
    //                 for (const k of name.split('.')) {
    //                     o = o[k]
    //                     if (o === null || o === undefined) {
    //                         throw new Error(`not found ${name}`)
    //                     }
    //                 }
    //                 // replace vars
    //                 for (const key in vars) {
    //                     if (o && o.replaceAll) {
    //                         if (Object.prototype.hasOwnProperty.call(vars, key)) {
    //                             const val = vars[key]
    //                             const regexp = new RegExp('\\${s*(' + key + ')s*}', 'g')
    //                             o = o.replaceAll(regexp, val)
    //                         }
    //                     }
    //                 }
    //                 return o
    //             }
    //             /**
    //              * 返回語言是否就緒
    //              */
    //             get assets() {
    //                 return this.state_.assets ? true : false
    //             }

    //             /**
    //              * 返回當前應該顯示的語言環境
    //              */
    //             getDisplay(): Language {
    //                 if (!this.initialized_) {
    //                     throw new Error('alpinejs-i18n not initialized')
    //                 }

    //                 const locale = this.state_.locale
    //                 if (locale) {
    //                     return locale
    //                 }

    //                 for (let lang of navigator.languages) {
    //                     lang = lang.toLowerCase()
    //                     for (const m of this.matchd_!) {
    //                         if (m.match(lang)) {
    //                             return m
    //                         }
    //                     }
    //                 }
    //                 return this.default_!
    //             }
    //             /**
    //              * 加載語言資源
    //              */
    //             async _load(lang: Language) {
    //                 try {
    //                     let o
    //                     if (typeof lang.assets === "function") {
    //                         o = await lang.assets()
    //                     } else {
    //                         o = await lang.assets
    //                     }
    //                     const state = this.state_
    //                     if (!state.assets || lang.id == this.getDisplay().id) {
    //                         const m = lang.merge
    //                         if (m) {
    //                             for (const k in m) {
    //                                 o[k] = m[k]
    //                             }
    //                             lang.merge = undefined
    //                         }
    //                         state.assets = o
    //                     }
    //                 } catch (e) {
    //                     console.warn(e)
    //                 }
    //             }

    //         }
    //         const i18n = new I18nHelper()
    //         alpinejs.store('i18n-default', (o?: Record<string, any>) => {
    //             return [
    //                 {
    //                     // 語言 id 必須唯一
    //                     id: 'zh_hant',
    //                     // 語言顯示名稱
    //                     name: '🇹🇼 正體中文',
    //                     // 匹配順序，值越大越先進行匹配
    //                     sort: 1,
    //                     // 匹配函數
    //                     match(locale: string) {
    //                         return locale == 'zh' || locale.startsWith('zh-')
    //                     },
    //                     merge: {
    //                         _: {
    //                             theme: "主題",
    //                             language: "語言",
    //                             footer: "這裏提供了一些實用的在線工具，供各位免費使用！",
    //                         },
    //                     },
    //                     assets: o ? o['zh_hant'] : undefined,
    //                 },
    //                 {
    //                     id: 'zh_hans',
    //                     name: '🇨🇳 简体中文',
    //                     sort: 2,
    //                     match(locale: string) {
    //                         return locale.startsWith('zh-') && (locale.indexOf('cn') != -1 || locale.indexOf('hans') != -1)
    //                     },
    //                     merge: {
    //                         _: {
    //                             theme: "主题",
    //                             language: "语言",
    //                             footer: "这里提供了一些实用的在线工具，供各位免费使用！",
    //                         },
    //                     },
    //                     assets: o ? o['zh_hans'] : undefined,
    //                 },
    //                 {
    //                     id: 'en',
    //                     name: '🇺🇸 English',
    //                     sort: 0,
    //                     match(locale: string) {
    //                         return locale == 'en' || locale.startsWith('en-')
    //                     },
    //                     merge: {
    //                         _: {
    //                             theme: "Theme",
    //                             language: "Language",
    //                             footer: "Here are some useful online tools for you to use for free!",
    //                         },
    //                     },
    //                     default: true,
    //                     assets: o ? o['en'] : undefined,
    //                 },
    //             ]
    //         })
    //         function setAssets(name: string, item: Language, debug: boolean) {
    //             const file = name + '.' + item.id + '.json' + (debug ? `?id=${Date.now()}` : '')
    //             let c: Complater<void> | undefined
    //             item.assets = async () => {
    //                 if (c) {
    //                     return c.promise
    //                 }
    //                 c = new Complater()
    //                 try {
    //                     const o = await (await fetch(file)).json()
    //                     // await new Promise((resolve) => setTimeout(resolve, 5 * 1000))
    //                     c.resolve(o)
    //                 } catch (e) {
    //                     const c0 = c
    //                     c = undefined
    //                     return c0.promise
    //                 }
    //                 return c.promise
    //             }
    //         }
    //         alpinejs.store('i18n', (name: string, items: Array<Language>, debug: boolean) => {
    //             for (const item of items) {
    //                 if (item.assets === null || item.assets === undefined) {
    //                     setAssets(name, item, debug)
    //                 }
    //             }
    //             I18nHelper.init(i18n, items)
    //         })
    //         alpinejs.magic('_', () => ((name: string, vars?: Record<string, any>) => {
    //             return i18n.get(name, vars)
    //         }))
    //         alpinejs.magic('i18n', () => i18n)
    //     }
    // theme
    // initTHeme(alpinejs)

    //     Alpine.directive('nav', el => {
    //         el.classList.add(
    //             'navbar',
    //         )
    //         el.setAttribute(':class', "$theme.color")
    //         el.innerHTML = `<div class="container">
    // <div class="navbar-brand">
    //     <a href="/" class="navbar-item">
    //         <span class="icon-text">
    //             <span class="icon"><i class="fa-solid fa-house"></i></span>
    //             <span>HOME</span>
    //         </span>
    //     </a>

    //     <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="menuActiveClass"
    //         @click="menuActive=!menuActive">
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //         <span aria-hidden="true"></span>
    //     </a>
    // </div>

    // <div class="navbar-menu" :class="menuActiveClass">
    //     <div class="navbar-end">
    //         <div class="navbar-item has-dropdown is-hoverable">
    //             <a class="navbar-link" x-text="$_('_.language')"></a>
    //             <div class="navbar-dropdown is-boxed is-right">
    //                 <template x-for="locale in $i18n.getLocaleList()">
    //                     <a class="navbar-item" @click="$i18n.setLocale(locale.id)">
    //                         <i
    //                             :class="$i18n.is(locale.id)?'fa-regular fa-circle-check' : 'fa-regular fa-circle'"></i>
    //                         <span x-text="locale.name"></span>
    //                     </a>
    //                 </template>
    //                 <hr class="navbar-divider">
    //                 <a class="navbar-item" @click="$i18n.setLocale(null)">
    //                     <i :class="$i18n.is(null)?'fa-regular fa-circle-check' : 'fa-regular fa-circle'"></i>
    //                     <span>System</span>
    //                 </a>
    //             </div>
    //         </div>
    //         <div class="navbar-item has-dropdown is-hoverable">
    //             <a class="navbar-link" x-text="$_('_.theme')"></a>
    //             <div class="navbar-dropdown is-boxed is-right">
    //                 <a class="navbar-item" @click="setTheme('Dark')"><i :class="isTheme('Dark')"></i>
    //                     Dark</a>
    //                 <a class="navbar-item" @click="setTheme('Light')"><i :class="isTheme('Light')"></i>
    //                     Light</a>
    //                 <hr class="navbar-divider">
    //                 <a class="navbar-item" @click="setTheme(null)">
    //                     <i :class="isTheme(null)"></i>
    //                     System
    //                 </a>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // </div>`
    //     })
})