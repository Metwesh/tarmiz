import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  BadgeComponent,
  BreadcrumbModule,
  ButtonDirective,
  CardModule,
  ColComponent,
  ContainerComponent,
  PlaceholderModule,
  RowComponent,
  SpinnerComponent,
  TableDirective,
} from '@coreui/angular';
import { UserService } from 'src/app/services/user.service';
import { IAssetHolding } from '../subscribers-list/subscribers-list.types';
import { ITransfer } from '../transaction-list/transaction-list.types';
import { IconDirective } from '@coreui/icons-angular';

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
    DatePipe,
    IconDirective,
    ButtonDirective,
  ],
  templateUrl: './user-inner.component.html',
  styleUrl: './user-inner.component.scss',
})
export class UserInnerComponent implements OnInit {
  userId: string | null = null;

  contractAddress: string | null = null;

  subscribers: IAssetHolding[] = [];

  usersIsLoading = true;

  selectedAsset: number | undefined;

  transactionsIsLoading = false;
  transactions: ITransfer[] = [];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id;
  }

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.contractAddress =
        user?.contacts?.find((item) => item.typeName === 'Email')?.address ||
        null;
    });

    this.http
      .get<{ count: number; taum: number; subscribers: IAssetHolding[] }>(
        `/issuer/asset/subscriptions/subscriber/${this.userId}`
      )
      .subscribe({
        next: ({ subscribers }) => {
          this.subscribers = subscribers;
          this.usersIsLoading = false;
        },
        error: () => {
          this.usersIsLoading = false;
        },
      });
  }

  getTransactions() {
    this.http
      .get<{ count: number; transfers: ITransfer[] }>(
        `/issuer/asset/transfers/subscriber/${this.userId}/${this.selectedAsset}`
      )
      .subscribe({
        next: ({ transfers }) => {
          this.transactions = transfers;
          this.transactionsIsLoading = false;
        },
        error: () => {
          this.transactionsIsLoading = false;
        },
      });
  }

  onSubscriberClick(subscriber: IAssetHolding) {
    if (this.selectedAsset === subscriber.assetId) return;
    this.transactionsIsLoading = true;
    this.selectedAsset = subscriber.assetId;
    this.getTransactions();
  }
}
