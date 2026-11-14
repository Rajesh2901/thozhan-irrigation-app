import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

const ADMIN_NAV = [
  { path: '/admin/dashboard', label: 'Dashboard',       icon: 'fa-gauge-high' },
  { path: '/admin/leads',     label: 'Quote Leads',     icon: 'fa-users-gear' },
  { path: '/admin/products',  label: 'Equipment Catalog', icon: 'fa-boxes-stacked' },
  { path: '/admin/blog',      label: 'Blog & Articles', icon: 'fa-newspaper' },
];

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="admin-shell">

    <!-- ── Mobile Backdrop Overlay ── -->
    @if (mobileMenuOpen()) {
      <div class="mobile-backdrop" (click)="toggleMobileMenu()"></div>
    }

    <!-- ── Admin Sidebar ── -->
    <aside class="admin-sidebar" [class.mobile-open]="mobileMenuOpen()">
      <div class="admin-sidebar-top">

        <!-- Logo & Header -->
        <div class="admin-brand-card">
          <div class="brand-logo-wrap">
            <img src="logo.png" alt="Thozhan Logo" class="brand-logo-img" />
          </div>
          <div class="brand-meta">
            <span class="brand-title">Thozhan</span>
            <span class="brand-sub">Enterprise Portal</span>
          </div>
        </div>

        <!-- Security Badge Strip -->
        <div class="admin-badge-strip">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Authorized Staff Session</span>
        </div>

        <!-- User Info Card -->
        <div class="admin-user-info">
          <div class="user-avatar">
            <i class="fa-solid fa-user-tie"></i>
          </div>
          <div class="user-details">
            <p class="user-name">{{ auth.username() || 'Administrator' }}</p>
            <p class="user-role">
              <span class="role-dot"></span> System Manager
            </p>
          </div>
        </div>

        <!-- Navigation Section -->
        <div class="nav-section-label">Core Operations</div>
        <nav class="admin-nav" aria-label="Admin Navigation">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="active"
               (click)="closeMobileMenu()"
               class="admin-nav-item">
              <div class="nav-icon-box">
                <i class="fa-solid {{ item.icon }}"></i>
              </div>
              <span class="nav-label">{{ item.label }}</span>
              <i class="fa-solid fa-chevron-right nav-arrow"></i>
            </a>
          }
        </nav>
      </div>

      <div class="admin-sidebar-bottom">
        <a routerLink="/" class="admin-nav-item secondary">
          <div class="nav-icon-box">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
          <span>Public Website</span>
        </a>
        <button class="admin-nav-item logout-btn" (click)="logout()">
          <div class="nav-icon-box">
            <i class="fa-solid fa-right-from-bracket"></i>
          </div>
          <span>End Session</span>
        </button>
      </div>
    </aside>

    <!-- ── Main Administrative Canvas ── -->
    <div class="admin-content">

      <!-- Admin Top Bar -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <button class="mobile-toggle-btn" (click)="toggleMobileMenu()" aria-label="Toggle navigation menu">
            <i class="fa-solid fa-bars"></i>
          </button>
          <div>
            <div class="topbar-title">Thozhan Command Center</div>
            <div class="topbar-sub">Tamil Nadu Micro-Irrigation Enterprise Management</div>
          </div>
        </div>

        <div class="topbar-right">
          <div class="sys-health-chip">
            <span class="pulse-indicator"></span>
            <span class="health-label">API Gateway Online</span>
          </div>

          <a href="http://localhost:8000/admin/" target="_blank" class="django-link-btn" title="Open Django Superuser Admin">
            <i class="fa-brands fa-python"></i>
            <span>Django DB</span>
          </a>
        </div>
      </header>

      <!-- Page Content Router Outlet -->
      <main class="admin-main">
        <router-outlet />
      </main>
    </div>
  </div>
  `,
  styles: [`
  :host {
    display: block;
    --side-w: 260px;
  }

  .admin-shell {
    display: flex;
    min-height: 100vh;
    background: #141618;
    color: #F1F5F9;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    position: relative;
  }

  /* ── Sidebar ── */
  .admin-sidebar {
    width: var(--side-w);
    background: #17191C;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
    z-index: 100;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .admin-sidebar-top {
    padding: 1.25rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    overflow-y: auto;
  }

  .admin-sidebar-bottom {
    padding: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    background: #151719;
  }

  /* Brand card */
  .admin-brand-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
    background: #1F2227;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
  }

  .brand-logo-wrap {
    width: 36px;
    height: 36px;
    background: #FFFFFF;
    border-radius: 8px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .brand-logo-img {
    max-height: 100%;
    object-fit: contain;
  }

  .brand-meta {
    display: flex;
    flex-direction: column;
  }

  .brand-title {
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    line-height: 1.2;
  }

  .brand-sub {
    font-size: 0.65rem;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }

  /* Badge strip */
  .admin-badge-strip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.25);
    color: #34D399;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.45rem 0.75rem;
    border-radius: 8px;
  }

  /* User Info */
  .admin-user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 0.875rem;
    background: #1B1E22;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
  }

  .user-avatar {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #059669, #064E3B);
    border: 1px solid rgba(52, 211, 153, 0.3);
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .user-name {
    font-size: 0.82rem;
    font-weight: 700;
    color: #FFFFFF;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .user-role {
    font-size: 0.68rem;
    color: #94A3B8;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }

  .role-dot {
    width: 6px;
    height: 6px;
    background: #10B981;
    border-radius: 50%;
  }

  /* Nav section label */
  .nav-section-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #64748B;
    padding: 0.25rem 0.5rem 0;
  }

  /* Navigation items */
  .admin-nav {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .admin-nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.75rem;
    border-radius: 9px;
    font-size: 0.82rem;
    font-weight: 600;
    color: #94A3B8;
    text-decoration: none;
    transition: all 0.18s ease;
    border: 1px solid transparent;
    background: transparent;
    width: 100%;
    cursor: pointer;
  }

  .nav-icon-box {
    width: 28px;
    height: 28px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #94A3B8;
    transition: all 0.18s ease;
    flex-shrink: 0;
  }

  .nav-arrow {
    margin-left: auto;
    font-size: 0.65rem;
    opacity: 0;
    transform: translateX(-4px);
    transition: all 0.18s ease;
    color: #64748B;
  }

  .admin-nav-item:hover {
    color: #FFFFFF;
    background: #20242A;
    border-color: rgba(255, 255, 255, 0.06);
  }

  .admin-nav-item:hover .nav-icon-box {
    background: rgba(255, 255, 255, 0.08);
    color: #FFFFFF;
  }

  .admin-nav-item:hover .nav-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  .admin-nav-item.active {
    background: #10B981;
    color: #FFFFFF;
    font-weight: 700;
    box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25);
  }

  .admin-nav-item.active .nav-icon-box {
    background: rgba(0, 0, 0, 0.2);
    color: #FFFFFF;
  }

  .admin-nav-item.active .nav-arrow {
    opacity: 1;
    transform: translateX(0);
    color: #FFFFFF;
  }

  .admin-nav-item.secondary:hover {
    color: #60A5FA;
    background: rgba(59, 130, 246, 0.08);
  }

  .admin-nav-item.logout-btn {
    color: #F87171;
  }

  .admin-nav-item.logout-btn:hover {
    background: rgba(239, 68, 68, 0.1);
    color: #FCA5A5;
  }

  /* ── Content Canvas ── */
  .admin-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: #1A1C1E;
    position: relative;
  }

  /* Refined Topbar */
  .admin-topbar {
    background: rgba(26, 28, 30, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.875rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .topbar-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .mobile-toggle-btn {
    display: none;
    width: 38px;
    height: 38px;
    border-radius: 8px;
    background: #22252A;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #E2E8F0;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .topbar-title {
    color: #FFFFFF;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: -0.01em;
  }

  .topbar-sub {
    color: #94A3B8;
    font-size: 0.72rem;
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .sys-health-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
    padding: 0.4rem 0.8rem;
    border-radius: 9999px;
    font-size: 0.72rem;
    color: #34D399;
    font-weight: 600;
  }

  .pulse-indicator {
    width: 7px;
    height: 7px;
    background: #10B981;
    border-radius: 50%;
    box-shadow: 0 0 8px #10B981;
    animation: healthPulse 2s infinite ease-in-out;
  }

  @keyframes healthPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.3); opacity: 0.7; }
  }

  .django-link-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    background: rgba(245, 158, 11, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.25);
    color: #FBBF24;
    font-size: 0.72rem;
    font-weight: 700;
    padding: 0.45rem 0.875rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.18s ease;
  }

  .django-link-btn:hover {
    background: rgba(245, 158, 11, 0.2);
    border-color: rgba(245, 158, 11, 0.4);
    transform: translateY(-1px);
  }

  /* Admin Main Container */
  .admin-main {
    flex: 1;
    overflow-y: auto;
    padding: 1.75rem 2rem;
    max-width: 1600px;
    width: 100%;
    margin: 0 auto;
  }

  /* ── Responsive & Mobile Drawer ── */
  .mobile-backdrop {
    display: none;
  }

  @media (max-width: 900px) {
    .mobile-toggle-btn {
      display: flex;
    }

    .admin-sidebar {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      transform: translateX(-100%);
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.7);
    }

    .admin-sidebar.mobile-open {
      transform: translateX(0);
    }

    .mobile-backdrop {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      z-index: 90;
    }

    .admin-topbar {
      padding: 0.75rem 1rem;
    }

    .admin-main {
      padding: 1.25rem 1rem;
    }

    .topbar-sub {
      display: none;
    }
  }
  `]
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
  router = inject(Router);
  navItems = ADMIN_NAV;
  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  logout() {
    this.auth.logout();
  }
}
