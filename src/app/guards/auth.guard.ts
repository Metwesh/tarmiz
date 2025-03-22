import { inject } from '@angular/core';
import { CanActivateFn, CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

/**
 * Guard that checks if the user is authenticated.
 * If not, it redirects to the login page.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        // User is authenticated, allow access
        return true;
      } else {
        // User is not authenticated, redirect to login
        // Adding returnUrl query param to redirect back after login
        router.navigate(['/login'], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      }
    })
  );
};

/**
 * Same guard logic for child routes
 */
export const authGuardChild: CanActivateChildFn = (childRoute, state) => {
  return authGuard(childRoute, state);
};
