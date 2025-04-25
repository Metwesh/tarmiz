import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  PlaceholderAnimationDirective,
  PlaceholderDirective,
  RowComponent,
  TableDirective,
  TextColorDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { IAsset } from './asset-list.types';

@Component({
  selector: 'app-assets-list',
  imports: [
    TextColorDirective,
    CardComponent,
    TableDirective,
    RowComponent,
    ColComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ButtonDirective,
    IconDirective,
    PlaceholderDirective,
    PlaceholderAnimationDirective,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './assets-list.component.html',
  styleUrl: './assets-list.component.scss',
})
export class AssetsListComponent implements OnInit {
  public assets: IAsset[] = [];
  public isAssetsLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<{ count: number; assets: IAsset[] }>('/asset/list')
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
}
