/** 包参数：游戏音频 */
export const GameAudio = {
    BGM_THEME: '/audio/audio_2023428115827.mp3',
}

/** 包参数：精灵纹理 */
export const SpriteTexture = {
    BG_1: '/images/背景1.jpg',
    F_CHARACTER: '/images/sprite-minion.png'
}

/** 资源总包 */
export class AssetsPacks {
    /** 子包：游戏音频 */
    GAME_AUDIO = {}

    /** 子包：精灵纹理 */
    SPRITE_TEXTURE = {}

    /** 素材表：Spineboy */
    SHEET_SPINEBOY = {}

    /** 加载函数 */
    static async loadAllPacks({ loadBundle, loadSheet, loadSpine }) {
        // await loadBundle('GAME_AUDIO', GameAudio);
        await loadBundle('SPRITE_TEXTURE', SpriteTexture);
        await loadSpine('SHEET_SPINEBOY', [
            '/sheets/spineboy/spineboy-pro.json',
        ])
    }
}