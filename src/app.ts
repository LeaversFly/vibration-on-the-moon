import { Application } from 'pixi.js';
import FightScene from './scenes/fight/fight-scenes';
import { BootLoader } from './scenes/boot-loader'
import { SceneManager } from './service/scene-manager'
import { team } from './config/character-config';

export default class MyApp extends Application {
    constructor() {
        super({
            resizeTo: window
        });
    }

    async startGame() {
        SceneManager.init({
            app: this,
            root: this.stage
        })

        const bootLoader = new BootLoader({
            onAssetsLoaded: () => {
                // 创建起始场景
                const fightScene = new FightScene({
                    app: this,
                    team: team
                });
                SceneManager.changeScene(fightScene);
            },
        });

        SceneManager.changeScene(bootLoader);
    }
} 