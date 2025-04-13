import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const userStateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (localStorage.getItem('isLogged') != 'false') {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
