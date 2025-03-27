import { IAsset } from '../assets-list/asset-list.types';

export interface Wallet {
  contractAddress: string;
  contractName: string;
  contractTypeId: number;
  contractTypeName: string;
}

export interface SubscriberData {
  wallet: Wallet;
  assets: IAsset[];
}

export interface ISubscriber {
  subscriber: string;
  balance: number;
  state: number;
  stateName: string;
}
