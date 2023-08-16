import { reactive } from "vue";
import { AssetsManager } from "../service/assets-manager";

const { SHEET_IRENE, SHEET_SPINEBOY } = AssetsManager.assetsPacks

export const Irene = {
    id: 0,
    name: 'irene',
    data: SHEET_IRENE.spineData
}

export const Spineboy = {
    id: 1,
    name: 'spineboy',
    data: SHEET_SPINEBOY.spineData
}

export const team = reactive([
    Irene,
    Spineboy,
])