import { Component, signal, inject, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface NavItem {
  path: string;
  label: string;
  labelTa?: string;
}

const PUBLIC_NAV: NavItem[] = [
  { path: '/',         label: 'Home' },
  { path: '/about',    label: 'About Us' },
  { path: '/services', label: 'Solutions' },
  { path: '/pricing',  label: 'Pricing & Subsidy' },
  { path: '/blog',     label: 'Blog & Guides' },
  { path: '/contact',  label: 'Contact' },
];

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
  <div class="site-wrapper">

    <!-- ── TOP ANNOUNCEMENT STRIP ──────────────────────────── -->
    <div class="top-announcement">
      <div class="container-wide top-announcement-inner">
        <div class="announcement-left">
          <span class="badge-tag">
            <i class="fa-solid fa-certificate"></i> Government Authorized
          </span>
          <span class="announcement-text">
            PMKSY & TN Horticulture Micro-Irrigation Subsidy Assistance Partner
          </span>
        </div>
        <div class="announcement-right">
          <a href="tel:9489528432" class="phone-link">
            <i class="fa-solid fa-phone"></i>
            <span>Farmer Hotline: <strong>94895 28432</strong></span>
          </a>
          <span class="divider">|</span>
          <span class="location-text"><i class="fa-solid fa-location-dot"></i> Dindigul, Tamil Nadu</span>
        </div>
      </div>
    </div>

    <!-- ── STICKY MAIN HEADER / TOP NAVIGATION ─────────────── -->
    <header class="main-header" [class.scrolled]="isScrolled()">
      <div class="container-wide header-container">

        <!-- Company Logo -->
        <a routerLink="/" class="brand-logo" (click)="closeMobileMenu()">
          <div class="logo-wrapper">
            <img src="logo.png" alt="Thozhan Irrigation Logo" class="logo-image" />
          </div>
          <div class="brand-text">
            <span class="brand-name">தோழன் இரிகேஷன்</span>
            <span class="brand-tagline">Thozhan Irrigation · Smart Farm Solutions</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="desktop-nav" aria-label="Main Navigation">
          @for (item of navItems; track item.path) {
            <a [routerLink]="item.path"
               routerLinkActive="active"
               [routerLinkActiveOptions]="{ exact: item.path === '/' }"
               class="nav-link">
              {{ item.label }}
            </a>
          }
        </nav>

        <!-- Right Header Actions -->
        <div class="header-actions">
          <!-- WhatsApp Contact Button -->
          <a href="https://wa.me/919489528432?text=Hello%20Thozhan%20Irrigation,%20I%20would%20like%20to%20inquire%20about%20irrigation%20systems%20and%20subsidy."
             target="_blank"
             rel="noopener noreferrer"
             class="btn-nav-whatsapp"
             title="Chat with our agricultural engineer on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i>
            <span class="desktop-only">WhatsApp</span>
          </a>

          <!-- Primary Get Quote CTA -->
          <a routerLink="/contact" class="btn btn-amber btn-sm">
            <i class="fa-solid fa-calculator"></i>
            <span>Get a Quote</span>
          </a>

          <!-- Admin Portal Secondary Link -->
          <a [routerLink]="auth.isAuthenticated() ? '/admin/dashboard' : '/admin/login'"
             class="btn-admin-subtle"
             title="Administrative Portal Access">
            <i class="fa-solid fa-shield-halved"></i>
            <span class="desktop-only">Admin</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button class="hamburger-btn"
                  (click)="toggleMobileMenu()"
                  [attr.aria-expanded]="mobileMenuOpen()"
                  aria-label="Toggle navigation menu">
            <i class="fa-solid" [class.fa-bars]="!mobileMenuOpen()" [class.fa-xmark]="mobileMenuOpen()"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (mobileMenuOpen()) {
        <div class="mobile-drawer animate-fade">
          <nav class="mobile-nav" aria-label="Mobile Navigation">
            @for (item of navItems; track item.path) {
              <a [routerLink]="item.path"
                 routerLinkActive="active"
                 [routerLinkActiveOptions]="{ exact: item.path === '/' }"
                 class="mobile-nav-link"
                 (click)="closeMobileMenu()">
                <span>{{ item.label }}</span>
                <i class="fa-solid fa-chevron-right arrow-icon"></i>
              </a>
            }

            <div class="mobile-drawer-footer">
              <a routerLink="/contact" class="btn btn-amber btn-full mb-3" (click)="closeMobileMenu()">
                <i class="fa-solid fa-calculator"></i> Get a Free Quote
              </a>
              <a href="tel:9489528432" class="btn btn-primary btn-full mb-3">
                <i class="fa-solid fa-phone"></i> Call 94895 28432
              </a>
              <a [routerLink]="auth.isAuthenticated() ? '/admin/dashboard' : '/admin/login'"
                 class="mobile-admin-link"
                 (click)="closeMobileMenu()">
                <i class="fa-solid fa-shield-halved"></i> Staff Admin Portal
              </a>
            </div>
          </nav>
        </div>
      }
    </header>

    <!-- ── PAGE CONTENT OUTLET ─────────────────────────────── -->
    <main class="main-body" id="main-content">
      <router-outlet />
    </main>

    <!-- ── PROFESSIONAL ENTERPRISE FOOTER ──────────────────── -->
    <footer class="site-footer">
      <div class="container-wide footer-grid">

        <!-- Column 1: Brand & Purpose -->
        <div class="footer-col brand-col">
          <div class="footer-logo-wrap">
            <img src="logo.png" alt="Thozhan Irrigation" class="footer-logo" />
          </div>
          <p class="footer-desc">
            Government-authorized micro-irrigation systems, subsidy processing, professional farm engineering, and reliable after-sales support across Tamil Nadu since 2012.
          </p>
          <div class="footer-badge">
            <i class="fa-solid fa-certificate"></i>
            <span>TN Horticulture & PMKSY Registered</span>
          </div>
          <div class="gstin-tag">GSTIN: 33BSXPJ5723P1ZX</div>
        </div>

        <!-- Column 2: Quick Links -->
        <div class="footer-col">
          <h4 class="footer-title">Navigation</h4>
          <ul class="footer-list">
            <li><a routerLink="/">Home</a></li>
            <li><a routerLink="/about">About Us & Team</a></li>
            <li><a routerLink="/services">Irrigation Solutions</a></li>
            <li><a routerLink="/pricing">Pricing & Subsidy Plans</a></li>
            <li><a routerLink="/blog">Farmer Guides & Blog</a></li>
            <li><a routerLink="/contact">Contact & Site Visit</a></li>
          </ul>
        </div>

        <!-- Column 3: Solutions -->
        <div class="footer-col">
          <h4 class="footer-title">Solutions</h4>
          <ul class="footer-list">
            <li><a routerLink="/services">Drip Irrigation Kits</a></li>
            <li><a routerLink="/services">Micro Sprinkler Systems</a></li>
            <li><a routerLink="/services">High-Throw Rain Guns</a></li>
            <li><a routerLink="/services">Solar Agri Pumping</a></li>
            <li><a routerLink="/pricing">100% Subsidy Small Farmer</a></li>
            <li><a routerLink="/pricing">75% Subsidy Other Farmer</a></li>
          </ul>
        </div>

        <!-- Column 4: Contact & Office -->
        <div class="footer-col contact-col">
          <h4 class="footer-title">Head Office & Support</h4>
          <div class="contact-entry">
            <i class="fa-solid fa-location-dot"></i>
            <span>21-A, Vijaya Nagar, SSI ITI College Road, Seelapadi, Dindigul — 624 004, Tamil Nadu</span>
          </div>
          <div class="contact-entry">
            <i class="fa-solid fa-phone"></i>
            <a href="tel:9489528432">94895 28432</a> / <a href="tel:9443224855">94432 24855</a>
          </div>
          <div class="contact-entry">
            <i class="fa-brands fa-whatsapp"></i>
            <a href="https://wa.me/919489528432" target="_blank" rel="noopener noreferrer">+91 94895 28432</a>
          </div>
          <div class="contact-entry">
            <i class="fa-solid fa-envelope"></i>
            <a href="mailto:thozhanirrigation@gmail.com">thozhanirrigation&#64;gmail.com</a>
          </div>
          <div class="contact-entry">
            <i class="fa-regular fa-clock"></i>
            <span>Mon – Sat: 9:00 AM – 6:00 PM IST</span>
          </div>
        </div>
      </div>

      <!-- Footer Bottom Strip -->
      <div class="footer-bottom">
        <div class="container-wide footer-bottom-inner">
          <p class="copyright">
            © 2026 Thozhan Irrigation. All rights reserved.
          </p>
          <p class="subsidy-disclaimer">
            *Note: Government subsidies are subject to land verification (Patta/Chitta) and guidelines issued by the Tamil Nadu Horticulture Department & PMKSY scheme.
          </p>
          <div class="footer-meta-links">
            <a routerLink="/about">Privacy</a>
            <span>·</span>
            <a routerLink="/about">Terms</a>
            <span>·</span>
            <a [routerLink]="auth.isAuthenticated() ? '/admin/dashboard' : '/admin/login'">Admin</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- ── STICKY MOBILE ACTION BAR ────────────────────────── -->
    <div class="sticky-mobile-bar">
      <a href="tel:9489528432" class="mobile-action-btn phone">
        <i class="fa-solid fa-phone"></i>
        <span>Call</span>
      </a>
      <a href="https://wa.me/919489528432?text=Hello%20Thozhan%20Irrigation,%20I%20would%20like%20subsidy%20and%20quotation%20information."
         target="_blank"
         rel="noopener noreferrer"
         class="mobile-action-btn whatsapp">
        <i class="fa-brands fa-whatsapp"></i>
        <span>WhatsApp</span>
      </a>
      <a routerLink="/pricing" class="mobile-action-btn quote">
        <i class="fa-solid fa-calculator"></i>
        <span>Subsidy Calculator</span>
      </a>
    </div>

  </div>
  `,
  styles: [`
  .site-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--white);
    color: var(--text-primary);
  }

  /* ── Top Announcement Strip ── */
  .top-announcement {
    background-color: var(--forest-dark);
    color: var(--text-dark-sub);
    font-size: 0.8125rem;
    padding: 0.45rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .top-announcement-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .announcement-left, .announcement-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .badge-tag {
    background-color: rgba(39, 196, 106, 0.2);
    color: var(--brand-bright);
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.2rem 0.6rem;
    border-radius: var(--radius-full);
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }
  .phone-link {
    color: var(--text-dark);
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }
  .phone-link:hover { color: var(--brand-bright); }
  .phone-link strong { color: var(--cta-amber); }
  .divider { color: rgba(255, 255, 255, 0.2); }
  .location-text { font-size: 0.75rem; color: var(--text-dark-sub); }

  /* ── Main Sticky Header ── */
  .main-header {
    background-color: var(--white);
    border-bottom: 1.5px solid var(--border-light);
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: all 0.25s ease;
  }
  .main-header.scrolled {
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(16, 35, 27, 0.08);
  }
  .header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    gap: 1.5rem;
  }

  /* Logo */
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    text-decoration: none;
  }
  .logo-wrapper {
    background: #FFFFFF;
    padding: 4px 8px;
    border-radius: var(--radius-md);
    border: 1px solid var(--border-light);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-image {
    height: 48px;
    width: auto;
    object-fit: contain;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
  }
  .brand-name {
    font-size: 1.0625rem;
    font-weight: 800;
    color: var(--forest-deep);
    line-height: 1.2;
  }
  .brand-tagline {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-weight: 600;
  }

  /* Desktop Nav */
  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }
  .nav-link {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--text-primary);
    padding: 0.5rem 0.25rem;
    position: relative;
    transition: color 0.15s ease;
    text-decoration: none;
  }
  .nav-link:hover {
    color: var(--brand-main);
  }
  .nav-link.active {
    color: var(--brand-main);
    font-weight: 700;
  }
  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 2.5px;
    background-color: var(--brand-main);
    border-radius: 2px;
  }

  /* Right Action Items */
  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .btn-nav-whatsapp {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.875rem;
    border-radius: var(--radius-md);
    background-color: rgba(37, 211, 102, 0.12);
    color: #1A9E48;
    font-size: 0.875rem;
    font-weight: 700;
    border: 1px solid rgba(37, 211, 102, 0.3);
    transition: var(--transition-fast);
  }
  .btn-nav-whatsapp:hover {
    background-color: #25D366;
    color: var(--white);
  }
  .btn-admin-subtle {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.65rem;
    border-radius: var(--radius-md);
    background-color: #F0F4F2;
    color: var(--text-secondary);
    font-size: 0.8125rem;
    font-weight: 600;
    transition: var(--transition-fast);
  }
  .btn-admin-subtle:hover {
    background-color: var(--forest-deep);
    color: var(--white);
  }
  .hamburger-btn {
    display: none;
    font-size: 1.25rem;
    color: var(--text-primary);
    padding: 0.5rem;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border-light);
  }

  /* Mobile Drawer */
  .mobile-drawer {
    border-top: 1px solid var(--border-light);
    background-color: var(--white);
    padding: 1rem 1.5rem 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  }
  .mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .mobile-nav-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 0.5rem;
    font-size: 1.0625rem;
    font-weight: 600;
    color: var(--text-primary);
    border-bottom: 1px solid #F0F4F2;
    text-decoration: none;
  }
  .mobile-nav-link:hover, .mobile-nav-link.active {
    color: var(--brand-main);
  }
  .arrow-icon {
    font-size: 0.8125rem;
    color: var(--text-muted);
  }
  .mobile-drawer-footer {
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  .mobile-admin-link {
    text-align: center;
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin-top: 0.75rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
  }

  /* Main Body */
  .main-body {
    flex: 1;
  }

  /* ── Footer ── */
  .site-footer {
    background-color: var(--forest-dark);
    color: var(--text-dark);
    padding-top: 5rem;
    margin-top: auto;
  }
  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1.25fr 2fr;
    gap: 3rem;
    margin-bottom: 4rem;
  }
  .footer-logo-wrap {
    background: #FFFFFF;
    display: inline-block;
    padding: 6px 12px;
    border-radius: var(--radius-md);
    margin-bottom: 1.25rem;
  }
  .footer-logo {
    height: 48px;
    object-fit: contain;
  }
  .footer-desc {
    color: var(--text-dark-sub);
    font-size: 0.9375rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
    max-width: 380px;
  }
  .footer-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(39, 196, 106, 0.15);
    color: var(--brand-bright);
    font-size: 0.8125rem;
    font-weight: 700;
    padding: 0.35rem 0.875rem;
    border-radius: var(--radius-full);
    border: 1px solid rgba(39, 196, 106, 0.3);
    margin-bottom: 0.75rem;
  }
  .gstin-tag {
    font-size: 0.75rem;
    color: var(--text-dark-sub);
    font-family: monospace;
  }

  .footer-title {
    font-size: 1.0625rem;
    font-weight: 800;
    color: var(--white);
    margin-bottom: 1.25rem;
    letter-spacing: -0.01em;
  }
  .footer-list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .footer-list a {
    color: var(--text-dark-sub);
    font-size: 0.9375rem;
    transition: color 0.15s ease;
  }
  .footer-list a:hover {
    color: var(--brand-bright);
  }

  .contact-col {
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
  }
  .contact-entry {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.9375rem;
    color: var(--text-dark-sub);
    line-height: 1.5;
  }
  .contact-entry i {
    color: var(--brand-bright);
    font-size: 1rem;
    margin-top: 0.25rem;
    width: 18px;
    flex-shrink: 0;
  }
  .contact-entry a {
    color: var(--text-dark);
    font-weight: 600;
  }
  .contact-entry a:hover {
    color: var(--brand-bright);
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 1.75rem 0;
    background-color: #051A13;
  }
  .footer-bottom-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
    font-size: 0.8125rem;
    color: var(--text-dark-sub);
  }
  .subsidy-disclaimer {
    max-width: 580px;
    font-size: 0.75rem;
    line-height: 1.4;
    color: #7E9B8D;
  }
  .footer-meta-links {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
  .footer-meta-links a {
    color: var(--text-dark-sub);
  }
  .footer-meta-links a:hover {
    color: var(--white);
  }

  /* ── Sticky Mobile Bottom Action Bar ── */
  .sticky-mobile-bar {
    display: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--white);
    border-top: 1.5px solid var(--border-light);
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.08);
    z-index: 999;
    padding: 0.5rem 0.75rem;
  }
  .mobile-action-btn {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.5rem 0.25rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
  }
  .mobile-action-btn i { font-size: 1.1rem; }
  .mobile-action-btn.phone { color: var(--forest-deep); }
  .mobile-action-btn.whatsapp { color: #128C7E; }
  .mobile-action-btn.quote {
    background-color: var(--cta-amber);
    color: #10231B;
    border-radius: var(--radius-md);
  }

  /* Responsive Rules */
  @media (max-width: 1024px) {
    .desktop-nav { display: none; }
    .hamburger-btn { display: block; }
    .desktop-only { display: none; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; }
    .top-announcement { display: none; }
    .brand-name { font-size: 0.9375rem; }
    .brand-tagline { font-size: 0.7rem; }
  }

  @media (max-width: 768px) {
    .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
    .sticky-mobile-bar { display: flex; gap: 0.5rem; }
    .site-footer { padding-bottom: 5rem; /* space for mobile bar */ }
  }
  `]
})
export class LayoutComponent {
  auth = inject(AuthService);
  navItems = PUBLIC_NAV;
  mobileMenuOpen = signal(false);
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
