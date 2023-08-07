import type { Container } from 'pixi.js';

declare global {
    interface IScene extends Container {
        /**
         * 进入当前场景时的回调
         * @param parameters 场景参数
         */
        onEnter?(parameters: Record<string, string | number | boolean | null>): void;
        /**
         * 更新场景的 tick 回调
         * @param delta 距离上次回调过去的帧数
         */
        update?(delta: number): void;
        /**
         * 界面尺寸改变时的回调
         */
        onResize?(): void;
    }
}