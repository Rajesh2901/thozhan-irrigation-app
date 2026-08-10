import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { throwError, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * HTTP Interceptor: Automatically attaches the JWT Bearer token to every API request.
 * If a 401 is received, attempts to refresh the token once, then retries the request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getAccessToken();

  // Skip auth header for public endpoints and external URLs
  const isAuthEndpoint = req.url.includes('/auth/token/');
  const isExternalUrl  = req.url.startsWith('http') && !req.url.includes(window.location.hostname);

  if (isAuthEndpoint || isExternalUrl || !token) {
    return next(req);
  }

  // Attach Bearer token
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` }
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // On 401, try refreshing the token once
      if (error.status === 401 && !req.url.includes('/auth/token/refresh/')) {
        return auth.refreshToken().pipe(
          switchMap(res => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${res.access}` }
            });
            return next(retryReq);
          }),
          catchError(() => {
            auth.logout();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
