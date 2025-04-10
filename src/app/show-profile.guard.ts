import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const showProfileGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(localStorage.getItem('isLogged'));
  if (localStorage.getItem('isLogged') == 'true') {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
