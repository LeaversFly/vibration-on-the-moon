import { Application, Container } from "pixi.js";

export default class BaseScene extends Container {
    constructor(options?: { app: Application }) {
        // 调用基类构造函数，完成基础初始化
        super();
    }

    onEnter(parameters: unknown) { }
    /**
     * 更新场景的 tick 回调
     * @param delta 距离上次回调过去的帧数
     */
    update(delta: unknown) { }
    /**
     * 界面尺寸改变时的回调
     */
    onResize() { }
}