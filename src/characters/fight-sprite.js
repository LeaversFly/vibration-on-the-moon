import { AnimatedSprite } from 'pixi.js';

export default class FightSprite extends AnimatedSprite {
    constructor(options = {}) {
        super(options.animations);

        this.init();
    }

    async init() {
        this.anchor.set(0.5);
        this.animationSpeed = 0.2
        this.scale.set(3, 3)
    }

    /** 向左移动 */
    moveLeft(distance = 1) {
        this.x -= distance;
    }

    /** 向右移动 */
    moveRight(distance = 1) {
        this.x += distance;
    }

    /** 向上移动 */
    moveTop(distance = 1) {
        this.y -= distance;
    }

    /** 向下移动 */
    moveDown(distance = 1) {
        this.y += distance;
    }

    // 镜像翻转
    mirror() {
        this.scale.set(-3, 3)
    }

    // 扩展销毁操作
    destroy(options) {
        // 调用基类的 destroy 方法，保留原有的销毁流程
        super.destroy(options);
        // TODO: 释放我们新增的资源引用...
    }
}