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
    if (this.gridAssets.has(key)) {
      return this.gridAssets.get(key)!;
    }
    return this.assetSpaces.get(key);
  }

  set(gridSpace: string | undefined, asset: string): void {
    const oldSpace = this.assetSpaces.get(asset);
    if (oldSpace) {
      this.gridAssets.set(oldSpace, undefined);
    }
    if (gridSpace) {
      const oldImage = this.gridAssets.get(gridSpace);
      if (oldImage) {
        this.assetSpaces.set(oldImage, undefined);
      }
      this.gridAssets.set(gridSpace, asset);
    }
    this.assetSpaces.set(asset, gridSpace);
  }
}
