/**
 * 保證函數只被執行一次
 */
export function once(f: () => void) {
    let ok = true
    return () => {
        if (ok) {
            ok = false
            f()
        }
    }
}