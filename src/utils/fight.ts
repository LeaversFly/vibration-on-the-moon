/**
 * 阻塞进程
 * @param seconds 时间间隔
 * @param callback 一定时间间隔后执行的回调
 * @param now 立即执行的函数
 */
export async function blockProcess(seconds: number, callback: () => void): Promise<void>
export async function blockProcess(seconds: number, callback: () => void, now?: ((resolve: any) => void)): Promise<void>
export async function blockProcess(
    seconds: number,
    callback: () => void,
    now?: ((resolve: any) => void) | null,
) {
    await new Promise<void>((resolve) => {
        now ? now(resolve) : null
        let timer = setTimeout(() => {
            callback()
            clearTimeout(timer)
            resolve()
        }, seconds)
    })
}