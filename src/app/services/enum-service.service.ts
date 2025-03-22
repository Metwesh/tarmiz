import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SYSTEM_ENUMS } from '../constants/enums';

export interface EnumMapping {
  [key: number]: string;
}

interface SysVars {
  id: number;
  name: string;
}

interface EnumApiData {
  count: number;
  sysvars: SysVars[];
}

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  private transactionTypesSubject = new BehaviorSubject<EnumMapping>({});
  private assetTypesSubject = new BehaviorSubject<EnumMapping>({});
  private assetStatesSubject = new BehaviorSubject<EnumMapping>({});
  private pricingModelsSubject = new BehaviorSubject<EnumMapping>({});

  public transactionTypes$ = this.transactionTypesSubject.asObservable();
  public assetTypes$ = this.assetTypesSubject.asObservable();
  public assetStates$ = this.assetStatesSubject.asObservable();
  public pricingModels$ = this.pricingModelsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Getter methods for templates and components
  getTransactionTypeLabel(typeId: number): string {
    return this.transactionTypesSubject.value[typeId] || `Unknown (${typeId})`;
  }

  getAssetTypeLabel(typeId: number): string {
    return this.assetTypesSubject.value[typeId] || `Unknown (${typeId})`;
  }

  getAssetStateLabel(stateId: number): string {
    return this.assetStatesSubject.value[stateId] || `Unknown (${stateId})`;
  }

  getPricingModelLabel(modelId: number): string {
    return this.pricingModelsSubject.value[modelId] || `Unknown (${modelId})`;
  }

  private enumUrlMapping = {
    [SYSTEM_ENUMS.TRX_TYPE]: '/general/sysvars/Transaction%20Type',
    [SYSTEM_ENUMS.ASSET_TYPE]: '/general/sysvars/Asset%20Type',
    [SYSTEM_ENUMS.ASSET_STATE]: '/general/sysvars/Asset%20State',
    [SYSTEM_ENUMS.PRICING_MODEL]: '/general/sysvars/Pricing%20Model',
  };

  private async fetchEnumData(
    key: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS]
  ) {
    let response;
    try {
      response = await firstValueFrom(
        this.http.get<EnumApiData>(this.enumUrlMapping[key])
      ).then(({ sysvars }) => sysvars);
    } catch {
      console.error('Failed to fetch enum data from API');
      this.loadFallbackEnums(key);
      return;
    }
    return response;
  }

  private formatEnumData(sysvars?: SysVars[]): EnumMapping {
    if (!sysvars) return {};
    return sysvars.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {} as EnumMapping);
  }

  // Method called by APP_INITIALIZER
  async loadEnums(
    keys?: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS][]
  ): Promise<void> {
    try {
      let transactionTypes: SysVars[] | undefined;
      let assetTypes: SysVars[] | undefined;
      let assetStates: SysVars[] | undefined;
      let pricingModels: SysVars[] | undefined;

      if (!keys || keys.includes(SYSTEM_ENUMS.TRX_TYPE))
        transactionTypes = await this.fetchEnumData(SYSTEM_ENUMS.TRX_TYPE);
      if (!keys || keys.includes(SYSTEM_ENUMS.ASSET_TYPE))
        assetTypes = await this.fetchEnumData(SYSTEM_ENUMS.ASSET_TYPE);
      if (!keys || keys.includes(SYSTEM_ENUMS.ASSET_STATE))
        assetStates = await this.fetchEnumData(SYSTEM_ENUMS.ASSET_STATE);
      if (!keys || keys.includes(SYSTEM_ENUMS.PRICING_MODEL))
        pricingModels = await this.fetchEnumData(SYSTEM_ENUMS.PRICING_MODEL);

      if (transactionTypes)
        this.transactionTypesSubject.next(
          this.formatEnumData(transactionTypes)
        );
      if (assetTypes)
        this.assetTypesSubject.next(this.formatEnumData(assetTypes));
      if (assetStates)
        this.assetStatesSubject.next(this.formatEnumData(assetStates));
      if (pricingModels)
        this.pricingModelsSubject.next(this.formatEnumData(pricingModels));
    } catch (error) {}
  }

  private loadFallbackEnums(
    key?: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS]
  ): void {
    // Fallback values in case API fails
    if (!key || key.includes(SYSTEM_ENUMS.TRX_TYPE))
      this.transactionTypesSubject.next({
        1: 'Sell',
        2: 'Buy',
        3: 'P2P',
      });
    if (!key || key.includes(SYSTEM_ENUMS.ASSET_TYPE))
      this.assetTypesSubject.next({
        1: 'Precious Metals',
        2: 'Real Estate',
        3: 'Media & Artworks',
        4: 'Carbon Credits',
      });
    if (!key || key.includes(SYSTEM_ENUMS.ASSET_STATE))
      this.assetStatesSubject.next({
        1: 'Initialized',
        2: 'Active',
        3: 'Suspended',
        4: 'Deactivated',
      });
    if (!key || key.includes(SYSTEM_ENUMS.PRICING_MODEL))
      this.pricingModelsSubject.next({
        1: 'Fixed Source',
        2: 'Open Market',
      });
  }
}
