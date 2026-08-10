import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/** Route guard: protects /admin/* routes. Redirects to /admin/login if not authenticated. */
export const authGuard: CanActivateFn = (route, state) => {
  const auth   = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) {
    return true;
  }

  // Store the attempted URL so we can redirect after login
  router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
