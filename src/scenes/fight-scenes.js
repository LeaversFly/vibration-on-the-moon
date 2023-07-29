import BaseScene from './base-scene'
import FightSprite from '../characters/fight-sprite'
import { AssetsManager } from '../service/assets-manager';
import { Sprite } from 'pixi.js';

export default class FightScene extends BaseScene {
    constructor(options) {
        // 调用基类构造函数，完成基础初始化
        super();

        this.createScene(options.app)

        this.createMembers(options.app);

        this.createEvents(options.app)
    }

    /**
     * 创建本场景背景
     * @param app 所属应用实例 
     */
    createScene(app) {
        const bg = AssetsManager.assetsPacks.SPRITE_TEXTURE.BG_1
        const bgSprite = new Sprite(bg)
        bgSprite.width = app.screen.width
        bgSprite.height = app.screen.height
        this.addChild(bgSprite)
    }

    /**
    * 创建本场景成员
    * @param app 所属应用实例
    */
    createMembers(app) {
        const pack = AssetsManager.assetsPacks
        const masterBreath = new FightSprite({ animations: pack.SHEET_MASTER.animations.MASTER_BREATH });
        const masterAttack = new FightSprite({ animations: pack.SHEET_MASTER.animations.MASTER_ATTACK });
        const masterArr = {
            masterBreath,
            masterAttack
        }
        masterAttack.visible = false
        masterBreath.interactive = true
        masterBreath.position.set(app.screen.width / 2, app.screen.height / 2);
        masterBreath.play()

        const gustBreath = new FightSprite({ animations: pack.SHEET_GUST.animations.GUST_BREATH });
        const gustAttack = new FightSprite({ animations: pack.SHEET_GUST.animations.GUST_ATTACK });
        gustAttack.visible = false
        gustBreath.position.set(app.screen.width / 2, app.screen.height / 2);
        gustBreath.play()

        // 友方统一在左
        masterBreath.moveLeft(200);
        // 敌方统一在右,且反转
        gustBreath.mirror()
        gustBreath.moveRight(200);
        // 所有人的y轴位置
        masterBreath.moveTop(100)
        gustBreath.moveTop(100)

        this.addChild(masterBreath, masterAttack, gustBreath, gustAttack);
    }

    /**
    * 创建本场景事件
    * @param app 所属应用实例
    */
    createEvents(app) {
        this.interactive = true
        const position = {
            master: 3
        }
        this.addEventListener('wheel', (e) => {
            const scroll = Math.sign(e.deltaY) * Math.min(15, Math.abs(e.deltaY));
            //顺序不可颠倒
            if (scroll > 0) {
                if (position.master + 1 > 3) {
                    this.children[1].moveLeft(position.master * 150)
                    position.master = 0
                } else {
                    this.children[1].moveRight(150)
                    position.master += 1
                }
            } else {
                if (position.master - 1 < 0) {
                    position.master = 3
                    this.children[1].moveRight(position.master * 150)
                } else {
                    this.children[1].moveLeft(150)
                    position.master -= 1
                }
            }
        });
        console.log(this.children);
        this.children[1].addEventListener('click', (e) => {
            this.children[1].visible = false
            this.children[2].visible = true
            this.children[2].play()
        })
    }
}