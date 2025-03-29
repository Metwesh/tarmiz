import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { IUser } from '../@types/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
    private userService: UserService
  ) {
    this.checkAuthStatus();
  }

  login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post<{ token: string }>('/account/login', { username, password })
        .subscribe({
          next: (response) => {
            this.tokenService.setToken(response.token);
            this.authSubject.next(true);
            this.validateToken();
            resolve(true);
          },
          error: (err) => {
            console.error('Login error:', err);
            this.authSubject.next(false);
            reject(err);
          },
        });
    });
  }

  logout(): void {
    this.tokenService.clearToken();
    this.userService.clearUser();
    this.authSubject.next(false);
    setTimeout(() => this.router.navigate(['/login']), 0);
  }

  validateToken(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = this.tokenService.getToken();
      if (!token) return resolve(false);

      this.http.get<{ info: IUser }>('/account/info').subscribe({
        next: (res) => {
          if (!!res?.info?.accountId) {
            this.userService.setUser(res.info);
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (err) => {
          console.log('Token validation failed', err);
          resolve(false);
        },
      });
    });
  }

  private checkAuthStatus(): void {
    const token = this.tokenService.getToken();
    if (!token) return;

    this.validateToken()
      .then((isValid) => {
        this.authSubject.next(isValid);
        if (!isValid) {
          this.userService.clearUser();
          this.logout();
        }
      })
      .catch(() => {
        this.authSubject.next(false);
        this.userService.clearUser();
        this.logout();
      });
  }
}
