import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData, ChartOptions } from 'chart.js';
import { SYSTEM_ENUMS } from '../../constants/enums';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent,
  SpinnerComponent,
  TextColorDirective,
} from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { EnumService } from '../../services/enum-service.service';
import { IAsset } from '../assets-list/asset-list.types';

@Component({
  selector: 'app-dashboard',
  imports: [
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsComponent,
    SpinnerComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  assets: IAsset[] = [];
  isLoading = true;

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ count: number; assets: IAsset[] }>('/assets/list')
      .subscribe({
        next: ({ assets }) => {
          this.assets = assets;
          this.isLoading = false;
          this.updateCharts();
        },
        error: (err) => {
          console.error('Failed to load assets:', err);
          this.isLoading = false;
        },
      });
  }

  updateCharts() {
    if (!this.assets.length) return;

    // 📊 Bar Chart: Asset Supply
    this.chartBarData = {
      labels: this.assets.map((asset) => asset.name),
      datasets: [
        {
          label: 'Total Supply',
          backgroundColor: '#08D0DD',
          data: this.assets.map((asset) => asset.supply),
        },
      ],
    };

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
