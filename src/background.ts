import { Logger } from '../lib/log'
import { once } from '../lib/once'
import { Server } from '../lib/channel/server'
import {
    StorageAction,
    storageLocalGet, storageLocalSet,
} from "../lib/channel/storage/server";
const log = new Logger({
    prefix: 'worker'
})
log.log("worker start")


const initialize = once(async () => {

    // 創建通信服務器
    const server = new Server('worker', {
        beforAdd(action, _) {
            log.log('add action:', action)
        },
    })

    server.addAll([
        {
            action: StorageAction.LocalGet,
            handler: storageLocalGet,
        },
        {
            action: StorageAction.LocalSet,
            handler: storageLocalSet,
        },
    ])

    server.start()
})
chrome.runtime.onStartup.addListener(initialize)
chrome.runtime.onInstalled.addListener(initialize)

