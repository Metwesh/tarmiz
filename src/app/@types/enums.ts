export interface EnumMapping {
  [key: number]: string;
}

export interface MarketInfo {
  id: 1;
  code: 818;
  nameShort: 'Egypt';
  nameFull: 'The Arab Republic of Egypt';
  alpha2Code: 'EG';
  alpha3Code: 'EGY';
  currency: 'Egyptian Pound';
  currencyCode: 'EGP';
  callingCode: 20;
}

export interface EnumMarketInfoData {
  count: number;
  countries: MarketInfo[];
}

export interface SysVars {
  id: number;
  name: string;
}

export interface EnumApiData {
  count: number;
  sysvars: SysVars[];
}
