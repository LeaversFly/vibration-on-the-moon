import BaseScene from '../base-scene'
import FightSprite from '../../characters/fight-sprite'
import { AssetsManager } from '../../service/assets-manager';
import { Application, BlurFilter, Graphics, Sprite } from 'pixi.js';
import { SkillButtonCreator } from './skill-button-creator';
import { SkillLineCreator } from './skill-line-creator';
import { FightSceneOptions } from '../../types/scenes';

export default class FightScene extends BaseScene {
    scenes
    members
    components

    constructor(options: FightSceneOptions) {
        // 调用基类构造函数，完成基础初始化
        super();

        this.scenes = this.createScene(options.app)

        this.components = this.createComponents(options.app)

        this.members = this.createMembers(options.app);

        this.bindEvents(options.app)
    }

    /**
     * 创建本场景背景
     * @param app 所属应用实例 
     */
    createScene(app: Application) {
        const bg = AssetsManager.assetsPacks.SPRITE_TEXTURE.BG_1
        const bgSprite = new Sprite(bg)
        bgSprite.width = app.screen.width
        bgSprite.height = app.screen.height
        this.addChild(bgSprite)

        return {
            bgSprite
        }
    }

    /**
     * 创建本场景组件
     * @param app 所属应用实例 
     */
    createComponents(app: Application) {
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
                words: '射击',
                style: { fill: 'white' }
            }
        })

        const button2 = skillButtonCreator.create({
            x: appWidth * 0.1,
            y: appHeight * 0.73,
            text: {
                words: '跳跃',
                style: { fill: 'white' }
            }
        })

        const skillLineCreator = new SkillLineCreator({
            lineStyle: {
                width: 8,
                color: '0xffffff'
            }
        })

        const line1 = skillLineCreator.create({
            x: appWidth / 2 - 200,
            y: appHeight / 2 + 10,
            lineTo: [[0, 50], [400, 50], [400, 0]]
        })


        this.addChild(container, button1.view, button2.view, line1)

        return {
            container,
            button1,
            button2,
            line1
        }
    }

    /**
    * 创建本场景成员
    * @param app 所属应用实例
    */
    createMembers(app: Application) {
        const { SHEET_SPINEBOY } = AssetsManager.assetsPacks

        //spineboy
        const spineboy = new FightSprite({ data: SHEET_SPINEBOY.spineData })
        spineboy.position.set(app.screen.width / 2, app.screen.height / 2)
        spineboy.stateData.setMix('idle', 'shoot', 0.2)
        spineboy.stateData.setMix('shoot', 'idle', 0.2)
        spineboy.stateData.setMix('jump', 'idle', 0.2)
        spineboy.stateData.setMix('idle', 'jump', 0.2)
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

        return {
            spineboy,
            enemy
        }
    }

    /**
    * 绑定本场景事件
    * @param app 所属应用实例
    */
    bindEvents(app: Application) {
        this.eventMode = 'static'
        const position = {
            spineboy: 3
        }

        this.on('wheel', (e) => {
            const scroll = Math.sign(e.deltaY) * Math.min(15, Math.abs(e.deltaY));
            //顺序不可颠倒
            if (scroll > 0) {
                if (position.spineboy + 1 > 3) {
                    this.members.spineboy.moveLeft(position.spineboy * 150)
                    this.components.line1.x -= position.spineboy * 150

                    position.spineboy = 0
                } else {
                    this.members.spineboy.moveRight(150)
                    this.components.line1.x += 150

                    position.spineboy += 1
                }
            } else {
                if (position.spineboy - 1 < 0) {
                    position.spineboy = 3

                    this.members.spineboy.moveRight(position.spineboy * 150)
                    this.components.line1.x += position.spineboy * 150
                } else {
                    this.members.spineboy.moveLeft(150)
                    this.components.line1.x -= 150

                    position.spineboy -= 1
                }
            }
        });
        this.components.button1.onPress.connect(() => {
            this.members.spineboy.state.setAnimation(0, 'shoot', false)
            this.members.spineboy.state.addAnimation(0, 'idle', true, 0)
        })
        this.components.button2.onPress.connect(() => {
            this.members.spineboy.state.setAnimation(0, 'jump', false)
            this.members.spineboy.state.addAnimation(0, 'idle', true, 0)
        })
    }

    /**
     * 开始游戏
     * @param {object} options 
     */
    startFight(options: unknown) {
        const myTeam = [
            {
                hp: 100
            }
        ]
        const enemyTeam = [
            {
                hp: 100
            }
        ]
        let i = 1
        while (myTeam[0].hp > 0 || enemyTeam[0].hp > 0) {
            console.log(`回合${i}开始！`);

            let seconds = 60
            let timer = setInterval(() => {
                seconds--
                console.log(`你还有${seconds}秒！`);
            }, 1000);

            if (seconds === 0) {
                clearInterval(timer)
                console.log('回合结束！');
            }

        }
    }
}