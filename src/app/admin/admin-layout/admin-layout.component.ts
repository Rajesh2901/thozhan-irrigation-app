import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

const ADMIN_NAV = [
  { path: '/admin/dashboard', label: 'Dashboard',       icon: 'fa-gauge' },
  { path: '/admin/leads',     label: 'Quote Leads',     icon: 'fa-users' },
  { path: '/admin/products',  label: 'Products',        icon: 'fa-box-archive' },
  { path: '/admin/blog',      label: 'Blog Posts',      icon: 'fa-newspaper' },
];

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="admin-shell">

    <!-- ── Admin Sidebar ── -->
    <aside class="admin-sidebar">
      <div class="admin-sidebar-top">

        <!-- Logo -->
        <div class="admin-logo-box">
          <img src="logo.png" alt="Thozhan" style="height:44px;object-fit:contain;width:100%;" />
        </div>

        <!-- Admin Badge -->
        <div class="admin-badge-strip">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Admin Control Panel</span>
        </div>

        <!-- User Info -->
        <div class="admin-user-info">
          <div class="user-avatar">
            <i class="fa-solid fa-user-tie"></i>
          </div>
          <div>
            <p class="user-name">{{ auth.username() }}</p>
            <p class="user-role">Administrator</p>
          </div>
        </div>

        <!-- Navigation -->
        <nav aria-label="Admin navigation">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="active"
               class="admin-nav-item">
              <i class="fa-solid {{ item.icon }}"></i>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>
      </div>

      <div class="admin-sidebar-bottom">
        <a routerLink="/" class="admin-nav-item muted">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Back to Website</span>
        </a>
        <button class="admin-nav-item logout" (click)="logout()">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- ── Admin Content ── -->
    <div class="admin-content">

      <!-- Admin Top Bar -->
      <header class="admin-topbar">
        <div class="topbar-left">
          <div class="topbar-title">Thozhan Irrigation — Admin Panel</div>
          <span class="topbar-sub">Manage leads, products, and content</span>
        </div>
        <div class="topbar-right">
          <span class="online-status">
            <span class="online-dot"></span>
            System Online
          </span>
          <a href="http://localhost:8000/admin/" target="_blank" class="django-admin-btn">
            <i class="fa-brands fa-python"></i>
            Django Admin
          </a>
        </div>
      </header>

      <!-- Page content -->
      <main class="admin-main">
        <router-outlet />
      </main>
    </div>
  </div>
  `,
  styles: [`
  .admin-shell {
    display: flex;
    min-height: 100vh;
    background: #020f08;
    font-family: 'Poppins', sans-serif;
  }

  /* ── Admin Sidebar ── */
  .admin-sidebar {
    width: 240px;
    background: #03170e;
    border-right: 1px solid rgba(34,197,94,0.08);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: sticky;
    top: 0;
    height: 100vh;
    flex-shrink: 0;
  }

  .admin-sidebar-top { padding: 1rem; display: flex; flex-direction: column; gap: 1rem; flex: 1; overflow-y: auto; }
  .admin-sidebar-bottom { padding: 1rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 4px; }

  .admin-logo-box {
    background: rgba(255,255,255,0.95);
    border-radius: 12px;
    padding: 8px 12px;
    border: 1px solid rgba(251,191,36,0.2);
  }

  .admin-badge-strip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(245,158,11,0.08);
    border: 1px solid rgba(245,158,11,0.2);
    color: #fcd34d;
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.5rem 0.75rem;
    border-radius: 10px;
  }

  .admin-user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: rgba(34,197,94,0.05);
    border: 1px solid rgba(34,197,94,0.1);
    border-radius: 12px;
  }
  .user-avatar {
    width: 38px;
    height: 38px;
    background: linear-gradient(135deg, var(--brand-700), var(--brand-900));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 0.9rem;
    flex-shrink: 0;
  }
  .user-name { color: #fff; font-size: 0.8rem; font-weight: 700; }
  .user-role { color: var(--brand-400); font-size: 0.65rem; font-weight: 600; }

  .admin-nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.65rem 0.875rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #475569;
    text-decoration: none;
    transition: all 0.15s ease;
    margin-bottom: 2px;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
  .admin-nav-item:hover { color: #fff; background: rgba(34,197,94,0.1); }
  .admin-nav-item.active { background: linear-gradient(135deg, #15803d, #166534); color: #fff; }
  .admin-nav-item.active i { color: #fbbf24; }
  .admin-nav-item i { width: 16px; text-align: center; font-size: 0.875rem; }
  .admin-nav-item.muted:hover { background: rgba(255,255,255,0.05); }
  .admin-nav-item.logout { color: #f87171; }
  .admin-nav-item.logout:hover { background: rgba(239,68,68,0.1); }

  /* ── Admin Content ── */
  .admin-content { flex: 1; display: flex; flex-direction: column; min-width: 0; }

  .admin-topbar {
    background: rgba(3,23,14,0.98);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    padding: 0.875rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .topbar-title { color: #fff; font-size: 0.9rem; font-weight: 900; }
  .topbar-sub { color: var(--text-muted); font-size: 0.7rem; }
  .topbar-right { display: flex; align-items: center; gap: 1rem; }

  .online-status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    color: #4ade80;
    font-weight: 700;
  }
  .online-dot {
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse 2s ease infinite;
    box-shadow: 0 0 6px #4ade80;
  }

  .django-admin-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(251,191,36,0.1);
    border: 1px solid rgba(251,191,36,0.2);
    color: #fbbf24;
    font-size: 0.7rem;
    font-weight: 700;
    padding: 0.4rem 0.875rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .django-admin-btn:hover { background: rgba(251,191,36,0.2); }

  .admin-main { flex: 1; overflow-y: auto; padding: 1.75rem; }

  @media (max-width: 768px) {
    .admin-sidebar { display: none; }
    .admin-topbar { padding: 0.75rem 1rem; }
    .admin-main { padding: 1rem; }
  }
  `]
})
export class AdminLayoutComponent {
  auth   = inject(AuthService);
  router = inject(Router);
  navItems = ADMIN_NAV;

  logout() {
    this.auth.logout();
  }
}
