export interface IAsset {
  assetId: number;
  contract: string;
  issuer: string;
  name: string;
  symbol: string;
  assetType: number;
  exclusive: false;
  supply: number;
  pricingModel: number;
  tradingModel: number;
  executionModel: number;
  cid: string;
  extra: string;
  time: number;
  tokens: number;
  state: number;
  locked: false;
}
