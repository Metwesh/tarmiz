import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BadgeComponent,
  CardModule,
  ColComponent,
  GutterDirective,
  PlaceholderModule,
  RowComponent,
} from '@coreui/angular';
import { Subscription } from 'rxjs';
import { IUser } from '../../@types/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [
    ColComponent,
    RowComponent,
    CardModule,
    BadgeComponent,
    GutterDirective,
    PlaceholderModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: IUser | null = null;
  isProfileLoading = true;

  private userSubscription: Subscription | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    // Subscribe to user data changes
    this.userSubscription = this.userService.getUser().subscribe({
      next: (data) => {
        this.isProfileLoading = false;
        this.userData = data;
      },
      error: () => {
        this.isProfileLoading = false;
      },
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
