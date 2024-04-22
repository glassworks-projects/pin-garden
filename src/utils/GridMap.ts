/*
 * bidirectional hashmap utility class
 */

export default class GridMap {
  gridAssets: Map<string, string | undefined>;
  assetSpaces: Map<string, string | undefined>;

  constructor(gm?: GridMap) {
    this.gridAssets = new Map(gm && gm.gridAssets);
    this.assetSpaces = new Map(gm && gm.assetSpaces);
  }

  get(key: string): string | undefined {
    return this.gridAssets.get(key) || this.assetSpaces.get(key);
  }

  set(gridSpace: string | undefined, asset: string): void {
    const oldSpace = this.assetSpaces.get(asset);
    if (oldSpace) {
      this.gridAssets.set(oldSpace, undefined);
    }
    if (gridSpace) {
      this.clearSpace(gridSpace);
      this.gridAssets.set(gridSpace, asset);
    }
    this.assetSpaces.set(asset, gridSpace);
  }

  clearSpace(gridSpace: string): void {
    const oldAsset = this.gridAssets.get(gridSpace);
    if (oldAsset) {
      this.assetSpaces.set(oldAsset, undefined);
    }
    this.gridAssets.set(gridSpace, undefined);
  }
}
