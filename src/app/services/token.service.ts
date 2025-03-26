import { Injectable } from '@angular/core';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly TOKEN_NAME = 'ng-tarmiz-auth-token';

  constructor(private cookieService: CookieService) {}

  getToken(): string | null {
    return this.cookieService.getCookie(this.TOKEN_NAME);
  }

  setToken(token: string): void {
    this.cookieService.setCookie(this.TOKEN_NAME, token, {
      expires: 1,
      secure: true,
      sameSite: 'Strict',
    });
  }

  clearToken(): void {
    this.cookieService.deleteCookie(this.TOKEN_NAME);
  }
}
