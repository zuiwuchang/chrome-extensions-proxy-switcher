import { Logger } from '../lib/log'
import { once } from '../lib/once'
const log = new Logger({
    prefix: 'switcher'
})
log.log("worker start")

const initialize = once(async () => {

    // // 獲取當前代理設定
    // const details = await chrome.proxy.settings.get({})
    // details.value.rules
    // console.log(details)
})
chrome.runtime.onStartup.addListener(initialize)
chrome.runtime.onInstalled.addListener(initialize)

