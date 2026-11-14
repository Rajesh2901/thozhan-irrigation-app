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
  { id: 5, farmer_name: 'A. Meenakshi', phone_number: '9443322110', district: 'Theni', product: 4, product_title: 'Solar Agri Pump', land_size_acres: 4, estimated_project_cost: '85000', projected_subsidy_amount: '85000', farmer_contribution: '0', subsidy_percent: 100, status: 'APPROVED', created_at: '2025-07-18T10:30:00Z' },
];

@Component({
  selector: 'app-leads',
  standalone: true,
  imports: [FormsModule],
  template: `
  <div class="leads-canvas animate-fade">

    <!-- ── Header & KPI Strip ── -->
    <div class="leads-header-card">
      <div class="header-left">
        <span class="sub-badge">Lead Lifecycle Telemetry</span>
        <h1 class="header-title">Farmer Subsidy Applications</h1>
        <p class="header-sub">
          Review, approve, and track micro-irrigation grant calculations submitted by farmers.
        </p>
      </div>

      <div class="header-metrics">
        <div class="metric-box">
          <span class="metric-num">{{ leads().length }}</span>
          <span class="metric-lbl">Total Records</span>
        </div>
        <div class="metric-box pending">
          <span class="metric-num">{{ pendingCount() }}</span>
          <span class="metric-lbl">Pending Review</span>
        </div>
        <div class="metric-box approved">
          <span class="metric-num">{{ approvedCount() }}</span>
          <span class="metric-lbl">Sanctioned</span>
        </div>
        <div class="metric-box subsidy">
          <span class="metric-num">₹{{ totalSubsidy() }}</span>
          <span class="metric-lbl">Assisted Grant</span>
        </div>
      </div>
    </div>

    <!-- ── Filter & Search Toolbar ── -->
    <div class="admin-card leads-toolbar">
      <div class="search-box">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text"
               placeholder="Search farmer name, district, or phone number..."
               [(ngModel)]="searchQuery"
               class="search-input" />
        @if (searchQuery) {
          <button class="clear-search-btn" (click)="searchQuery = ''" title="Clear search">
            <i class="fa-solid fa-xmark"></i>
          </button>
        }
      </div>

      <div class="filter-pills">
        @for (s of statuses; track s) {
          <button class="filter-pill-btn"
                  [class.active]="statusFilter() === s"
                  (click)="statusFilter.set(s)">
            <span>{{ s }}</span>
            <span class="pill-count">{{ getStatusCount(s) }}</span>
          </button>
        }
      </div>
    </div>

    <!-- ── Leads Data Table Card ── -->
    <div class="admin-card table-card">
      @if (loading()) {
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Loading application records...</p>
        </div>
      } @else {
        <div class="table-responsive-wrapper">
          <table class="leads-table">
            <thead>
              <tr>
                <th style="width: 60px;">#</th>
                <th style="width: 230px;">Farmer Details</th>
                <th style="width: 130px;">District</th>
                <th style="width: 170px;">Equipment System</th>
                <th style="width: 80px; text-align: center;">Land</th>
                <th style="width: 130px; text-align: right;">Total Cost</th>
                <th style="width: 140px; text-align: center;">Govt Subsidy</th>
                <th style="width: 130px; text-align: right;">Farmer Net</th>
                <th style="width: 130px; text-align: center;">Status</th>
                <th style="width: 150px; text-align: center;">Quick Action</th>
                <th style="width: 110px; text-align: right;">Submitted</th>
              </tr>
            </thead>
            <tbody>
              @for (lead of filteredLeads(); track lead.id) {
                <tr class="lead-row">
                  <td class="cell-id">#{{ lead.id }}</td>
                  <td>
                    <div class="farmer-identity">
                      <div class="farmer-avatar">{{ initials(lead.farmer_name) }}</div>
                      <div class="farmer-info">
                        <span class="farmer-name">{{ lead.farmer_name }}</span>
                        <a [href]="'tel:' + lead.phone_number" class="farmer-phone">
                          <i class="fa-solid fa-phone"></i> {{ lead.phone_number }}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="district-chip">{{ lead.district }}</span>
                  </td>
                  <td class="cell-product-title">
                    <span class="prod-name">{{ lead.product_title }}</span>
                  </td>
                  <td style="text-align: center;">
                    <span class="acres-badge">{{ lead.land_size_acres }} Ac</span>
                  </td>
                  <td style="text-align: right;">
                    <span class="cost-num">₹{{ formatNum(lead.estimated_project_cost) }}</span>
                  </td>
                  <td style="text-align: center;">
                    <div class="subsidy-cell-wrap">
                      <span class="admin-badge" [class]="getSubsidyBadgeClass(lead.subsidy_percent)">
                        <span class="admin-badge-dot"></span>
                        {{ lead.subsidy_percent }}%
                      </span>
                      <span class="subsidy-rupees">₹{{ formatNum(lead.projected_subsidy_amount) }}</span>
                    </div>
                  </td>
                  <td style="text-align: right;">
                    @if (Number(lead.farmer_contribution) === 0) {
                      <span class="free-grant-pill">100% Free</span>
                    } @else {
                      <span class="contrib-num">₹{{ formatNum(lead.farmer_contribution) }}</span>
                    }
                  </td>
                  <td style="text-align: center;">
                    <span class="admin-badge" [class]="getStatusBadgeClass(lead.status)">
                      <span class="admin-badge-dot"></span>
                      {{ lead.status }}
                    </span>
                  </td>
                  <!-- Quick Status Mutation Action -->
                  <td style="text-align: center;">
                    <div class="status-action-select-wrap">
                      <select [value]="lead.status"
                              (change)="onStatusChange(lead, $event)"
                              class="status-select">
                        <option value="PENDING">Pending</option>
                        <option value="APPROVED">Approve</option>
                        <option value="COMPLETED">Complete</option>
                        <option value="REJECTED">Reject</option>
                      </select>
                    </div>
                  </td>
                  <td class="cell-date" style="text-align: right;">
                    {{ formatDate(lead.created_at) }}
                  </td>
                </tr>
              }

              @if (filteredLeads().length === 0) {
                <tr>
                  <td colspan="11" class="empty-state-cell">
                    <div class="empty-box">
                      <i class="fa-solid fa-filter-circle-xmark"></i>
                      <p class="empty-text">No quote requests match your filter criteria.</p>
                      <button class="reset-filter-btn" (click)="resetFilters()">Clear Filters</button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="table-footer-bar">
          <div class="footer-left">
            Showing <strong class="highlight-count">{{ filteredLeads().length }}</strong> of {{ leads().length }} leads
          </div>
          <div class="footer-right">
            Total Subsidy Assisted: <span class="subsidy-sum">₹{{ totalSubsidy() }}</span>
          </div>
        </div>
      }
    </div>

  </div>
  `,
  styles: [`
  .leads-canvas {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* ── Header Card ── */
  .leads-header-card {
    background: #202328;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 1.5rem 1.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    flex-wrap: wrap;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
  }

  .sub-badge {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    color: #10B981;
    display: block;
    margin-bottom: 0.25rem;
  }

  .header-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
  }

  .header-sub {
    font-size: 0.8125rem;
    color: #94A3B8;
    margin-top: 0.25rem;
  }

  .header-metrics {
    display: flex;
    gap: 0.875rem;
    flex-wrap: wrap;
  }

  .metric-box {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 10px;
    padding: 0.65rem 1.15rem;
    text-align: center;
    min-width: 100px;
  }
  .metric-box.pending .metric-num { color: #FBBF24; }
  .metric-box.approved .metric-num { color: #60A5FA; }
  .metric-box.subsidy .metric-num { color: #34D399; }

  .metric-num {
    display: block;
    font-size: 1.15rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.2;
  }
  .metric-lbl {
    font-size: 0.65rem;
    font-weight: 600;
    color: #64748B;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ── Toolbar ── */
  .leads-toolbar {
    padding: 0.875rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .search-box {
    position: relative;
    flex: 1;
    min-width: 260px;
  }
  .search-icon {
    position: absolute;
    left: 0.875rem;
    top: 50%;
    transform: translateY(-50%);
    color: #64748B;
    font-size: 0.85rem;
  }
  .search-input {
    width: 100%;
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 9px;
    padding: 0.55rem 2.25rem 0.55rem 2.5rem;
    color: #FFFFFF;
    font-size: 0.8125rem;
    font-family: inherit;
    transition: all 0.15s ease;
  }
  .search-input:focus {
    border-color: #10B981;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
    outline: none;
  }
  .search-input::placeholder { color: #64748B; }

  .clear-search-btn {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: #64748B;
    font-size: 0.75rem;
    cursor: pointer;
  }
  .clear-search-btn:hover { color: #FFFFFF; }

  .filter-pills {
    display: flex;
    gap: 0.35rem;
    flex-wrap: wrap;
  }

  .filter-pill-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.07);
    color: #94A3B8;
    padding: 0.45rem 0.85rem;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .filter-pill-btn:hover {
    color: #FFFFFF;
    background: #282C32;
    border-color: rgba(255, 255, 255, 0.12);
  }
  .filter-pill-btn.active {
    background: #10B981;
    color: #FFFFFF;
    border-color: #10B981;
    font-weight: 700;
    box-shadow: 0 2px 10px rgba(16, 185, 129, 0.25);
  }

  .pill-count {
    background: rgba(0, 0, 0, 0.25);
    padding: 0.1rem 0.4rem;
    border-radius: 9999px;
    font-size: 0.65rem;
    font-weight: 700;
  }

  /* ── Table Styling ── */
  .table-card {
    overflow: hidden;
    padding: 0;
  }

  .table-responsive-wrapper {
    overflow-x: auto;
  }

  .leads-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.8125rem;
  }

  .leads-table th {
    background: #1B1E22;
    color: #94A3B8;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }

  .leads-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
  }

  .lead-row:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .cell-id {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748B;
  }

  .farmer-identity {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }

  .farmer-avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #059669, #064E3B);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-weight: 800;
    font-size: 0.7rem;
    border: 1px solid rgba(52, 211, 153, 0.3);
    flex-shrink: 0;
  }

  .farmer-info {
    display: flex;
    flex-direction: column;
  }

  .farmer-name {
    font-weight: 700;
    color: #FFFFFF;
    font-size: 0.82rem;
  }

  .farmer-phone {
    font-size: 0.7rem;
    color: #64748B;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    transition: color 0.15s ease;
  }
  .farmer-phone:hover { color: #34D399; }

  .district-chip {
    display: inline-block;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 0.2rem 0.55rem;
    font-size: 0.72rem;
    color: #E2E8F0;
  }

  .cell-product-title .prod-name {
    font-size: 0.78rem;
    color: #CBD5E1;
  }

  .acres-badge {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    font-weight: 700;
    color: #F1F5F9;
    font-size: 0.75rem;
  }

  .cost-num {
    font-weight: 700;
    color: #FFFFFF;
    font-size: 0.82rem;
  }

  .subsidy-cell-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.2rem;
  }
  .subsidy-rupees {
    font-size: 0.68rem;
    color: #94A3B8;
  }

  .free-grant-pill {
    display: inline-block;
    background: rgba(16, 185, 129, 0.15);
    color: #34D399;
    font-weight: 800;
    font-size: 0.68rem;
    padding: 0.2rem 0.5rem;
    border-radius: 9999px;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }

  .contrib-num {
    font-weight: 700;
    color: #FBBF24;
    font-size: 0.82rem;
  }

  .status-action-select-wrap {
    display: inline-block;
  }
  .status-select {
    background: #17191C;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 6px;
    color: #E2E8F0;
    font-size: 0.72rem;
    padding: 0.25rem 0.5rem;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .status-select:focus {
    border-color: #10B981;
    outline: none;
  }

  .cell-date {
    font-size: 0.72rem;
    color: #64748B;
  }

  .table-footer-bar {
    padding: 0.875rem 1.5rem;
    background: #1B1E22;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #94A3B8;
  }
  .highlight-count { color: #FFFFFF; }
  .subsidy-sum { color: #34D399; font-weight: 800; }

  .empty-state-cell {
    padding: 3.5rem !important;
    text-align: center;
  }
  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #64748B;
  }
  .empty-box i { font-size: 2rem; color: #475569; }
  .empty-text { font-size: 0.85rem; }
  .reset-filter-btn {
    margin-top: 0.5rem;
    background: #282C32;
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #E2E8F0;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.35rem 0.85rem;
    border-radius: 6px;
    cursor: pointer;
  }
  .reset-filter-btn:hover { background: #32373E; }

  .loading-state {
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: #94A3B8;
  }

  @media (max-width: 900px) {
    .leads-header-card { flex-direction: column; align-items: flex-start; }
    .header-metrics { width: 100%; justify-content: space-between; }
    .metric-box { flex: 1; }
  }
  `]
})
export class LeadsComponent implements OnInit {
  api = inject(ApiService);

  loading = signal(true);
  leads = signal<QuoteLead[]>([]);
  statusFilter = signal<string>('ALL');
  searchQuery = '';
  statuses = STATUSES;
  Number = Number;

  filteredLeads = computed(() => {
    return this.leads().filter(l => {
      const matchStatus = this.statusFilter() === 'ALL' || l.status === this.statusFilter();
      const q = this.searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        l.farmer_name.toLowerCase().includes(q) ||
        l.district.toLowerCase().includes(q) ||
        l.phone_number.includes(q) ||
        (l.product_title && l.product_title.toLowerCase().includes(q));
      return matchStatus && matchSearch;
    });
  });

  pendingCount = computed(() => this.leads().filter(l => l.status === 'PENDING').length);
  approvedCount = computed(() => this.leads().filter(l => l.status === 'APPROVED').length);

  totalSubsidy = computed(() => {
    const total = this.leads().reduce((sum, l) => sum + (Number(l.estimated_project_cost) - Number(l.farmer_contribution)), 0);
    return total.toLocaleString('en-IN');
  });

  ngOnInit() {
    this.api.getQuoteLeads().subscribe(data => {
      this.leads.set(data && data.length > 0 ? data : MOCK_LEADS);
      this.loading.set(false);
    });
  }

  getStatusCount(status: string): number {
    if (status === 'ALL') return this.leads().length;
    return this.leads().filter(l => l.status === status).length;
  }

  onStatusChange(lead: QuoteLead, event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value as 'PENDING' | 'APPROVED' | 'COMPLETED' | 'REJECTED';
    const oldStatus = lead.status;
    lead.status = newStatus;

    this.api.updateQuoteLeadStatus(lead.id, newStatus).subscribe({
      next: updated => {
        lead.status = updated.status;
      },
      error: () => {
        // Revert on failure
        lead.status = oldStatus;
      }
    });
  }

  resetFilters() {
    this.statusFilter.set('ALL');
    this.searchQuery = '';
  }

  initials(name: string): string {
    if (!name) return 'TN';
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  formatNum(val: string | number): string {
    return Number(val || 0).toLocaleString('en-IN');
  }

  formatDate(iso: string): string {
    if (!iso) return 'Recent';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
  }

  getStatusBadgeClass(status: string): string {
    const map: Record<string, string> = {
      APPROVED:  'admin-badge-blue',
      COMPLETED: 'admin-badge-emerald',
      PENDING:   'admin-badge-amber',
      REJECTED:  'admin-badge-danger',
    };
    return map[status] ?? 'admin-badge-amber';
  }

  getSubsidyBadgeClass(pct: number): string {
    if (pct === 100) return 'admin-badge-emerald';
    if (pct >= 75)  return 'admin-badge-blue';
    return 'admin-badge-amber';
  }
}
