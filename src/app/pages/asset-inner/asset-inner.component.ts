import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  BadgeComponent,
  BreadcrumbModule,
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderActionsComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  GutterDirective,
  PlaceholderModule,
  RowComponent,
  SpinnerComponent,
  TableDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { PriceSetModalComponent } from '../../components/price-set-modal/price-set-modal.component';
import { SetAssetStateModalComponent } from '../../components/set-asset-state-modal/set-asset-state-modal.component';
import { AssetPricing, IAsset } from '../assets-list/asset-list.types';
import { IAssetHolding } from '../subscribers-list/subscribers-list.types';
import { ChartData, ChartOptions } from 'chart.js';
import { PriceHistory, PricePoint } from '../../@types/price-history';
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-asset-inner',
  imports: [
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    CardHeaderActionsComponent,
    BadgeComponent,
    BreadcrumbModule,
    RouterLink,
    PlaceholderModule,
    TableDirective,
    DatePipe,
    ButtonDirective,
    PriceSetModalComponent,
    SetAssetStateModalComponent,
    DecimalPipe,
    ChartjsComponent,
    SpinnerComponent,
    GutterDirective,
  ],
  providers: [DatePipe],
  templateUrl: './asset-inner.component.html',
  styleUrl: './asset-inner.component.scss',
})
export class AssetInnerComponent implements OnInit {
  public asset: IAsset | null = null;
  public isAssetLoading = true;

  public subscribers: IAssetHolding[] = [];
  public isSubscribersLoading = true;

  isPriceSetModalOpen = false;
  priceSetFormData:
    | {
        assetId: number;
        assetName: string;
        marketId: number;
        marketName: string;
        bid: number;
        ask: number;
      }
    | undefined;

  isAssetStateModalOpen = false;
  assetState: number | undefined;

  isLoadingPriceHistory = true;

  priceHistory: Array<
    Omit<PricePoint, 'time'> & {
      time: string; // Formatted date string
    }
  > = [];

  options: ChartOptions = {
    maintainAspectRatio: false,
  };

  chartBarData: ChartData = { labels: [], datasets: [] };

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
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

    this.http.get<IAsset>(`/issuer/asset/info/${assetId}`).subscribe({
      next: (asset) => {
        this.asset = asset;
        this.isAssetLoading = false;
        const market = '818'; // EGYPT market
        this.http
          .get<PriceHistory>(`/asset/price/history/${assetId}/${market}`)
          .subscribe({
            next: (data) => {
              this.priceHistory = data.prices
                .map((item) => ({
                  time: this.datePipe.transform(item.time * 1000) ?? '', // Convert UNIX timestamp
                  bid: item.bid,
                  ask: item.ask,
                }))
                .reverse(); // Reverse to show the latest prices first
              this.isLoadingPriceHistory = false;
              this.updatePriceHistoryChart();
            },
            error: (err) => {
              console.error('Failed to fetch price history:', err);
              this.isLoadingPriceHistory = false;
            },
          });
        this.http
          .get<{ count: number; taum: number; subscribers: IAssetHolding[] }>(
            `/issuer/asset/subscriptions/asset/${asset.assetId}`
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
    this.priceSetFormData = {
      assetId: +assetId,
      assetName: this.asset?.name ?? '',
      marketId: priceInfo.marketId,
      marketName: priceInfo.marketNameFull,
      ask: priceInfo.ask,
      bid: priceInfo.bid,
    };
    this.openPriceSetModal();
  }

  openPriceSetModal() {
    this.isPriceSetModalOpen = true;
  }

  closePriceSetModal() {
    this.isPriceSetModalOpen = false;
  }

  toggleAssetStateModal(state: number | undefined) {
    if (state === undefined) return;
    this.assetState = state;
    this.openAssetStateModal();
  }

  openAssetStateModal() {
    this.isAssetStateModalOpen = true;
  }

  closeAssetStateModal() {
    this.isAssetStateModalOpen = false;
  }

  refetchAssetDetails() {
    this.fetchAssetDetails();
  }

  updatePriceHistoryChart() {
    const bidPriceOptions =
      this.priceHistory.length === 1
        ? {
            backgroundColor: '#08D0DD',
          }
        : {
            borderColor: '#08D0DD',
            backgroundColor: 'rgba(8, 208, 221, 0.2)',
          };
    const askPriceOptions =
      this.priceHistory.length === 1
        ? {
            backgroundColor: '#FF5733',
          }
        : {
            borderColor: '#FF5733',
            backgroundColor: 'rgba(255, 87, 51, 0.2)',
          };
    // 📊 Bar or Line Chart: Bid & Asking prices
    this.chartBarData = {
      labels: this.priceHistory.map((item) =>
        this.datePipe.transform(item.time)
      ),
      datasets: [
        {
          ...bidPriceOptions,
          label: 'Bid Price',
          data: this.priceHistory.map((item) => item.bid),
          fill: true,
        },
        {
          ...askPriceOptions,
          label: 'Ask Price',
          data: this.priceHistory.map((item) => item.ask),
          fill: true,
        },
      ],
    };
  }
}
