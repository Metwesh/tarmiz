import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  BadgeComponent,
  BreadcrumbModule,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  PlaceholderModule,
  RowComponent,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { IAssetInner } from '../assets-list/asset-list.types';

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
  ],
  templateUrl: './asset-inner.component.html',
  styleUrl: './asset-inner.component.scss',
})
export class AssetInnerComponent implements OnInit {
  public asset: IAssetInner | null = null;
  public isLoading = true;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const assetId = this.route.snapshot.paramMap.get('id');

    if (!assetId) {
      this.isLoading = false;
      this.router.navigate(['/404']);
      return;
    }
    this.http.get<IAssetInner>(`/assets/info/${assetId}`).subscribe({
      next: (asset) => {
        this.asset = asset;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('There was an error!', error);
        this.isLoading = false;
        this.router.navigate(['/404']);
      },
    });
  }
}
