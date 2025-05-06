
import { Alpine } from 'alpinejs'
interface I18n {
    /**
   * 返回 name 翻譯後的文本
   * @param {string} name
   * @param  { {[name: string]: string} } vars
   * @returns
   */
    get(name: string, vars?: Record<string, any>): string | Record<string, any> | null
}
export interface ThemeState {
    theme: null | string
    dark: boolean
}
export class Theme {
    private readonly state_: ThemeState
    private readonly html_ = document.getElementsByTagName("html")[0]
    constructor(alpinejs: Alpine) {
        const state = alpinejs.reactive<ThemeState>({
            theme: null,
            dark: false
        })
        // 監聽系統主題變化
        const dark = window.matchMedia('(prefers-color-scheme:dark)')
        if (dark.matches) {
            state.dark = true
        } else {
            state.dark = false
        }
        dark.addEventListener('change', (event) => {
            if (event.matches) {
                state.dark = true
            } else {
                state.dark = false
            }
        })

        this.state_ = state
        this.setTheme(localStorage.getItem("theme"))
    }
    /**
     * 設置主題
     */
    setTheme(name: string | null) {
        const state = this.state_
        switch (name) {
            case "Dark":
                if (state.theme != name) {
                    state.theme = name
                    this.html_.setAttribute('data-theme', 'dark')
                    localStorage.setItem("theme", name)
                }
                break
            case "Light":
                if (state.theme != name) {
                    state.theme = name
                    this.html_.setAttribute('data-theme', 'light')
                    localStorage.setItem("theme", name)
                }
                break
            default:
                if (state.theme) {
                    state.theme = null
                    this.html_.removeAttribute('data-theme')
                    localStorage.removeItem("theme")
                }
                break
        }
    }
    /**
     * 返回用戶設置
     */
    getTheme() {
        return this.state_.theme
    }
    /**
     * 返回是否是黑色主題
     */
    get isDark() {
        const state = this.state_
        switch (state.theme) {
            case "Dark":
                return true
            case "Light":
                return false
        }
        return state.dark
    }
    /**
     * 返回系統是否爲黑色主題
     */
    get isAutoDark() {
        return this.state_.dark
    }
    /**
     * 檢查用戶設置
     */
    is(name: string | null) {
        return this.state_.theme === name
    }
    /**
     * 返回當前主題顏色
     */
    get color() {
        return this.isDark ? 'is-dark' : 'is-light'
    }
    /**
     * 返回當前圖標按鈕演示
     */
    get iconColor() {
        return this.isDark ? 'is-black' : 'is-white'
    }
}

export function initTHeme(alpinejs: Alpine, i18n: I18n) {
    const theme = new Theme(alpinejs)
    alpinejs.magic('theme', () => theme)
    alpinejs.data('theme', () => {
        return {
            iconColor() {
                return theme.iconColor
            },
            icon() {
                return theme.isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
            },
            auto() {
                return theme.isAutoDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'
            },

            isDark() {
                return theme.is('Dark') ? 'is-active' : ''
            },
            isLight() {
                return theme.is('Light') ? 'is-active' : ''
            },
            isAuto() {
                return theme.is(null) ? 'is-active' : ''
            },
            setDark() {
                theme.setTheme('Dark')
            },
            setLight() {
                theme.setTheme('Light')
            },
            setAuto() {
                theme.setTheme(null)
            },

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
            getAuto() {
                return i18n.get('Auto')
            },
        }
    })
    alpinejs.directive('nav-theme', el => {
        el.classList.add(
            'nav-item',
        )
        el.innerHTML = `<button class="button" :class="iconColor" @click="click" @click.outside="clickOutside">
<span class="icon">
    <i :class="icon"></i>
</span>
</button>
<div class="dropdown is-right" :class="isActive">
<div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
    <a class="dropdown-item" :class="isLight" @click="setLight">
        <span class="icon-text">
        <span class="icon">
            <i class="fa-solid fa-sun"></i>
        </span>
        <span>Light</span>
        </span>
    </a>
    <a class="dropdown-item" :class="isDark" @click="setDark">
        <span class="icon-text">
        <span class="icon">
            <i class="fa-solid fa-moon"></i>
        </span>
        <span>Dark</span>
        </span>
    </a>
    <hr class="dropdown-divider" />
    <a class="dropdown-item" :class="isAuto" @click="setAuto">
        <span class="icon-text">
        <span class="icon">
            <i :class="auto"></i>
        </span>
        <span x-text="getAuto"></span>
        </span>
    </a>
    </div>
</div>
</div>`
    })
    return theme
}