import { DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  PlaceholderAnimationDirective,
  PlaceholderDirective,
  RowComponent,
  TableDirective,
  TextColorDirective
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { IAssetHolding } from '../subscribers-list/subscribers-list.types';

@Component({
  selector: 'app-users-list',
  imports: [
    TextColorDirective,
    CardComponent,
    TableDirective,
    RowComponent,
    ColComponent,
    CardHeaderComponent,
    CardBodyComponent,
    PlaceholderDirective,
    PlaceholderAnimationDirective,
    RouterLink,
    IconDirective,
    DecimalPipe,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent {
  subscribers: IAssetHolding[] = [];
  isLoading = true;
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
      }>('/issuer/asset/subscriptions')
      .subscribe(({ subscribers }) => {
        this.subscribers = subscribers;
        this.isLoading = false;
      });
  }
}
