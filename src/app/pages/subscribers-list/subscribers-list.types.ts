import { AssetPricing } from "../assets-list/asset-list.types";

export interface IAsset {
  _id: string;
  assetId: number;
  accountId: number;
  name: string;
  symbol: string;
  contract: string;
  issuer: string;
  exclusive: boolean;
  supply: number;
  circulating: number;
  cid: string;
  assetTypeId: number;
  assetTypeName: string;
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
  time: number;
  levelId: number;
  levelName: string;
  stateId: number;
  stateName: string;
  markets: AssetPricing[] | undefined;
}

export interface ISubscriber {
  _id: string;
  accountId: number;
  name: string;
  address: string;
  typeId: number;
  typeName: string;
  stateId: number;
  stateName: string;
}

export interface IAssetHolding {
  _id: string;
  assetId: number;
  accountId: number;
  subscriberId: number;
  balance: number;
  value: number;
  time: number;
  stateId: number;
  stateName: string;
  subscriber: ISubscriber;
  asset: IAsset;
}
