import { AssetsPacks } from "../config/assets-config";

export type BundleLoader = (
    bundleName: keyof AssetsPacks,
    bundleContents: Record<string, string>,
  ) => Promise<void>;

export type SpineLoader = (
    sheetName: keyof AssetsPacks,
    jsonList: string[],
) => Promise<void>;