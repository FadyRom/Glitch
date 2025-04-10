import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const userStateGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log(localStorage.getItem('isLogged'));
  if (localStorage.getItem('isLogged') == 'true') {
    router.navigate(['/']);
    return false;
  } else {
    return true;
  }
};
