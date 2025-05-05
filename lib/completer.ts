export class Completer<T> {
    private resolve_?: (v: T) => void
    private reject_?: (e: unknown) => void
    readonly promise: Promise<T>
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve_ = resolve
            this.reject_ = reject
        })
    }
    get isCompleted(): boolean {
        return this.resolve_ ? false : true
    }
    resolve(v: T) {
        const f = this.resolve_
        if (f) {
            this.resolve_ = undefined
            this.reject_ = undefined
            f(v)
        }
    }
    reject(e: unknown) {
        const f = this.reject_
        if (f) {
            this.resolve_ = undefined
            this.reject_ = undefined
            f(e)
        }
    }
}