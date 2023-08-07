// src/scenes/boot-loader.ts
import { Container, Text } from 'pixi.js';

import { AssetsManager } from '../service/assets-manager';

const LOG_HEADER = '[boot-loader]';

export class BootLoader extends Container {
    private txtProgress: Text | undefined;
    onAssetsLoaded;
    members;

    constructor(options: { onAssetsLoaded: () => void }) {
        super();

        this.onAssetsLoaded = options.onAssetsLoaded;

        this.members = this.createMembers();

        this.bindEvents();

        this.startLoad();
    }

    async startLoad() {
        // 开始加载
        await AssetsManager.init({
            onProgress: (progress) => {
                // 进度回调
                const {
                    packLoaded,
                    packProgress,
                    packTotalCount,
                } = progress;
                const totalPer = (packLoaded + packProgress) / packTotalCount;
                // console.log(LOG_HEADER, '加载进度:', totalPer, progress);

                // 更新文本展示
                const progressText = `加载进度: ${(totalPer * 100).toFixed(2)}`;
                this.members.txtProgress.text = progressText;
            },
        });
        // 加载完毕，触发回调
        this.onAssetsLoaded();
    }

    createMembers() {
        const txtProgress = new Text('', {
            fontSize: 32,
            fontWeight: '900',
            fill: 0xffffff,
        });

        this.addChild(txtProgress);

        return {
            txtProgress,
        };
    }

    bindEvents() {
        // this.members.btnExit.eventMode = 'static';
        // this.members.btnExit.on('pointerdown', this.events.onClickExit);
    }

    events = {
        onClickExit: () => {
            // TODO: 退出游戏
        },
    };
}