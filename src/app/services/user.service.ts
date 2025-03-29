import { Injectable } from '@angular/core';
import { IUser } from '../@types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: IUser | null = null;

  constructor() {}

  setUser(user: IUser) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  clearUser() {
    this.user = null;
  }
}
