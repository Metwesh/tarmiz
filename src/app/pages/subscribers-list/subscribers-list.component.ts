import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ButtonDirective,
  CardModule,
  ColComponent,
  PlaceholderModule,
  RowComponent,
  SpinnerComponent,
  TableDirective,
} from '@coreui/angular';
import { IAsset } from '../assets-list/asset-list.types';
import { DecimalPipe } from '@angular/common';
import { IAssetHolding } from './subscribers-list.types';

@Component({
  selector: 'app-subscribers-list',
  imports: [
    RowComponent,
    ColComponent,
    TableDirective,
    CardModule,
    ButtonDirective,
    PlaceholderModule,
    SpinnerComponent,
    DecimalPipe,
  ],
  templateUrl: './subscribers-list.component.html',
  styleUrl: './subscribers-list.component.scss',
})
export class SubscribersListComponent {
  isLoading = true;
  subscribers: IAssetHolding[] = [];

  submitting = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPendingSubscribers();
  }

  private fetchPendingSubscribers() {
    this.http
      .get<{
        count: number;
        subscribers: IAssetHolding[];
      }>('/issuer/asset/subscriptions/pending')
      .subscribe(({ subscribers }) => {
        this.subscribers = subscribers;
        this.isLoading = false;
      });
  }

  approveSubscriber(args: { assetId: number; subscriber: string }) {
    this.submitting = true;
    this.http
      .post('/issuer/asset/subscription/set', {
        ...args,
        state: 2, // ALWAYS
      })
      .subscribe({
        next: () => {
          this.fetchPendingSubscribers();
          this.submitting = false;
        },
        error: () => {
          this.submitting = false;
        },
      });
  }
}
