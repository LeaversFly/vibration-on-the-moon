import { Spine } from 'pixi-spine'
import { FightSpriteOptions } from '../types/characters';

export default class FightSprite extends Spine {
    constructor(options: FightSpriteOptions) {
        super(options.data);

        this.init(options);
    }

    init(options: FightSpriteOptions) {
        const { scale = 0.4 } = options
        this.scale.set(scale)
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
        this.scale.set(-this.scale.x, this.scale.y)
    }

    // 扩展销毁操作
    destroy(options: unknown) {
        // 调用基类的 destroy 方法，保留原有的销毁流程
        super.destroy(options);
        // TODO: 释放我们新增的资源引用...
    }
}