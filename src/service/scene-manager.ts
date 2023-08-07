// src/services/scene-manager.ts
import { Application, Container } from 'pixi.js';
import { SceneManagerInitOptions } from '../types/service';

/** 场景管理器 */
export class SceneManager {
    constructor() {
        // 构造函数私有化，避免被外部实例化出新对象
        throw new Error('请勿调用此构造函数');
    }

    /** 当前应用 */
    private static $app: Application | null = null;
    /** 当前应用 (Public Read-only) */
    public static get app() {
        return this.$app;
    }

    /** 场景根节点 */
    private static $root: Container | null = null;
    /** 场景根节点 (Public Read-only) */
    public static get root() {
        return this.$root;
    }

    /** 当前场景 */
    private static $currentScene: IScene | null = null;
    /** 当前场景 (Public Read-only) */
    public static get currentScene() {
        return this.$currentScene;
    }

    /** 当前应用是否运作中 */
    public static get isAppRunning() {
        return !!this.app?.renderer;
    }

    /**
    * 初始化场景管理器
    * @param options 初始化参数
    */
    static init(options: SceneManagerInitOptions) {
        const { app } = options;
        const { stage: appStage } = app;
        const { root = appStage } = options;
        if (root !== appStage) {
            appStage.addChild(root);
        }

        this.$app = app;
        this.$root = root;

        app.ticker.add(this.onUpdate.bind(this));
        // this.onResize();
    }

    static onUpdate(delta: number) {
        if (!this.isAppRunning) return;
        this.$currentScene?.update?.(delta);
    }

    /** 检查是否初始化完毕 */
    static checkIfInitialized() {
        if (!this.$app) {
            throw new Error('SceneManager 尚未初始化！');
        }
        if (!this.isAppRunning) {
            throw new Error('当前应用可能已停止运行被回收，无法再渲染');
        }
    }

    /**
    * 切换场景
    * @param newScene 新场景
    * @param options 场景进场参数
    */
    static changeScene(newScene: IScene, options?: undefined) {
        this.checkIfInitialized();
        const {
            currentScene: oldScene,
        } = this;
        if (oldScene) {
            this.root?.removeChild(oldScene);
            oldScene.destroy({ children: true });
        }
        this.$currentScene = newScene;
        this.root?.addChild(newScene);
        // this.resizeCurrentScene();
        newScene.onEnter?.(options ?? {});
    }
}