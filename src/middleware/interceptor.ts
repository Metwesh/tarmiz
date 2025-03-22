import { HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { AuthService } from '../app/services/auth.service';
import { environment } from '../env';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  // Inject the current `AuthService` and use it to get an authentication token.
  const authService = inject(AuthService);

  const token = authService.getToken();

  const urlReqClone = req.clone({
    url: req.url.startsWith('http')
      ? req.url
      : `${environment.baseApiUrl}${req.url}`,
  });

  // If no token, just add the base URL
  if (!token) return next(urlReqClone);

  // Clone the request to add the authentication header.
  const newReq = urlReqClone.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });

  // Return the request with response interception
  return next(newReq).pipe(
    tap({
      next: (event) => {
        // Handle successful responses
        // You can examine the event to check if it's a complete response
      },
    }),
    catchError((err) => {
      // Check for 401 Unauthorized response
      if (
        err.status === 400 &&
        err.error.error === 'Session invalid or expired'
      ) {
        // Token might be expired - handle logout
        authService.logout();
      }

      // Rethrow the error to be handled by subscribers
      throw err;
    })
  );
}
