import { Status } from "./status";
export interface Handler<PARAM, RESULT> {
    serve(ctx: Context<PARAM, RESULT>): void
}
export class Context<PARAM, RESULT> {
    constructor(
        readonly sender: chrome.runtime.MessageSender,
        private send_: undefined | ((result?: any) => void),
        private readonly req_: Request,
    ) { }
    /**
     * 如果已經中止則返回 true
     */
    get aborted() {
        return this.send_ ? true : false
    }
    get options() {
        return this.req_.options
    }
    get data(): PARAM {
        return this.req_.data
    }

    /**
     * 響應成功
     */
    ok(data: RESULT) {
        const f = this.send_
        if (f) {
            this.send_ = undefined
            f({
                code: Status.OK,
                data: data
            })
        }
    }
    /**
     * 以指定錯誤碼，響應任何請求
     */
    code(code: Status, reason?: any) {
        const f = this.send_
        if (f) {
            this.send_ = undefined
            f({
                code: code,
                reason: reason
            })
        }
    }
    /**
     * 不向請求方返回內容
     */
    silent() {
        this.send_ = undefined
    }
}

type Listener = (message: any, sender: chrome.runtime.MessageSender, sendResponse: () => void) => boolean | undefined
interface Request {
    /**
     * 請求的接口名稱
     */
    action: string
    /**
     * 請求的參數
     */
    data?: any
    /**
     * 額外的自定義設定
     */
    options?: Record<string, any>
}
export interface ServerOptions {
    /**
     * 在添加 action 之前調用
     * @param action 動作名稱
     * @param handler 處理接口
     * @returns 如果返回新的 handler，則使用新 handler 替換原本的 handler
     */
    beforAdd: (action: string, handler: Handler<any, any>) => Handler<any, any> | undefined | void
}
/**
 * 用於在 worker 中和內容頁面通信的服務器實現
 */
export class Server {
    /**
     * 定義一個虛擬地址，服務器只會處理發給 target 或 '*' 的消息 
     * @param addr 
     */
    constructor(readonly addr: string, private readonly opts?: ServerOptions) { }
    private router_ = new Map<string, Handler<any, any>>
    private callback_?: Listener
    /**
     * 返回服務是否已經啓動
     */
    get ok(): boolean {
        return this.callback_ ? true : false
    }
    /**
     * 啓動服務
     */
    start() {
        if (!this.callback_) {
            const callback: Listener = (message, sender, sendResponse: (result?: any) => void) => {
                if (typeof message === "object" &&
                    (message.target === '*' || message.target === this.addr)
                ) {
                    const req: Request = message
                    const handle = this.router_.get(req.action)
                    if (handle) {
                        let ctx: Context<any, any> | undefined
                        try {
                            ctx = new Context(
                                sender, sendResponse,
                                req,
                            )
                            handle.serve(ctx)
                        } catch (e) {
                            if (ctx) {
                                if (ctx.aborted) {
                                    // console.warn(e)
                                    return
                                }
                                sendResponse({
                                    code: Status.Unknown,
                                    reason: e,
                                })
                            } else {
                                sendResponse({
                                    code: Status.ResourceExhausted,
                                    reason: e,
                                })
                            }
                            return
                        }
                        if (ctx.aborted) {
                            return undefined
                        }
                        return true
                    }
                    sendResponse({
                        code: Status.Unimplemented,
                    })
                    return undefined
                }
                return undefined
            }
            chrome.runtime.onMessage.addListener(callback)
            this.callback_ = callback
        }
    }
    /**
     * 停止服務
     */
    stop() {
        const callback = this.callback_
        if (callback) {
            this.callback_ = undefined
            chrome.runtime.onMessage.removeListener(callback)
        }
    }

    /**
     * 添加一個 action
     * @param action 動作名稱
     * @param handler 處理函數
     */
    add<PARAM, RESULT>(action: string, handler: (ctx: Context<PARAM, RESULT>) => void): void
    /**
     * 添加一個 action
     * @param action 動作名稱
     * @param handler 處理函數
     */
    add<PARAM, RESULT>(action: string, handler: Handler<PARAM, RESULT>): void

    add(action: string, handler: any): void {
        if (typeof action !== "string") {
            throw new Error("action must be string")
        }
        let h: Handler<any, any>
        if (typeof handler === "function") {
            h = {
                serve(ctx) {
                    handler(ctx)
                },
            }
        } else if (typeof handler.serve === "function") {
            h = handler
        } else {
            throw new Error("handler invalid")
        }
        const f = this.opts?.beforAdd
        if (f) {
            const n = f(action, handler)
            if (typeof n === "object" && typeof n.serve === "function") {
                h = n
            }
        }
        this.router_.set(action, h)
    }
    addAll(actions: Array<{
        action: string
        handler: any
    }>): void {
        const items = actions.map((v) => {
            const action = v.action
            if (typeof action !== "string") {
                throw new Error("action must be string")
            }
            const handler = v.handler
            let h: Handler<any, any>
            if (typeof handler === "function") {
                h = {
                    serve(ctx: any) {
                        handler(ctx)
                    },
                }
            } else if (typeof handler.serve === "function") {
                h = handler
            } else {
                throw new Error("handle invalid")
            }

            const f = this.opts?.beforAdd
            if (f) {
                const n = f(action, handler)
                if (typeof n === "object" && typeof n.serve === "function") {
                    h = n
                }
            }

            return {
                action: action,
                handler: h
            }
        })
        const r = this.router_
        for (const item of items) {
            r.set(item.action, item.handler)
        }
    }
}
