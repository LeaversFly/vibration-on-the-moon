import { ISkeletonData, TextureAtlas } from "pixi-spine";
import { AssetsPacks } from "../config/assets-config";

export type SpineParam = {
  spineAtlas: TextureAtlas
  spineData: ISkeletonData
}

export type BundleLoader = (
  bundleName: keyof AssetsPacks,
  bundleContents: Record<string, string>,
) => Promise<void>;

export type SpineLoader = (
  sheetName: keyof AssetsPacks,
  jsonList: string[],
) => Promise<void>;

export type SheetLoader = (
  sheetName: keyof AssetsPacks,
  jsonList: string[],
  keyRemap: {
    textures?: Record<string, string>,
    animations?: Record<string, string>,
  },
) => Promise<void>;