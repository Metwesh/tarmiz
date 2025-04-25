import { HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from '../env';
import { CookieService } from '../app/services/cookie.service';
import { UserService } from '../app/services/user.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const cookieService = inject(CookieService);
  const token = cookieService.getCookie('ng-tarmiz-auth-token');
  const userService = inject(UserService);

  const urlReqClone = req.clone({
    url: req.url.startsWith('http')
      ? req.url
      : `${environment.baseApiUrl}${req.url}`,
  });

  if (!token) return next(urlReqClone);

  const newReq = urlReqClone.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  return next(newReq).pipe(
    catchError((err) => {
      console.log(err);
      if (
        err.status === 401 ||
        (err.status === 400 &&
          err.error.error === 'Session invalid or expired') ||
        (err.status === 400 &&
          err.error.error ===
            'Execution reverted: Session invalid or expired') ||
        (err.status === 400 &&
          err.error.error === 'Execution reverted: Session invalid or expired')
      ) {
        cookieService.deleteCookie('ng-tarmiz-auth-token');
        userService.clearUser();
      }
      throw err;
    })
  );
}
