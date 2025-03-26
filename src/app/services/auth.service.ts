import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.authSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
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
    this.authSubject.next(false);
    setTimeout(() => this.router.navigate(['/login']), 0);
  }

  validateToken(): Promise<boolean> {
    return new Promise((resolve) => {
      const token = this.tokenService.getToken();
      if (!token) return resolve(false);

      this.http
        .get<{ info: { accountId: number } }>('/account/info')
        .subscribe({
          next: (res) => {
            resolve(!!res?.info?.accountId);
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
        if (!isValid) this.logout();
      })
      .catch(() => {
        this.authSubject.next(false);
        this.logout();
      });
  }
}
