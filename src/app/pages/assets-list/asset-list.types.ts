export interface AssetPricing {
  marketId: number;
  marketName: string;
  marketShort: string;
  currencyName: string;
  currencyCode: string;
  bid: number;
  ask: number;
  state: number;
  stateName: string;
  update: number;
}

export interface IAsset {
  assetId: number;
  name: string;
  symbol: string;
  contract: string;
  issuer: string;
  assetTypeId: number;
  assetTypeName: string;
  exclusive: boolean;
  supply: number;
  supplyTypeId: number;
  supplyTypeName: string;
  pricingModelId: number;
  pricingModelName: string;
  tradingModelId: number;
  tradingModelName: string;
  executionModelId: number;
  executionModelName: string;
  cid: string;
  extra: string;
  time: number;
  tokens: number;
  stateId: number;
  stateName: string;
  locked: boolean;
  prices: Array<AssetPricing> | undefined;
}

export interface IAssetInner extends IAsset {
  levelId: number;
  levelName: string;
  supplyTypeId: number;
  supplyTypeName: string;
  tokens: number;
}
