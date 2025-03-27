interface IPaymentDetails {
  paymentId: number;
  marketId: number;
  marketName: string;
  marketShort: string;
  currencyName: string;
  currencyCode: string;
  credit: number;
  extra: string;
}

export interface ITransfer {
  transferId: number;
  assetId: number;
  assetName: string;
  assetSymbol: string;
  assetTypeId: number;
  assetTypeName: string;
  transferType: string;
  from: string;
  to: string;
  tokens: number;
  paymentDetails: IPaymentDetails;
  tokenPrice: number;
  extra: string;
  time: number;
}

export interface ITransaction {
  contractAddress?: string;
  trxs: ITransfer[];
}
