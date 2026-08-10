import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { QuoteLead, DashboardStats } from '../../core/models/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="dash-content">

    <!-- Welcome Strip -->
    <div class="welcome-strip animate-fade">
      <div>
        <h1 class="welcome-title">
          Good day, <span class="text-brand">{{ auth.username() }}</span> 👋
        </h1>
        <p class="welcome-sub">Here's your Thozhan Irrigation command center — all leads and data at a glance.</p>
      </div>
      <div class="welcome-actions">
        <a href="http://localhost:8000/admin/" target="_blank" class="btn btn-secondary btn-sm">
          <i class="fa-brands fa-python"></i> Django Admin
        </a>
        <a routerLink="/admin/leads" class="btn btn-primary btn-sm">
          <i class="fa-solid fa-users"></i> View All Leads
        </a>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid animate-fade">
      <div class="kpi-card" style="--accent:#22c55e">
        <div class="kpi-icon-wrap"><i class="fa-solid fa-users-line"></i></div>
        <div class="kpi-data">
          <div class="kpi-value">{{ stats()?.total_farmers ?? 850 }}</div>
          <div class="kpi-label">Farmers Served</div>
          <div class="kpi-delta"><i class="fa-solid fa-arrow-trend-up"></i> +12% this quarter</div>
        </div>
      </div>
      <div class="kpi-card" style="--accent:#3b82f6">
        <div class="kpi-icon-wrap" style="color:#3b82f6"><i class="fa-solid fa-industry"></i></div>
        <div class="kpi-data">
          <div class="kpi-value">{{ stats()?.total_installations ?? 1200 }}+</div>
          <div class="kpi-label">Installations Done</div>
          <div class="kpi-delta"><i class="fa-solid fa-arrow-trend-up"></i> +8% this month</div>
        </div>
      </div>
      <div class="kpi-card" style="--accent:#f59e0b">
        <div class="kpi-icon-wrap" style="color:#f59e0b"><i class="fa-solid fa-map-location-dot"></i></div>
        <div class="kpi-data">
          <div class="kpi-value">{{ stats()?.districts_covered ?? 18 }}</div>
          <div class="kpi-label">Districts Covered</div>
          <div class="kpi-delta">All of Tamil Nadu</div>
        </div>
      </div>
      <div class="kpi-card" style="--accent:#8b5cf6">
        <div class="kpi-icon-wrap" style="color:#8b5cf6"><i class="fa-solid fa-calendar-check"></i></div>
        <div class="kpi-data">
          <div class="kpi-value">{{ stats()?.years_experience ?? 12 }} Yrs</div>
          <div class="kpi-label">Experience</div>
          <div class="kpi-delta">Since 2012</div>
        </div>
      </div>
    </div>

    <!-- Lead Status Summary + Recent Leads -->
    <div class="dash-two-col">

      <!-- Lead Status Breakdown -->
      <div class="glass-card p-6">
        <h2 class="section-title"><i class="fa-solid fa-chart-pie"></i> Lead Status Breakdown</h2>
        <div class="status-breakdown">
          @for (item of statusBreakdown; track item.label) {
            <div class="status-row">
              <div class="status-left">
                <span class="status-dot" [style.background]="item.color"></span>
                <span class="status-name">{{ item.label }}</span>
              </div>
              <div class="status-right">
                <div class="status-bar-wrap">
                  <div class="status-bar" [style.width.%]="getBarWidth(item.count)" [style.background]="item.color"></div>
                </div>
                <span class="status-count">{{ item.count }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="glass-card p-6">
        <h2 class="section-title"><i class="fa-solid fa-bolt"></i> Quick Actions</h2>
        <div class="quick-actions">
          @for (action of quickActions; track action.label) {
            <a [routerLink]="action.route" class="quick-action-btn">
              <div class="qa-icon" [style.background]="action.bg">
                <i class="fa-solid {{ action.icon }}"></i>
              </div>
              <div>
                <div class="qa-label">{{ action.label }}</div>
                <div class="qa-desc">{{ action.desc }}</div>
              </div>
              <i class="fa-solid fa-chevron-right qa-arrow"></i>
            </a>
          }
        </div>
      </div>
    </div>

    <!-- Recent Leads Table -->
    <div class="glass-card animate-fade" style="overflow:hidden;">
      <div class="table-header">
        <h2 class="section-title" style="margin:0"><i class="fa-solid fa-clock-rotate-left"></i> Recent Leads</h2>
        <a routerLink="/admin/leads" class="btn btn-secondary btn-sm">View All</a>
      </div>
      @if (loading()) {
        <div class="loading-center"><div class="spinner"></div><p>Loading leads...</p></div>
      } @else {
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Farmer</th><th>District</th><th>Acres</th>
                <th>Cost</th><th>Subsidy%</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              @for (lead of recentLeads(); track lead.id) {
                <tr>
                  <td>
                    <div class="lead-name">{{ lead.farmer_name }}</div>
                    <div class="lead-phone">{{ lead.phone_number }}</div>
                  </td>
                  <td>{{ lead.district }}</td>
                  <td>{{ lead.land_size_acres }}</td>
                  <td>₹{{ formatNum(lead.estimated_project_cost) }}</td>
                  <td><span class="badge" [class]="getSubsidyBadge(lead.subsidy_percent)">{{ lead.subsidy_percent }}%</span></td>
                  <td><span class="badge" [class]="getStatusBadge(lead.status)">{{ lead.status }}</span></td>
                  <td class="text-muted text-xs">{{ formatDate(lead.created_at) }}</td>
                </tr>
              }
              @if (recentLeads().length === 0) {
                <tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--text-muted)">
                  No leads yet — leads appear here when farmers submit the subsidy calculator form.
                </td></tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  </div>
  `,
  styles: [`
  .dash-content { display: flex; flex-direction: column; gap: 1.5rem; }

  .welcome-strip {
    background: linear-gradient(135deg, rgba(21,128,61,0.15), rgba(22,101,52,0.08));
    border: 1px solid rgba(34,197,94,0.15);
    border-radius: 20px;
    padding: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .welcome-title { font-size: 1.35rem; font-weight: 900; color: #fff; margin-bottom: 0.25rem; }
  .welcome-sub { color: var(--text-muted); font-size: 0.8125rem; }
  .welcome-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }

  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; }
  .kpi-card {
    background: rgba(6,46,30,0.6);
    border: 1px solid rgba(255,255,255,0.07);
    border-left: 3px solid var(--accent, #22c55e);
    border-radius: 16px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .kpi-icon-wrap {
    width: 48px;
    height: 48px;
    background: rgba(34,197,94,0.1);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--accent, #22c55e);
    flex-shrink: 0;
  }
  .kpi-value { font-size: 1.5rem; font-weight: 900; color: #fff; line-height: 1; }
  .kpi-label { font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem; font-weight: 600; }
  .kpi-delta { font-size: 0.65rem; color: var(--accent, #22c55e); margin-top: 0.25rem; }

  .dash-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 900;
    color: #fff;
    margin-bottom: 1.25rem;
  }
  .section-title i { color: var(--brand-400); }

  .status-breakdown { display: flex; flex-direction: column; gap: 0.875rem; }
  .status-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
  .status-left { display: flex; align-items: center; gap: 0.5rem; min-width: 90px; }
  .status-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .status-name { font-size: 0.8rem; color: var(--text-muted); }
  .status-right { display: flex; align-items: center; gap: 0.75rem; flex: 1; }
  .status-bar-wrap { flex: 1; background: rgba(255,255,255,0.05); height: 6px; border-radius: 3px; overflow: hidden; }
  .status-bar { height: 100%; border-radius: 3px; transition: width 0.5s ease; min-width: 4px; }
  .status-count { font-size: 0.8rem; font-weight: 700; color: #fff; min-width: 24px; text-align: right; }

  .quick-actions { display: flex; flex-direction: column; gap: 0.5rem; }
  .quick-action-btn {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.875rem;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
    text-decoration: none;
    transition: all 0.15s ease;
    cursor: pointer;
  }
  .quick-action-btn:hover { background: rgba(34,197,94,0.07); border-color: rgba(34,197,94,0.15); }
  .qa-icon { width: 36px; height: 36px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.9rem; flex-shrink: 0; }
  .qa-label { font-size: 0.8rem; font-weight: 700; color: #fff; }
  .qa-desc { font-size: 0.7rem; color: var(--text-muted); }
  .qa-arrow { color: #3d6b4e; margin-left: auto; font-size: 0.75rem; }

  .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .lead-name { font-size: 0.8rem; font-weight: 700; color: #fff; }
  .lead-phone { font-size: 0.7rem; color: var(--text-muted); }

  @media (max-width: 1200px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 768px)  { .stats-grid { grid-template-columns: 1fr; } .dash-two-col { grid-template-columns: 1fr; } }
  `]
})
export class DashboardComponent implements OnInit {
  auth    = inject(AuthService);
  api     = inject(ApiService);
  loading = signal(true);
  stats   = signal<DashboardStats | null>(null);
  recentLeads = signal<QuoteLead[]>([]);

  statusBreakdown = [
    { label: 'Pending',   count: 0, color: '#f59e0b' },
    { label: 'Approved',  count: 0, color: '#3b82f6' },
    { label: 'Completed', count: 0, color: '#22c55e' },
    { label: 'Rejected',  count: 0, color: '#ef4444' },
  ];

  quickActions = [
    { label: 'Manage Leads',    desc: 'View & update farmer quote requests', icon: 'fa-users',        route: '/admin/leads',    bg: 'rgba(34,197,94,0.2)' },
    { label: 'Edit Products',   desc: 'Update equipment catalog & prices',   icon: 'fa-box-archive',  route: '/admin/products', bg: 'rgba(59,130,246,0.2)' },
    { label: 'Blog Posts',      desc: 'Create & publish farm guides',        icon: 'fa-newspaper',    route: '/admin/blog',     bg: 'rgba(251,191,36,0.2)' },
    { label: 'View Website',    desc: 'Open public-facing website',          icon: 'fa-globe',        route: '/',               bg: 'rgba(139,92,246,0.2)' },
  ];

  ngOnInit() {
    this.api.getDashboardStats().subscribe(s => this.stats.set(s));
    this.api.getQuoteLeads().subscribe(leads => {
      this.recentLeads.set(leads.slice(0, 8));
      this.loading.set(false);
      // Update breakdown
      this.statusBreakdown[0].count = leads.filter(l => l.status === 'PENDING').length;
      this.statusBreakdown[1].count = leads.filter(l => l.status === 'APPROVED').length;
      this.statusBreakdown[2].count = leads.filter(l => l.status === 'COMPLETED').length;
      this.statusBreakdown[3].count = leads.filter(l => l.status === 'REJECTED').length;
    });
  }

  getBarWidth(count: number): number {
    const total = this.recentLeads().length || 1;
    return Math.min(100, (count / total) * 100);
  }

  formatNum(val: string | number): string {
    return Number(val).toLocaleString('en-IN');
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
  }

  getStatusBadge(status: string): string {
    const map: Record<string, string> = {
      PENDING: 'badge badge-amber', APPROVED: 'badge badge-blue',
      COMPLETED: 'badge badge-green', REJECTED: 'badge badge-red'
    };
    return map[status] ?? 'badge';
  }

  getSubsidyBadge(pct: number): string {
    return pct === 100 ? 'badge badge-green' : pct >= 75 ? 'badge badge-blue' : 'badge badge-amber';
  }
}
