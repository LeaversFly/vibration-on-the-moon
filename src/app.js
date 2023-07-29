import { Application } from 'pixi.js';
import { AssetsManager } from './service/assets-manager';
import FightScene from './scenes/fight-scenes';

export default class MyApp extends Application {
    constructor() {
        super({
            resizeTo: window
        });
    }

    async startGame() {
        // 初始化资源管理器
        await AssetsManager.init({
            onProgress: (progress) => {
                // console.log('加载进度:', progress);
            },
        });

        // 创建起始场景
        const fightScene = new FightScene({
            app: this,
        });
        this.stage.addChild(fightScene);

        console.log(AssetsManager.assetsPacks);
    }
} 