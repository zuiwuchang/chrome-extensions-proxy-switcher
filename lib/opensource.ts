
import { Alpine } from 'alpinejs'
interface ITheme {
    iconColor: string
}
export function initOpensource(alpinejs: Alpine, theme: ITheme) {
    const sourceURL = 'https://github.com/zuiwuchang/chrome-extensions-proxy-switcher'
    alpinejs.data('opensource', () => {
        return {
            iconColor() {
                return theme.iconColor
            },
            click() {
                chrome.tabs.create({ url: sourceURL })
            },
        }
    })
    alpinejs.directive('nav-opensource', el => {
        el.classList.add(
            'nav-item',
        )
        el.innerHTML = `<button class="button" :class="iconColor" @click="click">
<span class="icon">
    <i class="fa-brands fa-github"></i>
</span>
</button>`
    })
    return theme
}