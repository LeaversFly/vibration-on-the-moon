import { AssetsPacks } from "../config/assets-config";
import { Assets } from "pixi.js";

/** 资源管理器 */
export class AssetsManager {
    static #isInitialized = false;
    static #isLoading = false;

    static #innerAssetsPacks = new AssetsPacks();
    static get assetsPacks() {
        return this.#innerAssetsPacks;
    }

    constructor() {
        // 避免被外部误操作实例化
    }

    static async init(options) {
        if (this.#isInitialized || this.#isLoading) return;

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
        const onProgress = (progress) => {
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
        this.#isLoading = true;
        await AssetsPacks.loadAllPacks({
            async loadBundle(bundleName, bundleAssets) {
                totalProgress.packName = bundleName;
                Assets.addBundle(bundleName, bundleAssets);
                const contents = await Assets.loadBundle(bundleName, onProgress);
                Object.assign(assetsPacks[bundleName], contents);
            },
            async loadSheet(sheetName, jsonList, keyRemap) {
                totalProgress.packName = sheetName;
                const mapKeyToResource = await AssetsManager.#loadSheet(jsonList, keyRemap, onProgress);
                Object.assign(assetsPacks[sheetName], mapKeyToResource);
            },
            async loadSpine(sheetName, jsonList) {
                totalProgress.packName = sheetName;
                const mapKeyToResource = await AssetsManager.#loadSpine(jsonList, onProgress);
                Object.assign(assetsPacks[sheetName], mapKeyToResource);
            },
        });

        this.#isLoading = false;
        this.#isInitialized = true;
    }


    /** 加载 Spritesheet 型分包 */
    static async #loadSheet(jsonList, keyRemap, onProgress) {
        const total = jsonList.length;
        const mapFileNameToResource = {
            animations: {},
            textures: {},
        };
        // 逐个加载 json，结果合并到同一个集合内
        for (let i = 0; i < total; i += 1) {
            const jsonUrl = jsonList[i];
            const newAssets = await Assets.load(jsonUrl);
            onProgress((i + 1) / total)
            Object.assign(mapFileNameToResource.animations, newAssets.animations);
            Object.assign(mapFileNameToResource.textures, newAssets.textures);
        }
        const mapKeyToResource = {
            animations: {},
            textures: {},
        };
        const {
            animations: animationKeys = {},
            textures: textureKeys = {},
        } = keyRemap;
        Object.entries(animationKeys).forEach(([key, fileName]) => {
            mapKeyToResource.animations[key] = mapFileNameToResource.animations[fileName];
        });
        Object.entries(textureKeys).forEach(([key, fileName]) => {
            mapKeyToResource.textures[key] = mapFileNameToResource.textures[fileName];
        });
        return mapKeyToResource;
    }

    /** 加载 SpineData 型分包 */
    static async #loadSpine(jsonList, onProgress) {
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
}
