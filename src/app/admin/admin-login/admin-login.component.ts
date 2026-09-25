import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
  <div class="login-shell">

    <!-- Animated Background -->
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="bg-orb bg-orb-3"></div>

    <!-- Login Card -->
    <div class="login-card animate-fade">

      <!-- Logo -->
      <div class="login-logo">
        <img src="logo.png" alt="Thozhan Irrigation" />
      </div>

      <!-- Header -->
      <div class="login-header">
        <div class="admin-badge">
          <i class="fa-solid fa-shield-halved"></i>
          Secure Admin Portal
        </div>
        <h1>Admin Sign In</h1>
        <p>Enter your credentials to access the management dashboard</p>
      </div>

      <!-- Form -->
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" novalidate>

        <div class="form-group" style="margin-bottom:1rem">
          <label for="username"><i class="fa-solid fa-user"></i> Username</label>
          <input id="username" type="text" formControlName="username"
            class="form-control" placeholder="admin" autocomplete="username" />
          @if (loginForm.get('username')?.touched && loginForm.get('username')?.invalid) {
            <span class="form-error">Username is required</span>
          }
        </div>

        <div class="form-group" style="margin-bottom:1.5rem">
          <label for="password"><i class="fa-solid fa-lock"></i> Password</label>
          <div class="pw-wrap">
            <input [type]="showPw() ? 'text' : 'password'" id="password"
              formControlName="password" class="form-control" placeholder="••••••••"
              autocomplete="current-password" />
            <button type="button" class="pw-toggle" (click)="showPw.set(!showPw())" tabindex="-1">
              <i class="fa-solid" [class.fa-eye]="!showPw()" [class.fa-eye-slash]="showPw()"></i>
            </button>
          </div>
          @if (loginForm.get('password')?.touched && loginForm.get('password')?.invalid) {
            <span class="form-error">Password is required (min 6 chars)</span>
          }
        </div>

        <!-- Error Alert -->
        @if (errorMsg()) {
          <div class="error-alert">
            <i class="fa-solid fa-circle-xmark"></i>
            {{ errorMsg() }}
          </div>
        }

        <button type="submit" class="btn btn-primary btn-full"
          [disabled]="loading() || loginForm.invalid">
          @if (loading()) {
            <i class="fa-solid fa-spinner animate-spin"></i>
            Signing in...
          } @else {
            <i class="fa-solid fa-right-to-bracket"></i>
            Sign In to Dashboard
          }
        </button>

      </form>

      <!-- Credentials Info Box -->
      <div class="creds-box">
        <div class="creds-header">
          <i class="fa-solid fa-circle-info"></i>
          Default Credentials
        </div>
        <div class="creds-row">
          <span class="creds-label">Username:</span>
          <code>admin</code>
        </div>
        <div class="creds-row">
          <span class="creds-label">Password:</span>
          <code>Set via python manage.py createsuperuser</code>
        </div>
        <div class="creds-note">
          <i class="fa-solid fa-triangle-exclamation"></i>
          Change the default password immediately in production.
        </div>
      </div>

      <!-- Back to site -->
      <div class="back-link">
        <a routerLink="/">
          <i class="fa-solid fa-arrow-left"></i>
          Back to Website
        </a>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .login-shell {
    min-height: 100vh;
    min-height: 100dvh;
    background: radial-gradient(circle at 50% 20%, #0A3D29 0%, #06271C 60%, #031811 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2.5rem 1.25rem;
    position: relative;
    overflow-y: auto;
    box-sizing: border-box;
  }

  .bg-orb {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(80px);
    opacity: 0.25;
  }
  .bg-orb-1 { width: 400px; height: 400px; background: radial-gradient(circle, #14532d, transparent); top: -100px; right: -100px; }
  .bg-orb-2 { width: 300px; height: 300px; background: radial-gradient(circle, #1a6b3a, transparent); bottom: -50px; left: -50px; }
  .bg-orb-3 { width: 200px; height: 200px; background: radial-gradient(circle, #fbbf24, transparent); top: 40%; left: 10%; opacity: 0.1; }

  .login-card {
    margin: auto 0;
    background: rgba(6, 46, 30, 0.94);
    backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 24px;
    padding: 2.25rem;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    position: relative;
    z-index: 1;
    box-sizing: border-box;
  }

  .login-logo {
    background: #FFFFFF;
    border-radius: 14px;
    padding: 10px 16px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(251, 191, 36, 0.25);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  .login-logo img { height: 48px; max-width: 100%; object-fit: contain; }

  .login-header { text-align: center; margin-bottom: 1.75rem; }
  .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(245, 158, 11, 0.15);
    border: 1px solid rgba(245, 158, 11, 0.35);
    color: #FCD34D;
    font-size: 0.6875rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.3rem 0.875rem;
    border-radius: 999px;
    margin-bottom: 0.875rem;
  }
  .login-header h1 { color: #FFFFFF; font-size: 1.6rem; font-weight: 800; margin-bottom: 0.35rem; }
  .login-header p { color: #B4D1C2; font-size: 0.85rem; line-height: 1.5; }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #F5FFF8;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .form-group label i {
    color: var(--brand-bright, #27C46A);
    font-size: 0.875rem;
  }

  .form-control {
    width: 100%;
    height: 48px;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    font-family: inherit;
    background: #FFFFFF;
    color: #10231B;
    border: 1.5px solid #D8E5DC;
    border-radius: 12px;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }
  .form-control:focus {
    border-color: var(--brand-bright, #27C46A);
    box-shadow: 0 0 0 3px rgba(39, 196, 106, 0.25);
  }
  .form-control::placeholder {
    color: #82958B;
  }

  .form-error {
    display: block;
    color: #F87171;
    font-size: 0.75rem;
    font-weight: 600;
    margin-top: 0.35rem;
  }

  .pw-wrap { position: relative; }
  .pw-wrap .form-control { padding-right: 2.75rem; }
  .pw-toggle {
    position: absolute;
    right: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #61736A;
    cursor: pointer;
    padding: 0.35rem;
    font-size: 0.95rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s;
  }
  .pw-toggle:hover { color: #10231B; }

  .error-alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #FCA5A5;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.8125rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .btn-full {
    width: 100%;
    height: 48px;
    font-size: 0.95rem;
    font-weight: 700;
    border-radius: 12px;
  }

  .creds-box {
    margin-top: 1.5rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 1.15rem;
  }
  .creds-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--brand-bright, #27C46A);
    margin-bottom: 0.75rem;
  }
  .creds-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-bottom: 0.6rem;
    flex-wrap: wrap;
  }
  .creds-label {
    font-size: 0.8125rem;
    color: #B4D1C2;
    font-weight: 500;
  }
  code {
    background: rgba(39, 196, 106, 0.15);
    color: #4ADE80;
    padding: 0.25rem 0.55rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-family: 'Courier New', monospace;
    border: 1px solid rgba(39, 196, 106, 0.2);
    word-break: break-all;
  }
  .creds-note {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #FCD34D;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    line-height: 1.4;
  }

  .back-link { text-align: center; margin-top: 1.5rem; }
  .back-link a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #B4D1C2;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: color 0.15s;
  }
  .back-link a:hover { color: #FFFFFF; }
  `]
})
export class AdminLoginComponent {
  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);
  private route  = inject(ActivatedRoute);

  showPw  = signal(false);
  loading = signal(false);
  errorMsg = signal('');

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMsg.set('');

    const { username, password } = this.loginForm.value;

    this.auth.login(username!, password!).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/admin/dashboard';
        this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.loading.set(false);
        const msg = err?.error?.detail || err?.error?.non_field_errors?.[0]
          || 'Invalid username or password. Please try again.';
        this.errorMsg.set(msg);
      }
    });
  }
}
