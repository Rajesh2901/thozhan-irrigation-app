import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { QuoteLead } from '../../core/models/interfaces';

const STATUSES = ['ALL', 'PENDING', 'APPROVED', 'COMPLETED', 'REJECTED'];
const MOCK_LEADS: QuoteLead[] = [
  { id: 1, farmer_name: 'Murugesan Krishnamurthy', phone_number: '9876543210', district: 'Dindigul', product: 1, product_title: 'Drip Irrigation Kit', land_size_acres: 3, estimated_project_cost: '73500', projected_subsidy_amount: '73500', farmer_contribution: '0', subsidy_percent: 100, status: 'APPROVED', created_at: '2025-07-01T09:00:00Z' },
  { id: 2, farmer_name: 'Selvam Thamizharasan', phone_number: '8765432109', district: 'Karur', product: 3, product_title: 'Rain Gun System', land_size_acres: 8, estimated_project_cost: '256000', projected_subsidy_amount: '192000', farmer_contribution: '64000', subsidy_percent: 75, status: 'PENDING', created_at: '2025-07-10T12:00:00Z' },
  { id: 3, farmer_name: 'Lakshmi Sundaram', phone_number: '9654321098', district: 'Madurai', product: 1, product_title: 'Drip Irrigation Kit', land_size_acres: 1.5, estimated_project_cost: '36750', projected_subsidy_amount: '36750', farmer_contribution: '0', subsidy_percent: 100, status: 'COMPLETED', created_at: '2025-06-20T11:00:00Z' },
  { id: 4, farmer_name: 'Rajan Periyasamy', phone_number: '9543218765', district: 'Salem', product: 2, product_title: 'Sprinkler System', land_size_acres: 5, estimated_project_cost: '91000', projected_subsidy_amount: '91000', farmer_contribution: '0', subsidy_percent: 100, status: 'PENDING', created_at: '2025-07-15T08:00:00Z' },
];

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="leads-page">

    <!-- Header -->
    <div class="leads-header animate-fade">
      <div>
        <span class="page-label">Lead Management</span>
        <h1 class="page-title">Farmer Quote Requests</h1>
        <p class="page-sub">All leads generated from the website subsidy calculator</p>
      </div>
      <div class="header-stats">
        <div class="mini-stat">
          <span class="mini-num">{{ leads().length }}</span>
          <span class="mini-label">Total</span>
        </div>
        <div class="mini-stat pending">
          <span class="mini-num">{{ pendingCount() }}</span>
          <span class="mini-label">Pending</span>
        </div>
        <div class="mini-stat success">
          <span class="mini-num">₹{{ totalSubsidy() }}</span>
          <span class="mini-label">Subsidy Assisted</span>
        </div>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="glass-card-sm leads-toolbar">
      <div class="search-wrap">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" placeholder="Search farmer, district, phone..."
          [(ngModel)]="searchQuery" class="search-input" />
      </div>
      <div class="filter-tabs">
        @for (s of statuses; track s) {
          <button class="filter-tab" [class.active]="statusFilter() === s"
            (click)="statusFilter.set(s)">
            {{ s }}
          </button>
        }
      </div>
    </div>

    <!-- Table -->
    <div class="glass-card leads-table-card">
      @if (loading()) {
        <div class="loading-center"><div class="spinner"></div><p>Fetching leads...</p></div>
      } @else {
        <div class="data-table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>#</th><th>Farmer</th><th>District</th>
                <th>System</th><th>Acres</th>
                <th>Project Cost</th><th>Subsidy%</th>
                <th>Contribution</th><th>Status</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              @for (lead of filteredLeads(); track lead.id) {
                <tr class="lead-row">
                  <td class="text-muted text-xs">#{{ lead.id }}</td>
                  <td>
                    <div class="lead-name-cell">
                      <div class="lead-avatar">{{ initials(lead.farmer_name) }}</div>
                      <div>
                        <div class="lead-name">{{ lead.farmer_name }}</div>
                        <a [href]="'tel:' + lead.phone_number" class="lead-phone">
                          <i class="fa-solid fa-phone"></i> {{ lead.phone_number }}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="text-sm">{{ lead.district }}</td>
                  <td class="text-xs text-muted">{{ lead.product_title }}</td>
                  <td class="text-sm">{{ lead.land_size_acres }}</td>
                  <td class="text-sm">₹{{ formatNum(lead.estimated_project_cost) }}</td>
                  <td>
                    <span class="badge" [class]="getSubsidyClass(lead.subsidy_percent)">
                      {{ lead.subsidy_percent }}%
                    </span>
                  </td>
                  <td class="text-sm" [class.text-success]="Number(lead.farmer_contribution) === 0" [class.text-warning]="Number(lead.farmer_contribution) > 0">
                    ₹{{ formatNum(lead.farmer_contribution) }}
                  </td>
                  <td>
                    <span class="badge" [class]="getStatusClass(lead.status)">
                      {{ lead.status }}
                    </span>
                  </td>
                  <td class="text-xs text-muted">{{ formatDate(lead.created_at) }}</td>
                </tr>
              }
              @if (filteredLeads().length === 0) {
                <tr>
                  <td colspan="10" class="empty-state">
                    <i class="fa-solid fa-inbox text-2xl text-muted"></i>
                    <p>No leads match your filters</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        <div class="table-footer">
          Showing {{ filteredLeads().length }} of {{ leads().length }} leads ·
          Total subsidy assisted: <strong class="text-success">₹{{ totalSubsidy() }}</strong>
        </div>
      }
    </div>
  </div>
  `,
  styles: [`
  .leads-page { display: flex; flex-direction: column; gap: 1.25rem; }

  .leads-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .page-label { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.12em; color: var(--brand-400); display: block; margin-bottom: 0.25rem; }
  .page-title { font-size: 1.5rem; font-weight: 900; color: #fff; }
  .page-sub { color: var(--text-muted); font-size: 0.8rem; margin-top: 0.25rem; }
  .header-stats { display: flex; gap: 1rem; }
  .mini-stat { text-align: center; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; padding: 0.75rem 1.25rem; }
  .mini-stat.pending .mini-num { color: #fcd34d; }
  .mini-stat.success .mini-num { color: #4ade80; }
  .mini-num { display: block; font-size: 1.1rem; font-weight: 900; color: #fff; }
  .mini-label { font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }

  .leads-toolbar { display: flex; gap: 1rem; align-items: center; flex-wrap: wrap; padding: 0.875rem 1rem; }
  .search-wrap { position: relative; flex: 1; min-width: 200px; }
  .search-icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); color: #3d6b4e; font-size: 0.8rem; }
  .search-input {
    width: 100%;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 0.5rem 0.75rem 0.5rem 2.25rem;
    color: #fff;
    font-size: 0.8125rem;
    font-family: 'Poppins', sans-serif;
    transition: border-color 0.15s;
  }
  .search-input:focus { outline: none; border-color: var(--brand-500); }
  .search-input::placeholder { color: #3d6b4e; }

  .filter-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
  .filter-tab {
    padding: 0.4rem 0.875rem;
    border-radius: 8px;
    font-size: 0.7rem;
    font-weight: 700;
    color: #475569;
    border: 1px solid rgba(255,255,255,0.06);
    background: transparent;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .filter-tab:hover { color: #fff; background: rgba(255,255,255,0.05); }
  .filter-tab.active { background: var(--brand-700); color: #fff; border-color: var(--brand-600); }

  .leads-table-card { overflow: hidden; }
  .lead-name-cell { display: flex; align-items: center; gap: 0.625rem; }
  .lead-avatar {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, var(--brand-700), var(--brand-900));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 0.65rem; font-weight: 900;
    flex-shrink: 0;
  }
  .lead-name { font-size: 0.8rem; font-weight: 700; color: #fff; }
  .lead-phone { font-size: 0.7rem; color: var(--brand-400); text-decoration: none; display: flex; align-items: center; gap: 0.3rem; }
  .lead-row:hover td { background: rgba(34,197,94,0.03); }
  .lead-row { cursor: default; }

  .text-success { color: #4ade80; font-weight: 700; }
  .text-warning { color: #fcd34d; font-weight: 700; }

  .empty-state { text-align: center; padding: 3rem; color: var(--text-muted); }
  .table-footer { padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.75rem; color: var(--text-muted); }
  `]
})
export class LeadsComponent implements OnInit {
  api     = inject(ApiService);
  loading = signal(true);
  leads   = signal<QuoteLead[]>([]);
  statusFilter = signal<string>('ALL');
  searchQuery = '';
  statuses = STATUSES;
  Number = Number;

  filteredLeads = computed(() => {
    return this.leads().filter(l => {
      const matchStatus = this.statusFilter() === 'ALL' || l.status === this.statusFilter();
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q || l.farmer_name.toLowerCase().includes(q)
        || l.district.toLowerCase().includes(q) || l.phone_number.includes(q);
      return matchStatus && matchSearch;
    });
  });

  pendingCount = computed(() => this.leads().filter(l => l.status === 'PENDING').length);
  totalSubsidy = computed(() => {
    const total = this.leads().reduce((sum, l) => sum + (Number(l.estimated_project_cost) - Number(l.farmer_contribution)), 0);
    return total.toLocaleString('en-IN');
  });

  ngOnInit() {
    this.api.getQuoteLeads().subscribe(data => {
      this.leads.set(data.length > 0 ? data : MOCK_LEADS);
      this.loading.set(false);
    });
  }

  initials(name: string): string {
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  formatNum(val: string | number): string { return Number(val).toLocaleString('en-IN'); }
  formatDate(iso: string): string { return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' }); }

  getStatusClass(s: string): string {
    const m: Record<string, string> = { PENDING: 'badge badge-amber', APPROVED: 'badge badge-blue', COMPLETED: 'badge badge-green', REJECTED: 'badge badge-red' };
    return m[s] ?? 'badge';
  }
  getSubsidyClass(p: number): string {
    return p === 100 ? 'badge badge-green' : p >= 75 ? 'badge badge-blue' : 'badge badge-amber';
  }
}
