export interface IUser {
  _id: string;
  accountId: number;
  countryCode: number;
  uniqueId: string;
  extra: string;
  cid: string;
  managerId: number;
  contacts: IContact[];
  contracts: IContract[];
  credit: ICredit[];
  accountTypeId: number;
  accountTypeName: string;
  countryNameShort: string;
  countryNameFull: string;
  countryCode2: string;
  countryCode3: string;
  levelId: number;
  levelName: string;
  stateId: number;
  stateName: string;
}

export interface IContact {
  _id: string;
  accountId: number;
  address: string;
  detail1: string;
  detail2: string;
  typeId: number;
  typeName: string;
  stateId: number;
  stateName: string;
}

export interface IContract {
  _id: string;
  accountId: number;
  name: string;
  address: string;
  typeId: number;
  typeName: string;
  stateId: number;
  stateName: string;
}

export interface ICredit {
  _id: string;
  accountId: number;
  address: string;
  currencyCode: number;
  balance: number;
  name: string;
  typeId: number;
  typeName: string;
  stateId: number;
  stateName: string;
  marketNameShort: string;
  marketNameFull: string;
  marketCode2: string;
  marketCode3: string;
  currencyName: string;
}
