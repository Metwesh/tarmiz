import { DatePipe, DecimalPipe } from '@angular/common';
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
  TextColorDirective,
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { ITransaction, ITransfer } from './transaction-list.types';

@Component({
  selector: 'app-transaction-list',
  imports: [
    TextColorDirective,
    CardComponent,
    TableDirective,
    RowComponent,
    ColComponent,
    CardHeaderComponent,
    CardBodyComponent,
    IconDirective,
    PlaceholderDirective,
    PlaceholderAnimationDirective,
    DatePipe,
    RouterLink,
    IconDirective,
    DecimalPipe,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  constructor(private http: HttpClient) {}

  transactions: Array<ITransfer & Record<'contractAddress', string>> = [];

  isLoading = true;

  ngOnInit() {
    this.http
      .get<{ count: number; transfers: ITransaction[] }>('/assets/trxs')
      .subscribe({
        next: ({ transfers }) => {
          this.transactions = transfers.flatMap((trx) =>
            trx.trxs.map((tInner) => ({
              ...tInner,
              contractAddress: trx?.contractAddress ?? '',
            }))
          );

          this.isLoading = false;
        },
        error: () => {
          console.log('Failed to load transactions');
          this.isLoading = false;
        },
      });
  }
}
