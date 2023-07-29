import MovableSprite from '../characters/movable-sprite';
import FightSprite from '../characters/fight-sprite'
import BaseScene from './base-scene'
import { AssetsManager } from '../service/assets-manager';

export default class FirstScene extends BaseScene {
    constructor(options) {
        // 调用基类构造函数，完成基础初始化
        super();

        // 创建本场景成员
        this.createMembers(options.app);
    }

    /**
    * 创建本场景成员
    * @param app 所属应用实例
    */
    createMembers(app) {
        const sprite1 = new MovableSprite({ operational: true });
        sprite1.position.set(app.screen.width / 2, app.screen.height / 2);
        sprite1.moveLeft(400);

        const master = new FightSprite();
        master.position.set(app.screen.width / 2, app.screen.height / 2);
        master.moveLeft(200);

        master.play()

        this.addChild(sprite1, master);
    }
}