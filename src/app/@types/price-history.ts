interface Currency {
  marketId: string;
  marketName: string;
  marketShort: string;
  currencyName: string;
  currencyCode: string;
}

export interface PricePoint {
  bid: number;
  ask: number;
  time: number; // Unix timestamp
}

export interface PriceHistory {
  assetId: number;
  count: number;
  currency: Currency;
  prices: PricePoint[];
}
