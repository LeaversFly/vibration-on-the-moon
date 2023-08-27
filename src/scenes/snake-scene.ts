import MovableSprite from '../characters/movable-sprite';
import { Application, Container, Graphics, TextStyle, Text, Sprite } from 'pixi.js';
import { AssetsManager } from '../service/assets-manager';

export default class SnakeScene extends Container implements IScene {
    private scenes

    constructor(options: { app: Application }) {
        // 调用基类构造函数，完成基础初始化
        super();

        //创建本场景背景
        this.scenes = this.createScene(options.app)

        // 创建本场景成员
        this.createMembers(options.app);
    }

    /**
     * 创建本场景背景
     * @param app 所属应用实例
     */
    createScene(app: Application) {
        const appWidth = app.screen.width
        const appHeight = app.screen.height

        const sider1Params = {
            x: appWidth * 0.01,
            y: appHeight * 0.02,
            width: appWidth * 0.21,
            height: appHeight * 0.96
        }

        const scoreBoardParams = {
            x: sider1Params.x + sider1Params.width + appWidth * 0.01,
            y: appHeight * 0.02,
            width: appWidth * 0.54,
            height: appHeight * 0.12
        }

        const scoreBgParams = {
            x: scoreBoardParams.x + appWidth * 0.01,
            y: scoreBoardParams.y + appHeight * 0.01,
            width: appWidth * 0.52,
            height: appHeight * 0.10
        }

        const scoreParams = {
            x: scoreBgParams.x + appWidth * 0.01,
            y: scoreBgParams.y + appHeight * 0.01,
            fontFamily: 'DigitalNumbers',
            fontSize: appWidth * 0.03,
            fill: '#35d9db',
        }

        const mainParams = {
            x: scoreBoardParams.x,
            y: scoreBoardParams.y + scoreBoardParams.height + appHeight * 0.02,
            width: appWidth * 0.54,
            height: appHeight * 0.82
        }

        const sider2Params = {
            x: scoreBoardParams.x + scoreBoardParams.width + appWidth * 0.01,
            y: appHeight * 0.02,
            width: appWidth * 0.21,
            height: appHeight * 0.96
        }

        const snakeBoardParams = {
            x: mainParams.x + appWidth * 0.01,
            y: mainParams.y + appHeight * 0.01,
            width: appWidth * 0.52,
            height: appHeight * 0.80
        }

        // 背景色
        const bg = new Graphics().beginFill('#02212e').drawRect(0, 0, appWidth, appHeight)

        // 两侧边栏
        const sider1 = new Graphics().beginFill('#b0c8d0')
            .drawRoundedRect(sider1Params.x, sider1Params.y, sider1Params.width, sider1Params.height, 20)

        const sider2 = new Graphics().beginFill('#b0c8d0')
            .drawRoundedRect(sider2Params.x, sider2Params.y, sider2Params.width, sider2Params.height, 20)

        // 计分板
        const scoreBoard = new Graphics().beginFill('#b0c8d0')
            .drawRoundedRect(scoreBoardParams.x, scoreBoardParams.y, scoreBoardParams.width, scoreBoardParams.height, 20)

        const scoreBg = new Graphics().beginFill('#03212f')
            .drawRoundedRect(scoreBgParams.x, scoreBgParams.y, scoreBgParams.width, scoreBgParams.height, 20)

        const score = new Text('SCORE:000000000000123', new TextStyle({ ...scoreParams }))
        score.position.set(scoreParams.x, scoreParams.y)

        // 游戏区
        const main = new Graphics().beginFill('#b0c8d0')
            .drawRoundedRect(mainParams.x, mainParams.y, mainParams.width, mainParams.height, 20)
            
        const snakeBoard = new Sprite(AssetsManager.assetsPacks.SPRITE_TEXTURE.SNAKE_BACKGROUND)
        snakeBoard.position.set(snakeBoardParams.x, snakeBoardParams.y)
        snakeBoard.width = snakeBoardParams.width
        snakeBoard.height = snakeBoardParams.height

        this.addChild(bg, sider1, sider2, scoreBoard, main, scoreBg, score, snakeBoard)

        return {
            bg,
            sider1,
            sider2,
            scoreBoard,
            scoreBg,
            main,
        }
    }

    /**
    * 创建本场景成员
    * @param app 所属应用实例
    */
    createMembers(app: Application) {
        // const sprite1 = new MovableSprite({ operational: true });
        // sprite1.position.set(app.screen.width / 2, app.screen.height / 2);
        // sprite1.moveLeft(400);

        // this.addChild(sprite1);
    }
}