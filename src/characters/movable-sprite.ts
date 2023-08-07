import { Sprite } from 'pixi.js';
import { AssetsManager } from '../service/assets-manager';
import { keyMove } from '../utils/keyboard';
import { MovableSpriteOptions } from '../types/scenes';

export default class MovableSprite extends Sprite {
    interactive = false;

    constructor(options: MovableSpriteOptions) {
        super();

        this.init(options);
    }

    operational = false

    init(options: MovableSpriteOptions) {
        this.operational = options.operational

        this.texture = AssetsManager.assetsPacks.SPRITE_TEXTURE.F_CHARACTER
        this.anchor.set(0.5);

        this.interactive = this.operational
        if (this.operational) keyMove(this)
    }

    /** 向左移动 */
    moveLeft(distance = 1) {
        this.x -= distance;
    }

    /** 向右移动的 */
    moveRight(distance = 1) {
        this.x += distance;
    }

    /** 向上移动的 */
    moveTop(distance = 1) {
        this.y -= distance;
    }

    /** 向下移动的 */
    moveDown(distance = 1) {
        this.y += distance;
    }

    // 扩展销毁操作
    destroy(options: undefined) {
        // 调用基类的 destroy 方法，保留原有的销毁流程
        super.destroy(options);
        // TODO: 释放我们新增的资源引用...
    }
}