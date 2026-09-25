import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // ── Public pages with layout (sidebar + header) ──────────
  {
    path: '',
    loadComponent: () => import('./shared/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      { path: '',          loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),                title: 'Home — Thozhan Irrigation' },
      { path: 'about',     loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),            title: 'About Us — Thozhan Irrigation' },
      { path: 'services',  loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent),   title: 'Services & Equipment — Thozhan Irrigation' },
      { path: 'solutions', redirectTo: 'services', pathMatch: 'full' },
      { path: 'pricing',   loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent),      title: 'Pricing & Subsidy — Thozhan Irrigation' },
      { path: 'blog',      loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent),               title: 'Blog & Guides — Thozhan Irrigation' },
      { path: 'contact',   loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent),      title: 'Contact Us — Thozhan Irrigation' },
    ]
  },

  // ── Admin: Login (no guard) ───────────────────────────────
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent),
    title: 'Admin Login — Thozhan Irrigation'
  },

  // ── Admin: Protected pages ─────────────────────────────────
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),       title: 'Dashboard — Admin' },
      { path: 'leads',     loadComponent: () => import('./admin/leads/leads.component').then(m => m.LeadsComponent),                   title: 'Leads — Admin' },
      { path: 'products',  loadComponent: () => import('./admin/products/products.component').then(m => m.ProductsComponent),          title: 'Products — Admin' },
      { path: 'blog',      loadComponent: () => import('./admin/blog-manager/blog-manager.component').then(m => m.BlogManagerComponent), title: 'Blog — Admin' },
    ]
  },

  // ── Fallback ──────────────────────────────────────────────
  { path: '**', redirectTo: '' }
];
