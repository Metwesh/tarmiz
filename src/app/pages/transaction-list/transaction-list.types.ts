export interface ITransfer {
  _id: string;
  transferId: number;
  assetId: number;
  action: string; // e.g., "Sell"
  from: string;
  fromId: number;
  to: string;
  toId: number;
  tokens: number;
  price: number;
  extra: string;
  time: number; // Unix timestamp
  asset: Asset;
  value: number;
  payment: Payment;
}

export interface Asset {
  _id: string;
  assetId: number;
  accountId: number;
  contract: string;
  issuer: string;
  name: string;
  symbol: string;
  exclusive: boolean;
  supply: number;
  circulating: number;
  cid: string;
  markets: Market[];
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
  time: number; // Unix timestamp
  levelId: number;
  levelName: string;
  stateId: number;
  stateName: string;
}

export interface Market {
  _id: string;
  assetId: number;
  marketId: number;
  bid: number;
  ask: number;
  time: number; // Unix timestamp
  marketNameShort: string;
  marketNameFull: string;
  marketCode2: string;
  marketCode3: string;
  currencyName: string;
  currencyCode: string;
}

export interface Payment {
  _id: string;
  transferId: number;
  action: string; // e.g., "Trade"
  currencyCode: number | string;
  from: string;
  fromId: number;
  to: string;
  toId: number;
  tokens: number;
  private: boolean;
  extra: string;
  time: number; // Unix timestamp
  marketNameShort: string;
  marketNameFull: string;
  marketCode2: string;
  marketCode3: string;
  currencyName: string;
}
