import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  path: string;
  label: string;
  icon: string;
  section: 'main' | 'tools';
}

const NAV_ITEMS: NavItem[] = [
  { path: '/',         label: 'Home',              icon: 'fa-house',           section: 'main' },
  { path: '/about',    label: 'About Us',           icon: 'fa-circle-info',    section: 'main' },
  { path: '/services', label: 'Services',           icon: 'fa-border-all',     section: 'main' },
  { path: '/pricing',  label: 'Pricing & Subsidy',  icon: 'fa-tags',           section: 'main' },
  { path: '/blog',     label: 'Blog & Guides',      icon: 'fa-newspaper',      section: 'main' },
  { path: '/contact',  label: 'Contact & HQ',       icon: 'fa-location-dot',   section: 'main' },
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="app-shell">

    <!-- ── SIDEBAR ──────────────────────────────────────────── -->
    <aside class="sidebar" [class.open]="sidebarOpen()">
      <div class="sidebar-inner">

        <!-- Brand Logo -->
        <a routerLink="/" class="logo-wrap" (click)="closeSidebar()">
          <div class="logo-box">
            <img src="logo.png" alt="Thozhan Irrigation" class="logo-img" />
          </div>
        </a>

        <!-- Navigation -->
        <nav class="sidebar-nav" aria-label="Main navigation">
          <span class="nav-section-label">Website</span>
          @for (item of mainNav; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: item.path === '/' }"
               class="nav-item"
               (click)="closeSidebar()">
              <i class="fa-solid {{ item.icon }} nav-icon"></i>
              <span>{{ item.label }}</span>
            </a>
          }
        </nav>

        <!-- Admin Quick Link -->
        <nav aria-label="Admin navigation" class="sidebar-nav mt-4">
          <span class="nav-section-label">Admin</span>
          @if (auth.isAuthenticated()) {
            <a routerLink="/admin/dashboard" routerLinkActive="active" class="nav-item gold">
              <i class="fa-solid fa-gauge nav-icon"></i>
              <span>Admin Dashboard</span>
            </a>
          } @else {
            <a routerLink="/admin/login" class="nav-item">
              <i class="fa-solid fa-user-shield nav-icon"></i>
              <span>Admin Portal</span>
            </a>
          }
        </nav>
      </div>

      <!-- Sidebar Bottom -->
      <div class="sidebar-bottom">
        <a href="tel:9489528432" class="hotline-btn">
          <i class="fa-solid fa-phone animate-pulse"></i>
          <span>94895 28432</span>
        </a>
        <a href="https://wa.me/919489528432" target="_blank" rel="noopener noreferrer" class="whatsapp-btn">
          <i class="fa-brands fa-whatsapp"></i>
          <span>WhatsApp Us</span>
        </a>
      </div>
    </aside>

    <!-- Sidebar backdrop (mobile) -->
    @if (sidebarOpen()) {
      <div class="sidebar-backdrop" (click)="closeSidebar()" aria-hidden="true"></div>
    }

    <!-- ── MAIN CONTENT ──────────────────────────────────────── -->
    <div class="main-content">

      <!-- Top Header -->
      <header class="top-header">
        <div class="header-left">
          <button class="hamburger" (click)="toggleSidebar()" [attr.aria-expanded]="sidebarOpen()" aria-label="Toggle menu">
            <i class="fa-solid" [class.fa-bars]="!sidebarOpen()" [class.fa-xmark]="sidebarOpen()"></i>
          </button>
          <img src="logo.png" alt="Thozhan" class="header-logo-mobile" />
          <div class="header-title">
            <span class="header-brand">Thozhan Irrigation — Smart Farm Portal</span>
            <span class="header-sub">விவசாயக் கட்டுப்பாட்டு மையம் · Dindigul, TN</span>
          </div>
        </div>

        <div class="header-right">
          <span class="govt-badge">
            <i class="fa-solid fa-certificate"></i>
            TN Govt Authorized
          </span>
          @if (auth.isAuthenticated()) {
            <div class="admin-user-chip">
              <i class="fa-solid fa-user-shield"></i>
              <span>{{ auth.username() }}</span>
            </div>
          }
          <a routerLink="/contact" class="header-cta">
            <i class="fa-solid fa-paper-plane"></i>
            Get Quote
          </a>
        </div>
      </header>

      <!-- Page content -->
      <main class="page-main" id="main-content">
        <router-outlet />
      </main>

      <!-- Footer -->
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <img src="logo.png" alt="Thozhan Irrigation" style="height:48px;background:#fff;border-radius:8px;padding:4px;" />
            <p>Premium irrigation solutions for Tamil Nadu farmers since 2012.</p>
          </div>
          <div class="footer-links">
            <h4>Quick Links</h4>
            <a routerLink="/">Home</a>
            <a routerLink="/services">Services</a>
            <a routerLink="/pricing">Pricing</a>
            <a routerLink="/blog">Blog</a>
            <a routerLink="/contact">Contact</a>
          </div>
          <div class="footer-contact">
            <h4>Contact</h4>
            <p><i class="fa-solid fa-phone"></i> 94895 28432</p>
            <p><i class="fa-brands fa-whatsapp"></i> +91 94895 28432</p>
            <p><i class="fa-solid fa-envelope"></i> thozhanirrigation&#64;gmail.com</p>
            <p><i class="fa-solid fa-location-dot"></i> 21-A Vijaya Nagar, Seelapadi, Dindigul — 624 004</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 Thozhan Irrigation. All rights reserved.</span>
          <span>GSTIN: 33BSXPJ5723P1ZX</span>
        </div>
      </footer>
    </div>
  </div>
  `,
  styles: [`
  .app-shell { display: flex; min-height: 100vh; background: var(--bg-primary); }

  /* ── Sidebar ── */
  .sidebar {
    width: 248px;
    background: var(--bg-secondary);
    border-right: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    overflow: hidden;
    flex-shrink: 0;
    z-index: 100;
    transition: transform 0.3s ease;
  }

  .sidebar-inner {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .logo-wrap { display: block; }
  .logo-box {
    background: rgba(255,255,255,0.95);
    border-radius: 14px;
    padding: 10px 12px;
    border: 1px solid rgba(251,191,36,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  }
  .logo-box:hover { transform: scale(1.02); }
  .logo-img { width: 100%; height: 56px; object-fit: contain; }

  .sidebar-nav { display: flex; flex-direction: column; gap: 2px; }
  .nav-section-label {
    font-size: 0.6rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #3d6b4e;
    padding: 0 0.75rem;
    margin-bottom: 4px;
    display: block;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.625rem 0.875rem;
    border-radius: 10px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    transition: all 0.15s ease;
    text-decoration: none;
  }
  .nav-item:hover { color: #fff; background: rgba(34,197,94,0.1); }
  .nav-item.active { background: linear-gradient(135deg, #15803d, #166534); color: #fff; box-shadow: 0 4px 12px rgba(21,128,61,0.3); }
  .nav-item.active .nav-icon { color: #fbbf24; }
  .nav-item.gold.active, .nav-item.gold:hover { background: linear-gradient(135deg, #92400e, #78350f); color: #fbbf24; }
  .nav-icon { width: 16px; text-align: center; font-size: 0.875rem; color: #475569; transition: color 0.15s ease; }
  .nav-item:hover .nav-icon { color: var(--brand-400); }
  .mt-4 { margin-top: 1rem; }

  .sidebar-bottom {
    padding: 1rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .hotline-btn, .whatsapp-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.65rem;
    border-radius: 10px;
    font-size: 0.75rem;
    font-weight: 700;
    transition: all 0.15s ease;
    text-decoration: none;
  }
  .hotline-btn { background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2); color: #4ade80; }
  .hotline-btn:hover { background: rgba(34,197,94,0.2); }
  .whatsapp-btn { background: rgba(22,163,74,0.9); color: #fff; }
  .whatsapp-btn:hover { background: #15803d; }

  /* ── Main ── */
  .main-content { flex: 1; display: flex; flex-direction: column; min-width: 0; overflow: hidden; }

  .top-header {
    background: rgba(3,23,14,0.96);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 50;
    gap: 1rem;
  }

  .header-left { display: flex; align-items: center; gap: 0.75rem; }
  .hamburger {
    display: none;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    color: #94a3b8;
    padding: 0.5rem;
    border-radius: 8px;
    transition: all 0.15s ease;
    font-size: 1rem;
  }
  .hamburger:hover { color: #fff; background: rgba(255,255,255,0.1); }
  .header-logo-mobile { height: 32px; background: #fff; border-radius: 6px; padding: 3px; display: none; }
  .header-title { display: flex; flex-direction: column; }
  .header-brand { font-size: 0.8rem; font-weight: 900; color: #fff; }
  .header-sub { font-size: 0.65rem; color: var(--brand-400); font-weight: 700; }

  .header-right { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
  .govt-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    background: rgba(251,191,36,0.08);
    border: 1px solid rgba(251,191,36,0.2);
    color: var(--gold);
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.3rem 0.75rem;
    border-radius: 999px;
  }
  .admin-user-chip {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(245,158,11,0.1);
    border: 1px solid rgba(245,158,11,0.25);
    color: #fcd34d;
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    font-size: 0.7rem;
    font-weight: 700;
  }
  .header-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--brand-700);
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.45rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .header-cta:hover { background: var(--brand-600); transform: translateY(-1px); }

  .page-main { flex: 1; overflow-y: auto; }

  /* ── Footer ── */
  .site-footer { background: var(--bg-secondary); border-top: 1px solid rgba(255,255,255,0.06); padding: 3rem 2rem 1.5rem; }
  .footer-inner { display: grid; grid-template-columns: 2fr 1fr 2fr; gap: 2rem; max-width: 1200px; margin: 0 auto 2rem; }
  .footer-brand p { color: var(--text-muted); font-size: 0.8rem; margin-top: 0.75rem; }
  .footer-links, .footer-contact { display: flex; flex-direction: column; gap: 0.5rem; }
  .footer-links h4, .footer-contact h4 { color: #fff; font-size: 0.8rem; font-weight: 900; margin-bottom: 0.25rem; }
  .footer-links a { color: var(--text-muted); font-size: 0.8rem; transition: color 0.15s; text-decoration: none; }
  .footer-links a:hover { color: var(--brand-400); }
  .footer-contact p { color: var(--text-muted); font-size: 0.8rem; display: flex; align-items: center; gap: 0.5rem; }
  .footer-contact i { color: var(--brand-400); width: 14px; }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    padding-top: 1.25rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    font-size: 0.75rem;
    color: #3d6b4e;
  }

  /* ── Mobile ── */
  .sidebar-backdrop {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.6);
    z-index: 90;
    backdrop-filter: blur(2px);
  }

  @media (max-width: 1024px) {
    .sidebar { position: fixed; left: 0; top: 0; height: 100vh; transform: translateX(-100%); z-index: 100; }
    .sidebar.open { transform: translateX(0); }
    .hamburger { display: flex; align-items: center; justify-content: center; }
    .header-logo-mobile { display: block; }
    .header-title .header-brand { display: none; }
    .header-title .header-sub { display: none; }
    .govt-badge { display: none; }
    .footer-inner { grid-template-columns: 1fr; }
  }
  `]
})
export class LayoutComponent {
  auth = inject(AuthService);
  sidebarOpen = signal(false);

  mainNav = NAV_ITEMS.filter(n => n.section === 'main');

  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  closeSidebar()  { this.sidebarOpen.set(false); }
}
