/**
 * 重写样式
 * @param {string} tag dom元素名
 * @param {object} property style属性
 * @returns null
 */

function handle(property) {
    let style = ''
    for (let key in property) {
        style += `${key}:${property[key]};`
    }
    return style
}

export function rewirteStyle(tag, property) {
    if (Array.isArray(tag) && Array.isArray(property)) {
        for (let i = 0; i < tag.length; i++) {
            const dom = document.querySelector(tag[i])
            dom.style = handle(property[i])
        }
    } else if (typeof tag === 'string' && typeof property === 'object') {
        const dom = document.querySelector(tag)
        dom.style = handle(property)
    } else {
        throw Error('Error paramters!')
    }
}