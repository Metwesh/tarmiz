import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { SYSTEM_ENUMS, SYSTEM_ENUMS_MAP } from '../constants/enums';
import {
  EnumApiData,
  SysVars,
  EnumMapping,
  EnumMarketInfoData,
  ApiSysVars,
} from '../@types/enums';
import { SelectOption } from '../@types/generic';

@Injectable({
  providedIn: 'root',
})
export class EnumService {
  private enumSubjects: Record<string, BehaviorSubject<EnumMapping>> = {
    [SYSTEM_ENUMS.TRX_TYPE]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.ASSET_TYPE]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.ASSET_STATE]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.PRICING_MODEL]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.SUPPLY_TYPES]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.ACCOUNT_LEVEL]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.TRADING_MODEL]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.EXECUTION_MODEL]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.MARKET]: new BehaviorSubject<EnumMapping>({}),
    [SYSTEM_ENUMS.PAYMENT_MODEL]: new BehaviorSubject<EnumMapping>({}),
  };

  private cache: Record<string, EnumMapping> = {}; // In-memory cache

  private enumUrlMapping = SYSTEM_ENUMS_MAP;

  constructor(private http: HttpClient) {}

  /**
   * Generic method to get enum mapping or a list.
   * @param key - The enum key (from SYSTEM_ENUMS)
   * @param asList - If true, returns an array of { value, label } objects
   */
  getEnumData<T extends boolean | undefined>(
    key: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS],
    asList?: T
  ): T extends true ? SelectOption[] : EnumMapping {
    const enumData = this.enumSubjects[key]?.value || {};

    if (asList) {
      Object.entries(enumData);
      return Object.entries(enumData).map(
        ([value, label]) =>
          ({
            value,
            label: label as string,
          } as SelectOption)
      ) as any;
    }

    return enumData as any;
  }

  private async fetchEnumData(
    key: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS]
  ): Promise<SysVars[]> {
    if (this.cache[key]) {
      return Object.entries(this.cache[key]).map(([sysvarId, name]) => ({
        id: Number(sysvarId),
        name,
      }));
    }
    try {
      const response = await firstValueFrom(
        this.http.get<EnumMarketInfoData | EnumApiData>(
          this.enumUrlMapping[key]
        )
      );
      let data: SysVars[] = [];

      if ('countries' in response) {
        data =
          response.countries?.map((country) => ({
            id: country.countryCode,
            name: country.shortName,
          })) || [];
      } else {
        data = response.sysvars
          ? response.sysvars.map(({ sysvarId, name }) => ({
              id: sysvarId,
              name,
            }))
          : [];
      }

      // Store in cache
      this.cache[key] = this.formatEnumData(data);

      return data;
    } catch (error) {
      console.error(`Failed to fetch enum data for ${key}:`, error);
      this.loadFallbackEnums(key);
      return [];
    }
  }

  private formatEnumData(sysvars: SysVars[]): EnumMapping {
    return sysvars.reduce((acc, { id, name }) => {
      acc[id] = name;
      return acc;
    }, {} as EnumMapping);
  }

  async loadEnums(
    keys?: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS][]
  ): Promise<void> {
    try {
      for (const key of Object.keys(this.enumSubjects) as Array<
        (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS]
      >) {
        if (!keys || keys.includes(key)) {
          const enumData = await this.fetchEnumData(key);
          this.enumSubjects[key].next(this.formatEnumData(enumData));
        }
      }
    } catch (error) {
      console.error('Error loading enums:', error);
    }
  }

  private loadFallbackEnums(
    key: (typeof SYSTEM_ENUMS)[keyof typeof SYSTEM_ENUMS]
  ): void {
    const fallbackData: Record<string, EnumMapping> = {
      [SYSTEM_ENUMS.TRX_TYPE]: {
        1: 'Sell',
        2: 'Buy',
        3: 'P2P',
      },
      [SYSTEM_ENUMS.ASSET_TYPE]: {
        1: 'Precious Metals',
        2: 'Real Estate',
        3: 'Media & Artworks',
        4: 'Carbon Credits',
      },
      [SYSTEM_ENUMS.ASSET_STATE]: {
        1: 'Initialized',
        2: 'Active',
        3: 'Suspended',
        4: 'Deactivated',
      },
      [SYSTEM_ENUMS.PRICING_MODEL]: {
        1: 'Fixed Source',
        2: 'Open Market',
      },
      [SYSTEM_ENUMS.SUPPLY_TYPES]: {
        1: 'Fixed',
        2: 'Dynamic',
      },
      [SYSTEM_ENUMS.ACCOUNT_LEVEL]: {
        1: 'Level 0',
        2: 'Level 1',
        3: 'Level 2',
        4: 'Level 3',
      },
      [SYSTEM_ENUMS.TRADING_MODEL]: {
        1: 'Locked',
        2: 'Open',
      },
      [SYSTEM_ENUMS.EXECUTION_MODEL]: {
        1: 'OnChain',
        2: 'On/Off',
        3: 'Off/On',
      },
      [SYSTEM_ENUMS.MARKET]: {
        818: 'Egypt',
        682: 'Saudi Arabia',
      },
      [SYSTEM_ENUMS.PAYMENT_MODEL]: {
        1: 'OnChain',
        2: 'OffChain',
      },
    };

    if (fallbackData[key]) {
      this.enumSubjects[key].next(fallbackData[key]);
    } else {
      console.warn(`No fallback data available for ${key}`);
    }
  }
}
