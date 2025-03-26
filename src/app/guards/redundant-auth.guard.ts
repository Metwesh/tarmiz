import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const redundantAuthGuard: CanActivateFn = () => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (tokenService.getToken()) {
    setTimeout(() => router.navigate(['/dashboard']), 0);
    return false;
  }
  return true;
};
