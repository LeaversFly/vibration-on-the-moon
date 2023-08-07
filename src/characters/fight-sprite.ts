import { ISkeletonData, Spine } from 'pixi-spine'

export default class FightSprite extends Spine {
    constructor(options: { data: ISkeletonData }) {
        super(options.data);

        this.init();
    }

    init() {
        this.scale.set(0.5)
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
        this.scale.set(-0.5, 0.5)
    }

    // 扩展销毁操作
    destroy(options: unknown) {
        // 调用基类的 destroy 方法，保留原有的销毁流程
        super.destroy(options);
        // TODO: 释放我们新增的资源引用...
    }
}