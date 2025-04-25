export const SYSTEM_ENUMS = {
  TRX_TYPE: 'transactionType',
  ASSET_TYPE: 'assetType',
  ASSET_STATE: 'assetState',
  PRICING_MODEL: 'pricingModel',
  SUPPLY_TYPES: 'supplyTypes',
  ACCOUNT_LEVEL: 'level',
  TRADING_MODEL: 'tradingModel',
  MARKET: 'market',
  EXECUTION_MODEL: 'executionModel',
  PAYMENT_MODEL: 'paymentModel',
} as const;

export const SYSTEM_ENUMS_MAP = {
  [SYSTEM_ENUMS.TRX_TYPE]: '/general/sysvars/Transaction%20Type',
  [SYSTEM_ENUMS.ASSET_TYPE]: '/general/sysvars/Asset%20Type',
  [SYSTEM_ENUMS.ASSET_STATE]: '/general/sysvars/Asset%20State',
  [SYSTEM_ENUMS.PRICING_MODEL]: '/general/sysvars/Asset%20Pricing%20Model',
  [SYSTEM_ENUMS.SUPPLY_TYPES]: '/general/sysvars/Asset%20Supply%20Type',
  [SYSTEM_ENUMS.ACCOUNT_LEVEL]: '/general/sysvars/Account%20Level',
  [SYSTEM_ENUMS.TRADING_MODEL]: '/general/sysvars/Asset%20Trading%20Model',
  [SYSTEM_ENUMS.EXECUTION_MODEL]: '/general/sysvars/Asset%20Execution%20Model',
  [SYSTEM_ENUMS.MARKET]: '/general/countries/list',
  [SYSTEM_ENUMS.PAYMENT_MODEL]: '/general/sysvars/Asset%20Payment%20Model',
} as const;
