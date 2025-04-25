import { Injectable } from '@angular/core';
import { IUser } from '../@types/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<IUser | null>(null);

  constructor() {}

  // Set user and emit the new value
  setUser(user: IUser): void {
    this.userSubject.next(user);
  }

  // Get the current user as an Observable
  getUser(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  // Clear user and emit null
  clearUser(): void {
    this.userSubject.next(null);
  }
}
