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
import { ITransfer } from './transaction-list.types';
import { UserService } from '../../services/user.service';

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
  constructor(private http: HttpClient, private userService: UserService) {}

  contractAddress: string | null = null;

  transactions: ITransfer[] = [];

  isLoading = true;

  ngOnInit() {
    this.userService.getUser().subscribe((user) => {
      this.contractAddress =
        user?.contacts?.find((item) => item.typeName === 'Email')?.address ||
        null;
    });
    this.http
      .get<{ count: number; transfers: ITransfer[] }>(
        '/issuer/asset/transfers/100'
      )
      .subscribe({
        next: ({ transfers }) => {
          this.transactions = transfers;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
