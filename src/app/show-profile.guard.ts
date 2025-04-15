import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const showProfileGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (
    localStorage.getItem('isLogged') != 'false' &&
    localStorage.getItem('isLogged') != null
  ) {
    return true;
  } else {
    authService.showLoginPopup.set(true);
    return false;
  }
};
