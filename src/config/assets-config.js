import { Sound } from '@pixi/sound';

/** 包参数：游戏音频 */
export const GameAudio = {
    BGM_THEME: '/audio/audio_2023428115827.mp3',
}

/** 包参数：精灵纹理 */
export const SpriteTexture = {
    BG_1: '/images/背景1.jpg',
    F_CHARACTER: '/images/sprite-minion.png'
}

/** 素材表分包：怪物贴图 */
export const MasterTextures = {
    MASTER_STOP: 'masterBreath-01.png',
}

/** 素材表分包：怪物动画 */
export const MasterAnimations = {
    MASTER_BREATH: 'masterBreath',
    MASTER_ATTACK: 'masterAttack'
}

/** 素材表分包：Gust贴图 */
export const GustTextures = {
    GUST_STOP: 'gustBreath (1).png',
}

/** 素材表分包：Gust动画 */
export const GustAnimations = {
    GUST_BREATH: 'gustBreath',
    GUST_ATTACK: 'gustAttack'
}

/** 资源总包 */
export class AssetsPacks {
    /** 子包：游戏音频 */
    GAME_AUDIO = {}

    /** 子包：精灵纹理 */
    SPRITE_TEXTURE = {}

    /** 素材表：怪物 */
    SHEET_MASTER = {}

    /** 素材表：Gust */
    SHEET_GUST = {}

    /** 加载函数 */
    static async loadAllPacks({ loadBundle, loadSheet }) {
        await loadBundle('GAME_AUDIO', GameAudio);
        await loadBundle('SPRITE_TEXTURE', SpriteTexture);
        await loadSheet('SHEET_MASTER', [
            '/sheets/master/masterBreath.json',
            '/sheets/master/masterAttack.json',
        ], {
            textures: MasterTextures,
            animations: MasterAnimations,
        })
        await loadSheet('SHEET_GUST', [
            '/sheets/gust/gustBreath.json',
            '/sheets/gust/gustAttack.json',
        ], {
            textures: GustTextures,
            animations: GustAnimations,
        })
    }
}