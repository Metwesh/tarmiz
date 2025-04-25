export interface AssetPricing {
  _id: string;
  assetId: number;
  marketId: number;
  bid: number;
  ask: number;
  time: number;
  marketNameShort: string;
  marketNameFull: string;
  marketCode2: string;
  marketCode3: string;
  currencyName: string;
  currencyCode: string;
}

export interface IAsset {
  _id: string;
  assetId: number;
  accountId: number;
  name: string;
  symbol: string;
  contract: string;
  issuer: string;
  assetTypeId: number;
  assetTypeName: string;
  exclusive: boolean;
  supply: number;
  circulating: number;
  supplyTypeId: number;
  supplyTypeName: string;
  pricingModelId: number;
  pricingModelName: string;
  tradingModelId: number;
  tradingModelName: string;
  executionModelId: number;
  executionModelName: string;
  paymentModelId: number;
  paymentModelName: string;
  cid: string;
  time: number;
  levelId: number;
  levelName: string;
  stateId: number;
  stateName: string;
  markets: AssetPricing[] | undefined;
}