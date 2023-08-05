import BaseScene from '../base-scene'
import FightSprite from '../../characters/fight-sprite'
import { AssetsManager } from '../../service/assets-manager';
import { BlurFilter, Graphics, Sprite } from 'pixi.js';
import { SkillButtonCreator } from './skill-button-creator';

export default class FightScene extends BaseScene {
    constructor(options) {
        // 调用基类构造函数，完成基础初始化
        super();

        this.createScene(options.app)

        this.createComponents(options.app)

        this.createMembers(options.app);

        this.bindEvents(options.app)
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
     * 创建本场景组件
     * @param app 所属应用实例 
     */
    createComponents(app) {
        const appWidth = app.screen.width
        const appHeight = app.screen.height

        // 技能面板
        const container = new Graphics()
        container.beginFill('#29333d').drawRect(0, appHeight * 0.6, appWidth, appHeight * 0.4);
        const containerBlur = new BlurFilter()
        container.filters = [containerBlur]

        const skillButtonCreator = new SkillButtonCreator({
            beginFill: '#29333d',
            lineStyle: { width: 4, color: '#fbfbfb' },
            width: appWidth * 0.4,
            height: 60,
            radius: 8,
        })

        const button1 = skillButtonCreator.create({
            x: appWidth * 0.1,
            y: appHeight * 0.65,
            text: {
                words: '技能1',
                style: { fill: 'white' }
            }
        })

        const button2 = skillButtonCreator.create({
            x: appWidth * 0.1,
            y: appHeight * 0.73,
            text: {
                words: '技能2',
                style: { fill: 'white' }
            }
        })

        this.addChild(container, button1.view, button2.view)
    }

    /**
    * 创建本场景成员
    * @param app 所属应用实例
    */
    createMembers(app) {
        const { SHEET_SPINEBOY } = AssetsManager.assetsPacks

        //spineboy
        const spineboy = new FightSprite({ data: SHEET_SPINEBOY.spineData })
        spineboy.position.set(app.screen.width / 2, app.screen.height / 2)
        spineboy.stateData.setMix('idle', 'shoot', 0.2)
        spineboy.stateData.setMix('shoot', 'idle', 0.2)
        spineboy.eventMode = 'auto'
        spineboy.state.setAnimation(0, 'idle', true)

        //enemy
        const enemy = new FightSprite({ data: SHEET_SPINEBOY.spineData })
        enemy.position.set(app.screen.width / 2, app.screen.height / 2)
        enemy.state.setAnimation(0, 'idle', true)

        // 友方统一在左
        spineboy.moveLeft(200);
        // 敌方统一在右,且反转
        enemy.mirror()
        enemy.moveRight(200);

        this.addChild(spineboy, enemy);
    }

    /**
    * 绑定本场景事件
    * @param app 所属应用实例
    */
    bindEvents(app) {
        this.interactive = true
        const position = {
            spineboy: 3
        }

        this.on('wheel', (e) => {
            const scroll = Math.sign(e.deltaY) * Math.min(15, Math.abs(e.deltaY));
            //顺序不可颠倒
            if (scroll > 0) {
                if (position.spineboy + 1 > 3) {
                    this.children[4].moveLeft(position.spineboy * 150)
                    position.spineboy = 0
                } else {
                    this.children[4].moveRight(150)
                    position.spineboy += 1
                }
            } else {
                if (position.spineboy - 1 < 0) {
                    position.spineboy = 3
                    this.children[4].moveRight(position.spineboy * 150)
                } else {
                    this.children[4].moveLeft(150)
                    position.spineboy -= 1
                }
            }
        });
        this.children[2].on('click', (e) => {
            this.children[4].state.setAnimation(0, 'shoot')
            this.children[4].state.addAnimation(0, 'idle', true, 0)
        })
    }
}