import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  CardModule,
  ColComponent,
  FormSelectDirective,
  RowComponent,
  SpinnerComponent,
  TextColorDirective,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData, ChartOptions } from 'chart.js';
import { IAsset } from '../assets-list/asset-list.types';
import { PriceHistory, PricePoint } from '../../@types/price-history';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardModule,
    ChartjsComponent,
    SpinnerComponent,
    FormSelectDirective,
    FormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  assets: IAsset[] = [];
  priceHistory: Array<
    Omit<PricePoint, 'time'> & {
      time: string; // Formatted date string
    }
  > = [];
  isLoading = true;
  isLoadingPriceHistory = true;

  options: ChartOptions = {
    maintainAspectRatio: false,
  };

  barChartOptions: ChartOptions = {
    ...this.options,
    normalized: true,
  };

  // Chart Data
  chartBarData: ChartData = { labels: [], datasets: [] };
  chartPieData: ChartData = { labels: [], datasets: [] };
  chartDoughnutData: ChartData = { labels: [], datasets: [] };

  private _selectedAssetId = '';

  constructor(private http: HttpClient, private datePipe: DatePipe) {}

  get selectedAssetId(): string {
    return this._selectedAssetId;
  }

  set selectedAssetId(value: string) {
    if (!value) return;
    this._selectedAssetId = value;
    this.fetchPriceHistory();
  }

  ngOnInit() {
    this.http
      .get<{ count: number; assets: IAsset[] }>('/assets/list')
      .subscribe({
        next: ({ assets }) => {
          this.assets = assets;
          this.isLoading = false;
          this.updateCharts();
          this.selectedAssetId = `${this.assets[0]?.assetId}` || '';
        },
        error: (err) => {
          console.error('Failed to load assets:', err);
          this.isLoading = false;
        },
      });
  }

  fetchPriceHistory() {
    this.isLoadingPriceHistory = true;
    const assetId = this.selectedAssetId;
    const market = '818'; // EGYPT market
    if (!assetId) {
      this.isLoadingPriceHistory = false;
      return;
    }
    this.http
      .get<PriceHistory>(`/assets/price/history/${assetId}/${market}`)
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

  updateCharts() {
    if (!this.assets.length) return;

    // 🥧 Pie Chart: Asset Type Distribution
    const assetTypeMap = new Map<string, number>();
    this.assets.forEach((asset) => {
      assetTypeMap.set(
        asset.assetTypeName,
        (assetTypeMap.get(asset.assetTypeName) || 0) + 1
      );
    });

    this.chartPieData = {
      labels: Array.from(assetTypeMap.keys()).map(
        (type) => type || `Type ${type}`
      ),
      datasets: [
        {
          data: Array.from(assetTypeMap.values()),
          backgroundColor: ['#332EAE', '#FF6384', '#FFCE56', '#4BC0C0'],
        },
      ],
    };

    // 🍩 Doughnut Chart: Asset State Distribution
    const assetStateMap = new Map<string, number>();
    this.assets.forEach((asset) => {
      assetStateMap.set(
        asset.stateName,
        (assetStateMap.get(asset.stateName) || 0) + 1
      );
    });

    this.chartDoughnutData = {
      labels: Array.from(assetStateMap.keys()).map(
        (state) => state || `State ${state}`
      ),
      datasets: [
        {
          data: Array.from(assetStateMap.values()),
          backgroundColor: ['#D622FF', '#FF4500', '#FFD700', '#32CD32'],
        },
      ],
    };
  }
}
