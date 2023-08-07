import { Application, Container } from "pixi.js";

export default class BaseScene extends Container implements IScene {
    constructor(options?: { app: Application }) {
        // 调用基类构造函数，完成基础初始化
        super();
    }
}