import { Status } from "./status"

export interface Options<PARAM> {
    target: string
    action: string
    data?: PARAM
    options?: Record<string, any>
}

/**
 * 發送一個請求，並等待響應
 */
export async function send<PARAM, RESULT>(opts: Options<PARAM>): Promise<RESULT> {
    const resp = await chrome.runtime.sendMessage(opts)
    if (typeof resp !== "object") {
        console.warn("unknow result:", resp)
        throw new Error("unknow result")
    } else if (resp.code === Status.OK) {
        return resp.data
    } else {
        throw resp
    }

}