import { Application, Container } from "pixi.js";

/** 总进度 */
export interface TotalProgress {
    isComplete: boolean,
    packName: string,
    packProgress: number,
    packLoaded: number,
    packTotalCount: number,
}

/** 总进度回调函数 */
export type TotalProgressCallback = (progress: TotalProgress) => void;

export type SceneManagerInitOptions = {
    /** 当前应用 */
    app: Application;
    /** 场景根节点 */
    root?: Container;
}