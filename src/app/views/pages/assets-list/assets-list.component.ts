import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  ColComponent,
  ColDirective,
  PlaceholderAnimationDirective,
  PlaceholderDirective,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';
import { IAsset } from './asset-list.types';
import { EnumService } from '../../../services/enum-service.service';
import { SYSTEM_ENUMS } from '../../../constants/enums';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  ITransaction,
  ITransfer,
} from '../transaction-list/transaction-list.types';

@Component({
  selector: 'app-assets-list',
  imports: [
    TextColorDirective,
    CardComponent,
    TableDirective,
    RowComponent,
    ColComponent,
    CardBodyComponent,
    ButtonDirective,
    IconDirective,
    PlaceholderDirective,
    PlaceholderAnimationDirective,
    ColDirective,
    RouterModule,
    RouterLink
  ],
  templateUrl: './assets-list.component.html',
  styleUrl: './assets-list.component.scss',
})
export class AssetsListComponent implements OnInit {
  public assets: IAsset[] = [];
  public isAssetsLoading = true;

  constructor(private http: HttpClient, private enumService: EnumService) {}

  ngOnInit() {
    this.enumService.loadEnums([
      SYSTEM_ENUMS.ASSET_STATE,
      SYSTEM_ENUMS.ASSET_TYPE,
      SYSTEM_ENUMS.PRICING_MODEL,
    ]);
    this.http
      .get<{ count: number; assets: IAsset[] }>('/assets/list')
      .subscribe({
        next: ({ assets }) => {
          this.assets = assets;
          this.isAssetsLoading = false;
        },
        error: (err) => {
          console.error('Failed to load assets:', err);
          this.isAssetsLoading = false;
        },
      });
  }

  // Helper methods for template
  getAssetTypeLabel(typeId: number): string {
    return this.enumService.getAssetTypeLabel(typeId);
  }

  getAssetStateLabel(stateId: number): string {
    return this.enumService.getAssetStateLabel(stateId);
  }

  getPricingModelLabel(modelId: number): string {
    return this.enumService.getPricingModelLabel(modelId);
  }
}
