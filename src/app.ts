import { Application } from 'pixi.js';
import { BootLoader } from './scenes/boot-loader'
import { SceneManager } from './service/scene-manager'
import SnakeScene from './scenes/snake-scene';
import { AssetsManager } from './service/assets-manager';

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
                // const { addTeam, getTeam } = useTeam()
                // addTeam([
                //     IRENE,
                //     SYDONQ
                // ])
                // const fightScene = new FightScene({
                //     app: this,
                //     team: getTeam()
                // });
                const snakeScene = new SnakeScene({
                    app: this
                })
                SceneManager.changeScene(snakeScene);
                console.log(AssetsManager.assetsPacks);
            },
        });

        SceneManager.changeScene(bootLoader);
    }
} 