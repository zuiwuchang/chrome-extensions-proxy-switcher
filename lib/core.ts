export type Callback<T> = () => T

/**
 * CSP 下 Alpine 會對 undefined 報警告，解決方法是使用 null 替代 undefined
 */
export type Nullable<T> = T | null

/**
 * Alpine 和 class 一起工作的很差，不能在構造函數中初始化，需要確保 this 指向 Proxy 對象，
 * 這個函數就是在做這兩件事情，在 init 中爲用到的子類實例調用這個函數進行初始化
 */
export function initProxyClass(instance: any) {
    const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).filter(
        (name) => typeof instance[name] === 'function' && name !== 'constructor'
    )
    methods.forEach((methodName) => {
        instance[methodName] = instance[methodName].bind(instance)
    })
    instance.init()
}