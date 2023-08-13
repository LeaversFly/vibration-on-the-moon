import { AssetsPacks } from "../config/assets-config";
import { Assets, Spritesheet, Texture } from "pixi.js";
import { TotalProgressCallback } from "../types/service";

/** 资源管理器 */
export class AssetsManager {
    private static isInitialized = false;
    private static isLoading = false;

    private static innerAssetsPacks = new AssetsPacks();
    static get assetsPacks() {
        return this.innerAssetsPacks;
    }

    constructor() {
        throw new Error('请勿调用此构造函数');
    }

    static async init(options: {
        onProgress: TotalProgressCallback
    }) {
        if (this.isInitialized || this.isLoading) return;

        const { assetsPacks } = this;
        const packNames = Object.keys(assetsPacks)
        // 创建总进度对象
        const totalProgress = {
            isComplete: false,
            packName: '',
            packProgress: 0,
            packLoaded: 0,
            packTotalCount: packNames.length,
        };
        const onProgress = (progress: number) => {
            totalProgress.packProgress = progress;
            // 通知外层回调
            options.onProgress(totalProgress);

            totalProgress.packLoaded += progress < 1 ? 0 : 1;
            if (totalProgress.packLoaded === totalProgress.packTotalCount) {
                // 已加载完所有包
                totalProgress.isComplete = true;
                totalProgress.packName = '';
                totalProgress.packProgress = 0;
                // 通知外层回调
                options.onProgress(totalProgress);
            }
        };
        // 加载各个分包
        this.isLoading = true;
        await AssetsPacks.loadAllPacks({
            async loadBundle(bundleName, bundleAssets) {
                totalProgress.packName = bundleName;
                Assets.addBundle(bundleName, bundleAssets);
                const contents = await Assets.loadBundle(bundleName, onProgress);
                Object.assign(assetsPacks[bundleName], contents);
            },
            async loadSpine(sheetName, jsonList) {
                totalProgress.packName = sheetName;
                const mapKeyToResource = await AssetsManager.loadSpine(jsonList, onProgress);
                Object.assign(assetsPacks[sheetName], mapKeyToResource);
            },
            // async loadSheet(sheetName, jsonList, keyRemap) {
            //     totalProgress.packName = sheetName;
            //     const mapKeyToResource = await AssetsManager.loadSheet(jsonList, keyRemap, onProgress);
            //     Object.assign(assetsPacks[sheetName], mapKeyToResource);

            // }
        });

        this.isLoading = false;
        this.isInitialized = true;
    }

    /** 加载 SpineData 型分包 */
    private static async loadSpine(jsonList: string[], onProgress: (progress: number) => void) {
        const total = jsonList.length;
        const mapFileNameToResource = {};
        // 逐个加载 json，结果合并到同一个集合内
        for (let i = 0; i < total; i += 1) {
            const jsonUrl = jsonList[i];
            const newAssets = await Assets.load(jsonUrl);
            onProgress((i + 1) / total)
            Object.assign(mapFileNameToResource, newAssets);
        }
        return mapFileNameToResource;
    }
    /** 加载 Spritesheet 型分包 */
    // private static async loadSheet(jsonList: string[], keyRemap: {
    //     textures?: Record<string, string>,
    //     animations?: Record<string, string>,
    // }, onProgress: (progress: number) => void) {
    //     const total = jsonList.length;
    //     const mapFileNameToResource = {
    //         animations: {} as Record<string, Texture[]>,
    //         textures: {} as Record<string, Texture>,
    //     };
    //     // 逐个加载 json，结果合并到同一个集合内
    //     for (let i = 0; i < total; i += 1) {
    //         const jsonUrl = jsonList[i];
    //         const newAssets = await Assets.load(jsonUrl) as Spritesheet;
    //         Object.assign(mapFileNameToResource.animations, newAssets.animations);
    //         Object.assign(mapFileNameToResource.textures, newAssets.textures);
    //     }
    //     // 将 json 内的文件名和动画名，转换为定义的 key
    //     const mapKeyToResource = {
    //         animations: {} as Record<string, Texture[]>,
    //         textures: {} as Record<string, Texture>,
    //     };
    //     const {
    //         animations: animationKeys = {},
    //         textures: textureKeys = {},
    //     } = keyRemap;
    //     Object.entries(animationKeys).forEach(([key, fileName]) => {
    //         mapKeyToResource.animations[key] = mapFileNameToResource.animations[fileName];
    //     });
    //     Object.entries(textureKeys).forEach(([key, fileName]) => {
    //         mapKeyToResource.textures[key] = mapFileNameToResource.textures[fileName];
    //     });
    //     return mapKeyToResource;
    // }
}
