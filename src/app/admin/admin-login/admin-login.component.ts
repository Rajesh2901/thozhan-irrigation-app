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
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    position: relative;
    overflow: hidden;
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
    background: rgba(6,46,30,0.85);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 2.5rem;
    width: 100%;
    max-width: 440px;
    box-shadow: 0 32px 64px -16px rgba(0,0,0,0.5);
    position: relative;
    z-index: 1;
  }

  .login-logo {
    background: #fff;
    border-radius: 14px;
    padding: 10px 16px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(251,191,36,0.2);
  }
  .login-logo img { height: 52px; object-fit: contain; }

  .login-header { text-align: center; margin-bottom: 2rem; }
  .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(245,158,11,0.1);
    border: 1px solid rgba(245,158,11,0.25);
    color: #fcd34d;
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.3rem 0.875rem;
    border-radius: 999px;
    margin-bottom: 0.875rem;
  }
  .login-header h1 { color: #fff; font-size: 1.5rem; font-weight: 900; margin-bottom: 0.4rem; }
  .login-header p { color: var(--text-muted); font-size: 0.8125rem; }

  .pw-wrap { position: relative; }
  .pw-toggle {
    position: absolute;
    right: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #475569;
    cursor: pointer;
    padding: 0;
    font-size: 0.875rem;
    transition: color 0.15s;
  }
  .pw-toggle:hover { color: var(--brand-400); }

  .error-alert {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.25);
    color: #fca5a5;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  .creds-box {
    margin-top: 1.5rem;
    background: rgba(0,0,0,0.25);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px;
    padding: 1rem;
  }
  .creds-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--brand-400);
    margin-bottom: 0.75rem;
  }
  .creds-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; }
  .creds-label { font-size: 0.75rem; color: var(--text-muted); }
  code {
    background: rgba(34,197,94,0.1);
    color: #4ade80;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.7rem;
    font-family: 'Courier New', monospace;
  }
  .creds-note {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    color: #fcd34d;
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .back-link { text-align: center; margin-top: 1.5rem; }
  .back-link a {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    color: var(--text-muted);
    font-size: 0.8rem;
    text-decoration: none;
    transition: color 0.15s;
  }
  .back-link a:hover { color: var(--brand-400); }
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
