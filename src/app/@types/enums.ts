export interface EnumMapping {
  [key: number]: string;
}

export interface MarketInfo {
  _id: string;
  countryId: number;
  shortName: string;
  fullName: string;
  alpha2Code: string;
  alpha3Code: string;
  currencyName: string;
  currencyCode: string;
  callingCode: number;
  countryCode: number;
}

export interface EnumMarketInfoData {
  count: number;
  countries: MarketInfo[];
}

export interface ApiSysVars {
  sysvarId: number;
  name: string;
}

export interface SysVars {
  id: number;
  name: string;
}

export interface EnumApiData {
  count: number;
  sysvars: ApiSysVars[];
}
