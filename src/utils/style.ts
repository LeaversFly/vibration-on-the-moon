/**
 * 重写样式
 * @param {string} tag dom元素名
 * @param {object} property style属性
 * @returns undefined
 */
export function rewirteStyle(tag: string | string[], property: Record<any, string> | Record<any, string>[]) {
    if (Array.isArray(tag) && Array.isArray(property)) {
        for (let i = 0; i < tag.length; i++) {
            const dom = document.querySelector(tag[i]) as HTMLElement
            dom.setAttribute('style', handle(property[i]))
        }
    } else if (typeof tag === 'string' && typeof property === 'object') {
        const dom = document.querySelector(tag) as HTMLElement
        dom.setAttribute('style', handle(property as Record<any, string>))
    } else {
        throw Error('Error paramters!')
    }
}

function handle(property: Record<any, string>) {
    let style = ''
    for (let key in property) {
        style += `${key}:${property[key]};`
    }
    return style
}