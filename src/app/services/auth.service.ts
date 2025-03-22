import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private authSubject = new BehaviorSubject<boolean>(false);

  // Create an observable for use with modern functional guards
  isAuthenticated$ = this.authSubject.asObservable();

  private readonly TOKEN_NAME = 'ng-tarmiz-auth-token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    // Check if user is already logged in from cookie
    this.checkAuthStatus();
  }

  login(
    contract: string,
    username: string,
    password: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http
        .post<{ token: string }>('/account/login', {
          contract,
          username,
          password,
        })
        .subscribe({
          next: (response) => {
            this.token = response.token;

            // Use cookie service instead of localStorage
            this.cookieService.setCookie(this.TOKEN_NAME, this.token, {
              expires: 7, // 7 days
              secure: true, // Use on HTTPS only
              sameSite: 'Strict', // CSRF protection
            });

            this.authSubject.next(true);
            resolve(true);
          },
          error: (error) => {
            console.error('Login failed:', error);
            reject(error);
          },
        });
    });
  }

  logout(): void {
    this.token = null;
    // Delete cookie instead of localStorage
    this.cookieService.deleteCookie(this.TOKEN_NAME);
    this.router.navigate(['/login']);
    this.authSubject.next(false);
  }

  getToken(): any {
    if (!this.token) this.logout();
    return this.token;
  }

  private checkAuthStatus(): void {
    // Get from cookie instead of localStorage
    const token = this.cookieService.getCookie(this.TOKEN_NAME);
    if (!token) return this.logout();

    this.token = token;
    this.authSubject.next(true);
  }
}
