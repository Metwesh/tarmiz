import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { ITransfer } from '../transaction-list/transaction-list.types';
import { UserService } from '../../services/user.service';

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
    RouterLink,
    DatePipe,
    CurrencyPipe,
  ],
  templateUrl: './transaction-inner.component.html',
  styleUrl: './transaction-inner.component.scss',
})
export class TransactionInnerComponent {
  isTransactionLoading = true;
  transaction: ITransfer | null = null;

  contractAddress: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.contractAddress =
        user?.contacts?.find((item) => item.typeName === 'Email')?.address ||
        null;
    });
    const trxId = this.route.snapshot.paramMap.get('id');

    this.http.get<ITransfer>(`/issuer/asset/transfer/${trxId}`).subscribe({
      next: (transaction) => {
        this.transaction = transaction;
        this.isTransactionLoading = false;
      },
      error: () => {
        this.isTransactionLoading = false;
        this.router.navigate(['/404']);
      },
    });
  }
}
