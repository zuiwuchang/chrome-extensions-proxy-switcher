export enum Action {
    LocalGet = 'chrome.storage.local.get',
    LocalSet = 'chrome.storage.local.set',
}

export type StorageGetRequest = string | string[] | Record<string, any>


