interface IPaymentDetails {
  paymentId: number;
  marketId: number;
  credit: number;
  extra: string;
}

export interface ITransfer {
  transferId: number;
  assetId: number;
  transferType: string;
  from: string;
  to: string;
  tokens: number;
  paymentId: number;
  paymentDetails: IPaymentDetails;
  tokenPrice: number;
  extra: string;
  time: number;
}

export interface ITransaction {
  contractAddress?: string;
  trxs: ITransfer[];
}
