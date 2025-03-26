import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransaction } from './transaction-list.types';
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
import { RouterLink } from '@angular/router';

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
    RouterLink,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  constructor(private http: HttpClient) {}

  transactions: ITransaction[] = [];

  isLoading = true;

  ngOnInit() {
    this.http.get<ITransaction[]>('/assets/trxs').subscribe({
      next: (transactions) => {
        this.transactions = transactions;
        this.isLoading = false;
      },
      error: () => {
        console.log('Failed to load transactions');
        this.isLoading = false;
      },
    });
  }
}
