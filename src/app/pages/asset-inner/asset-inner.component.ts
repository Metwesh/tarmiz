import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  BadgeComponent,
  BreadcrumbModule,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  PlaceholderModule,
  RowComponent,
  TableDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { AssetPricing, IAssetInner } from '../assets-list/asset-list.types';
import { ISubscriber } from '../subscribers-list/subscribers-list.types';
import { DatePipe } from '@angular/common';
import { PriceSetModalComponent } from '../../components/price-set-modal/price-set-modal.component';

@Component({
  selector: 'app-asset-inner',
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    BadgeComponent,
    BreadcrumbModule,
    RouterLink,
    PlaceholderModule,
    TableDirective,
    DatePipe,
    ButtonDirective,
    PriceSetModalComponent,
    PriceSetModalComponent,
  ],
  templateUrl: './asset-inner.component.html',
  styleUrl: './asset-inner.component.scss',
})
export class AssetInnerComponent implements OnInit {
  public asset: IAssetInner | null = null;
  public isAssetLoading = true;

  public subscribers: ISubscriber[] = [];
  public isSubscribersLoading = true;

  isModalOpen = false;
  formData:
    | {
        assetId: number;
        marketId: number;
        bid: number;
        ask: number;
      }
    | undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchAssetDetails();
  }

  private fetchAssetDetails() {
    this.isAssetLoading = true;
    this.isSubscribersLoading = true;

    const assetId = this.route.snapshot.paramMap.get('id');

    if (!assetId) {
      this.isAssetLoading = false;
      this.router.navigate(['/404']);
      return;
    }
    this.http.get<IAssetInner>(`/assets/info/${assetId}`).subscribe({
      next: (asset) => {
        this.asset = asset;
        this.isAssetLoading = false;
        this.http
          .get<{ count: number; subscribers: ISubscriber[] }>(
            `/assets/subscribers/${asset.contract}`
          )
          .subscribe({
            next: ({ subscribers }) => {
              this.subscribers = subscribers;
              this.isSubscribersLoading = false;
            },
            error: (error) => {
              console.error('There was an error!', error);
              this.isSubscribersLoading = false;
            },
          });
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isAssetLoading = false;
        this.router.navigate(['/404']);
      },
    });
  }

  togglePriceSetModal(priceInfo: AssetPricing) {
    const assetId = this.route.snapshot.paramMap.get('id')!;
    this.formData = {
      assetId: +assetId,
      marketId: priceInfo.marketId,
      ask: priceInfo.ask,
      bid: priceInfo.bid,
    };
    this.openModal();
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  refetchAssetDetails() {
    this.fetchAssetDetails();
  }
}
