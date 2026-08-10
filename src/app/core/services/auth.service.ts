import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthTokens } from '../models/interfaces';

const TOKEN_KEY   = 'thozhan_access_token';
const REFRESH_KEY = 'thozhan_refresh_token';
const USER_KEY    = 'thozhan_admin_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);

  // Angular Signals for reactive auth state
  private _isAuthenticated = signal<boolean>(this.hasValidToken());
  private _username        = signal<string>(this.getSavedUsername());

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly username        = this._username.asReadonly();
  readonly isAdmin         = computed(() => this._isAuthenticated());

  // ── Login ─────────────────────────────────────────────────
  login(username: string, password: string): Observable<AuthTokens> {
    return this.http.post<AuthTokens>('/api/v1/auth/token/', { username, password }).pipe(
      tap(tokens => {
        localStorage.setItem(TOKEN_KEY,   tokens.access);
        localStorage.setItem(REFRESH_KEY, tokens.refresh);
        localStorage.setItem(USER_KEY,    username);
        this._isAuthenticated.set(true);
        this._username.set(username);
      }),
      catchError(err => {
        this._isAuthenticated.set(false);
        return throwError(() => err);
      })
    );
  }

  // ── Logout ────────────────────────────────────────────────
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
    this._isAuthenticated.set(false);
    this._username.set('');
    this.router.navigate(['/admin/login']);
  }

  // ── Token Refresh ─────────────────────────────────────────
  refreshToken(): Observable<{ access: string }> {
    const refresh = localStorage.getItem(REFRESH_KEY);
    if (!refresh) return throwError(() => new Error('No refresh token'));

    return this.http.post<{ access: string }>('/api/v1/auth/token/refresh/', { refresh }).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.access);
      }),
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
  }

  // ── Getters ───────────────────────────────────────────────
  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private getSavedUsername(): string {
    return localStorage.getItem(USER_KEY) || '';
  }
}
