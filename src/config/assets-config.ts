import { Texture } from "pixi.js";
import { BundleLoader, SheetLoader, SpineLoader, SpineParam } from "../types/config";

/** 包参数：游戏音频 */
export enum GameAudio {
    BGM_THEME = '/audio/audio_2023428115827.mp3',
}

/** 包参数：精灵纹理 */
export enum SpriteTexture {
    BG_1 = '/images/背景1.jpg',
    F_CHARACTER = '/images/sprite-minion.png'
}

/** 资源总包 */
export class AssetsPacks {
    /** 子包：游戏音频 */
    GAME_AUDIO = {} as Record<keyof typeof GameAudio, string>

    /** 子包：精灵纹理 */
    SPRITE_TEXTURE = {} as Record<keyof typeof SpriteTexture, Texture>

    /** 素材表：Spineboy */
    SHEET_SPINEBOY = {} as SpineParam

    /** 素材表：Irene */
    SHEET_IRENE = {} as SpineParam

    /** 素材表：Sydonq */
    SHEET_SYDONQ = {} as SpineParam

    /** 加载函数 */
    static async loadAllPacks({ loadBundle, loadSpine }: {
        loadBundle: BundleLoader,
        loadSpine: SpineLoader,
    }) {
        // await loadBundle('GAME_AUDIO', GameAudio);
        await loadBundle('SPRITE_TEXTURE', SpriteTexture);
        await loadSpine('SHEET_SPINEBOY', [
            '/sheets/spineboy/spineboy-pro.json',
        ])
        await loadSpine('SHEET_IRENE', [
            '/sheets/irene/char_4009_irene.json',
        ])
        await loadSpine('SHEET_SYDONQ', [
            '/sheets/sydonq/enemy_sydonq.json',
        ])
        // await loadSheet('SHEET_LVBU', [
        //     '/sheets/lvbu/lvbu.json',
        // ], {
        //     animations: LvbuAnimation,
        //     textures: LvbuTexture
        // })
    }
}