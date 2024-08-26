import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if(!auth.ifAuthantcate()) {
      router.navigateByUrl('/auth')
      return false
  }

  return true;
};
