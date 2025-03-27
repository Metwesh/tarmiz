import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITransfer } from '../transaction-list/transaction-list.types';
import {
  BreadcrumbModule,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  ContainerComponent,
  ListGroupModule,
  PlaceholderModule,
  RowComponent,
} from '@coreui/angular';

@Component({
  selector: 'app-transaction-inner',
  imports: [
    ColComponent,
    RowComponent,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ListGroupModule,
    PlaceholderModule,
    ContainerComponent,
    BreadcrumbModule,
    RouterLink
  ],
  templateUrl: './transaction-inner.component.html',
  styleUrl: './transaction-inner.component.scss',
})
export class TransactionInnerComponent {
  isTransactionLoading = true;
  transaction: ITransfer | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const contract = this.route.snapshot.paramMap.get('address');
    const trxId = this.route.snapshot.paramMap.get('id');

    if (!trxId || !contract) {
      this.isTransactionLoading = false;
      this.router.navigate(['/404']);
      return;
    }

    this.http
      .post<ITransfer>('/assets/trx', {
        trxId,
        contract,
      })
      .subscribe({
        next: (transaction) => {
          this.transaction = transaction;
          this.isTransactionLoading = false;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.isTransactionLoading = false;
          this.router.navigate(['/404']);
        },
      });
  }
}
