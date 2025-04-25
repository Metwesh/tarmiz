import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  BadgeComponent,
  BreadcrumbModule,
  CardModule,
  ColComponent,
  ContainerComponent,
  PlaceholderModule,
  RowComponent,
  TableDirective,
} from '@coreui/angular';
import { IAssetHolding } from '../subscribers-list/subscribers-list.types';

@Component({
  selector: 'app-user-inner',
  imports: [
    BreadcrumbModule,
    CardModule,
    ColComponent,
    RowComponent,
    BadgeComponent,
    PlaceholderModule,
    ContainerComponent,
    RouterLink,
    TableDirective,
    DecimalPipe,
  ],
  templateUrl: './user-inner.component.html',
  styleUrl: './user-inner.component.scss',
})
export class UserInnerComponent {
  userId: string | null = null;

  subscribers: IAssetHolding[] = [];

  isLoading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id;

    this.http
      .get<{ count: number; taum: number; subscribers: IAssetHolding[] }>(
        `/issuer/asset/subscriptions/subscriber/${id}`
      )
      .subscribe({
        next: ({ subscribers }) => {
          this.subscribers = subscribers;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
