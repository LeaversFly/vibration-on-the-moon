import { AssetsManager } from "../service/assets-manager";
import { SpineParam } from "../types/config";

type packsType = keyof typeof AssetsManager.assetsPacks

export function getSheet(name: string) {
    const sheetName = 'SHEET_' + name.toUpperCase()
    return AssetsManager.assetsPacks[sheetName as packsType] as SpineParam
}