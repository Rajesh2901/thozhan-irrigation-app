import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { QuoteLead, DashboardStats } from '../../core/models/interfaces';

interface DistrictLeadMetric {
  district: string;
  leadCount: number;
  subsidyLakhs: number;
  acres: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="dash-canvas animate-fade">

    <!-- ── Top Welcome & Quick Actions Bar ── -->
    <div class="dash-header-card">
      <div class="header-info">
        <span class="sub-greeting">Executive Overview</span>
        <h1 class="main-title">
          Welcome back, <span class="highlight-name">{{ auth.username() || 'Manager' }}</span>
        </h1>
        <p class="header-desc">
          Real-time telemetry on farmer subsidies, irrigation lead lifecycles, and field deployments across Tamil Nadu.
        </p>
      </div>

      <div class="header-cta-group">
        <a href="http://localhost:8000/admin/" target="_blank" class="action-btn-outline" title="Open Django Superuser Admin">
          <i class="fa-brands fa-python"></i>
          <span>Django Core</span>
        </a>
        <a routerLink="/admin/leads" class="action-btn-primary">
          <i class="fa-solid fa-users-gear"></i>
          <span>Process Leads</span>
        </a>
      </div>
    </div>

    <!-- ── KPI Cards with Interactive Visual Sparklines ── -->
    <div class="kpi-grid">

      <!-- Card 1: Farmers Served -->
      <div class="kpi-card" (mouseenter)="activeKpi.set('farmers')">
        <div class="kpi-top">
          <span class="kpi-title">Farmers Assisted</span>
          <div class="kpi-icon-pill emerald">
            <i class="fa-solid fa-users"></i>
          </div>
        </div>
        <div class="kpi-body">
          <div class="kpi-metric">{{ stats()?.total_farmers ?? 850 }}</div>
          <div class="kpi-trend up">
            <i class="fa-solid fa-arrow-trend-up"></i>
            <span>+14.2% YoY growth</span>
          </div>
        </div>
        <!-- SVG Sparkline -->
        <div class="sparkline-container">
          <svg viewBox="0 0 120 28" class="sparkline-svg">
            <path d="M0 24 Q20 20 40 16 T80 10 T120 4" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round" />
            <path d="M0 24 Q20 20 40 16 T80 10 T120 4 L120 28 L0 28 Z" fill="url(#emeraldGrad)" opacity="0.15" />
            <defs>
              <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#10B981" />
                <stop offset="100%" stop-color="#10B981" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Card 2: Micro-Irrigation Installations -->
      <div class="kpi-card" (mouseenter)="activeKpi.set('installations')">
        <div class="kpi-top">
          <span class="kpi-title">Installations Done</span>
          <div class="kpi-icon-pill blue">
            <i class="fa-solid fa-faucet-drip"></i>
          </div>
        </div>
        <div class="kpi-body">
          <div class="kpi-metric">{{ stats()?.total_installations ?? 1200 }}+</div>
          <div class="kpi-trend up">
            <i class="fa-solid fa-arrow-trend-up"></i>
            <span>+8.6% this cycle</span>
          </div>
        </div>
        <!-- SVG Sparkline -->
        <div class="sparkline-container">
          <svg viewBox="0 0 120 28" class="sparkline-svg">
            <path d="M0 22 Q30 18 60 12 T100 8 T120 3" fill="none" stroke="#3B82F6" stroke-width="2.5" stroke-linecap="round" />
            <path d="M0 22 Q30 18 60 12 T100 8 T120 3 L120 28 L0 28 Z" fill="url(#blueGrad)" opacity="0.15" />
            <defs>
              <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3B82F6" />
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Card 3: Estimated Subsidy Facilitated -->
      <div class="kpi-card" (mouseenter)="activeKpi.set('subsidy')">
        <div class="kpi-top">
          <span class="kpi-title">Subsidy Facilitated</span>
          <div class="kpi-icon-pill amber">
            <i class="fa-solid fa-indian-rupee-sign"></i>
          </div>
        </div>
        <div class="kpi-body">
          <div class="kpi-metric">₹{{ formattedTotalSubsidy() }}</div>
          <div class="kpi-trend neutral">
            <i class="fa-solid fa-shield-check"></i>
            <span>TN Horticulture Dept</span>
          </div>
        </div>
        <!-- SVG Sparkline -->
        <div class="sparkline-container">
          <svg viewBox="0 0 120 28" class="sparkline-svg">
            <path d="M0 20 Q25 24 50 14 T90 9 T120 2" fill="none" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" />
            <path d="M0 20 Q25 24 50 14 T90 9 T120 2 L120 28 L0 28 Z" fill="url(#amberGrad)" opacity="0.15" />
            <defs>
              <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#F59E0B" />
                <stop offset="100%" stop-color="#F59E0B" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <!-- Card 4: Districts Coverage -->
      <div class="kpi-card" (mouseenter)="activeKpi.set('districts')">
        <div class="kpi-top">
          <span class="kpi-title">District Reach</span>
          <div class="kpi-icon-pill purple">
            <i class="fa-solid fa-map-location-dot"></i>
          </div>
        </div>
        <div class="kpi-body">
          <div class="kpi-metric">{{ stats()?.districts_covered ?? 18 }} <span class="metric-total">/ 38</span></div>
          <div class="kpi-trend purple-trend">
            <i class="fa-solid fa-location-crosshairs"></i>
            <span>12 Yrs Hub: Dindigul</span>
          </div>
        </div>
        <!-- Progress bar visual -->
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill" [style.width.%]="(18 / 38) * 100"></div>
        </div>
      </div>

    </div>

    <!-- ── Interactive Graphs Section (Donut + Bar Graphs) ── -->
    <div class="charts-two-col">

      <!-- Interactive Donut Chart: Lead Status Breakdown -->
      <div class="admin-card chart-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <i class="fa-solid fa-chart-pie chart-icon emerald"></i>
              Lead Pipeline Distribution
            </h2>
            <p class="card-sub">Interactive status breakdown for subsidy requests</p>
          </div>
          <span class="header-pill">{{ totalLeadsCount() }} Total Leads</span>
        </div>

        <div class="donut-interactive-wrap">
          <!-- Donut SVG Graph -->
          <div class="donut-svg-box">
            <svg viewBox="0 0 220 220" class="donut-svg">
              <!-- Background track ring -->
              <circle cx="110" cy="110" r="76"
                      fill="none"
                      stroke="#2A2D33"
                      stroke-width="26" />

              <!-- Slices calculated via stroke-dasharray -->
              @for (slice of donutSlices(); track slice.label) {
                <circle cx="110" cy="110" r="76"
                        fill="none"
                        [attr.stroke]="slice.color"
                        [attr.stroke-width]="slice.isHovered ? 32 : 26"
                        [attr.stroke-dasharray]="slice.dashArray"
                        [attr.stroke-dashoffset]="slice.dashOffset"
                        stroke-linecap="round"
                        class="donut-segment"
                        (mouseenter)="hoverSlice(slice.label)"
                        (mouseleave)="hoverSlice(null)" />
              }
            </svg>

            <!-- Center Callout -->
            <div class="donut-center-readout">
              <span class="readout-label">{{ activeHoverSlice() || 'Pipeline' }}</span>
              <span class="readout-val">{{ activeSliceCount() }}</span>
              <span class="readout-pct">{{ activeSlicePct() }}</span>
            </div>
          </div>

          <!-- Donut Legend & Stats -->
          <div class="donut-legend-list">
            @for (item of statusBreakdown(); track item.label) {
              <div class="legend-row"
                   [class.is-hovered]="activeHoverSlice() === item.label"
                   (mouseenter)="hoverSlice(item.label)"
                   (mouseleave)="hoverSlice(null)">
                <div class="legend-dot" [style.background]="item.color" [style.box-shadow]="'0 0 8px ' + item.color"></div>
                <div class="legend-details">
                  <span class="legend-name">{{ item.label }}</span>
                  <span class="legend-sub">{{ item.description }}</span>
                </div>
                <div class="legend-stat">
                  <span class="legend-num">{{ item.count }}</span>
                  <span class="legend-pct">{{ item.pct }}%</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>

      <!-- Interactive Bar Graph: Lead Volume & Subsidy Flow by District -->
      <div class="admin-card chart-card">
        <div class="card-header">
          <div>
            <h2 class="card-title">
              <i class="fa-solid fa-chart-simple chart-icon blue"></i>
              District Activity & Demand
            </h2>
            <p class="card-sub">Top Tamil Nadu agricultural regions by applications & acreage</p>
          </div>
          <div class="unit-toggle-pill">
            <span>Acreage & Leads</span>
          </div>
        </div>

        <div class="bar-chart-container">
          <!-- Subtle Horizontal Grid Lines -->
          <div class="grid-lines-bg">
            <div class="grid-line"><span class="grid-label">100%</span></div>
            <div class="grid-line"><span class="grid-label">75%</span></div>
            <div class="grid-line"><span class="grid-label">50%</span></div>
            <div class="grid-line"><span class="grid-label">25%</span></div>
            <div class="grid-line zero"><span class="grid-label">0</span></div>
          </div>

          <!-- Interactive Vertical Bars -->
          <div class="bars-flex-container">
            @for (bar of districtMetrics(); track bar.district) {
              <div class="bar-col" (mouseenter)="hoverDistrict.set(bar)" (mouseleave)="hoverDistrict.set(null)">
                <!-- Hover Value Tooltip -->
                <div class="bar-tooltip" [class.show]="hoverDistrict()?.district === bar.district">
                  <div class="tt-header">{{ bar.district }}</div>
                  <div class="tt-body">{{ bar.leadCount }} Leads · {{ bar.acres }} Acres</div>
                  <div class="tt-val">₹{{ bar.subsidyLakhs }} Lakhs Subsidy</div>
                </div>

                <!-- Bar Column Visual -->
                <div class="bar-track">
                  <div class="bar-fill"
                       [style.height.%]="getBarHeight(bar.acres)"
                       [class.bar-active]="hoverDistrict()?.district === bar.district">
                    <div class="bar-glow-cap"></div>
                  </div>
                </div>

                <span class="bar-district-label">{{ bar.district }}</span>
              </div>
            }
          </div>
        </div>

        <div class="bar-chart-footer">
          <div class="footer-hint">
            <i class="fa-solid fa-circle-info"></i>
            <span>Dindigul region holds highest demand for 100% small-farmer PMKSY grants.</span>
          </div>
        </div>
      </div>

    </div>

    <!-- ── Recent Leads Table (Aligned Columns & Modern Status Badges) ── -->
    <div class="admin-card table-section">
      <div class="table-card-header">
        <div>
          <h2 class="card-title">
            <i class="fa-solid fa-list-check chart-icon emerald"></i>
            Recent Farmer Submissions
          </h2>
          <p class="card-sub">Incoming requests through website subsidy estimator</p>
        </div>
        <a routerLink="/admin/leads" class="action-btn-outline sm">
          <span>Manage All Leads</span>
          <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>

      @if (loading()) {
        <div class="table-loading-state">
          <div class="spinner"></div>
          <p>Retrieving recent records...</p>
        </div>
      } @else {
        <div class="table-responsive-wrapper">
          <table class="premium-admin-table">
            <thead>
              <tr>
                <th style="width: 70px;">ID</th>
                <th style="width: 240px;">Farmer Details</th>
                <th style="width: 140px;">District</th>
                <th style="width: 170px;">Equipment</th>
                <th style="width: 90px; text-align: center;">Acres</th>
                <th style="width: 140px; text-align: right;">Project Cost</th>
                <th style="width: 140px; text-align: center;">Govt Subsidy</th>
                <th style="width: 130px; text-align: center;">Status</th>
                <th style="width: 120px; text-align: right;">Created</th>
              </tr>
            </thead>
            <tbody>
              @for (lead of recentLeads(); track lead.id) {
                <tr class="table-row-hover">
                  <td class="cell-id">#{{ lead.id }}</td>
                  <td>
                    <div class="farmer-cell">
                      <div class="farmer-avatar">{{ initials(lead.farmer_name) }}</div>
                      <div class="farmer-meta">
                        <span class="farmer-name">{{ lead.farmer_name }}</span>
                        <a [href]="'tel:' + lead.phone_number" class="farmer-phone">
                          <i class="fa-solid fa-phone"></i> {{ lead.phone_number }}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td class="cell-district">
                    <span class="district-pill">{{ lead.district }}</span>
                  </td>
                  <td class="cell-product">{{ lead.product_title }}</td>
                  <td class="cell-acres" style="text-align: center;">
                    <span class="acres-badge">{{ lead.land_size_acres }} Ac</span>
                  </td>
                  <td class="cell-amount" style="text-align: right;">
                    <span class="cost-figure">₹{{ formatNum(lead.estimated_project_cost) }}</span>
                  </td>
                  <td style="text-align: center;">
                    <span class="admin-badge" [class]="getSubsidyBadgeClass(lead.subsidy_percent)">
                      <span class="admin-badge-dot"></span>
                      {{ lead.subsidy_percent }}% Grant
                    </span>
                  </td>
                  <td style="text-align: center;">
                    <span class="admin-badge" [class]="getStatusBadgeClass(lead.status)">
                      <span class="admin-badge-dot"></span>
                      {{ lead.status }}
                    </span>
                  </td>
                  <td class="cell-date" style="text-align: right;">{{ formatDate(lead.created_at) }}</td>
                </tr>
              }
              @if (recentLeads().length === 0) {
                <tr>
                  <td colspan="9" class="empty-table-cell">
                    <div class="empty-state-wrap">
                      <i class="fa-solid fa-inbox text-3xl"></i>
                      <p>No recent lead records available.</p>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </div>

  </div>
  `,
  styles: [`
  .dash-canvas {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* ── Header Welcome Card ── */
  .dash-header-card {
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

  .header-info { max-width: 720px; }
  .sub-greeting {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #10B981;
    display: block;
    margin-bottom: 0.25rem;
  }
  .main-title {
    font-size: 1.45rem;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.25;
  }
  .highlight-name {
    color: #34D399;
  }
  .header-desc {
    color: #94A3B8;
    font-size: 0.8125rem;
    margin-top: 0.35rem;
    line-height: 1.5;
  }

  .header-cta-group {
    display: flex;
    gap: 0.75rem;
    align-items: center;
  }

  .action-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #10B981;
    color: #FFFFFF;
    font-weight: 700;
    font-size: 0.8125rem;
    padding: 0.65rem 1.15rem;
    border-radius: 9px;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.25);
    transition: all 0.18s ease;
  }
  .action-btn-primary:hover {
    background: #059669;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);
  }

  .action-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #E2E8F0;
    font-weight: 600;
    font-size: 0.8125rem;
    padding: 0.65rem 1rem;
    border-radius: 9px;
    text-decoration: none;
    transition: all 0.18s ease;
  }
  .action-btn-outline:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    color: #FFFFFF;
  }
  .action-btn-outline.sm {
    padding: 0.45rem 0.85rem;
    font-size: 0.75rem;
  }

  /* ── KPI Grid ── */
  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.25rem;
  }

  .kpi-card {
    background: #22252A;
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 14px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.4);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }
  .kpi-card:hover {
    border-color: rgba(255, 255, 255, 0.14);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.5);
  }

  .kpi-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  .kpi-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: #94A3B8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .kpi-icon-pill {
    width: 34px;
    height: 34px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
  }
  .kpi-icon-pill.emerald { background: rgba(16, 185, 129, 0.12); color: #34D399; }
  .kpi-icon-pill.blue    { background: rgba(59, 130, 246, 0.12); color: #60A5FA; }
  .kpi-icon-pill.amber   { background: rgba(245, 158, 11, 0.12); color: #FBBF24; }
  .kpi-icon-pill.purple  { background: rgba(139, 92, 246, 0.12); color: #A78BFA; }

  .kpi-body {
    margin-bottom: 0.5rem;
  }
  .kpi-metric {
    font-size: 1.65rem;
    font-weight: 800;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }
  .metric-total {
    font-size: 0.9rem;
    font-weight: 500;
    color: #64748B;
  }
  .kpi-trend {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    font-weight: 600;
    margin-top: 0.35rem;
  }
  .kpi-trend.up { color: #34D399; }
  .kpi-trend.neutral { color: #FBBF24; }
  .kpi-trend.purple-trend { color: #A78BFA; }

  .sparkline-container {
    width: 100%;
    height: 28px;
    margin-top: 0.5rem;
  }
  .sparkline-svg {
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  .progress-bar-wrap {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 9999px;
    overflow: hidden;
    margin-top: 1rem;
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #8B5CF6, #A78BFA);
    border-radius: 9999px;
  }

  /* ── Interactive Charts Two-Column ── */
  .charts-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .chart-card {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }
  .card-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .card-sub {
    font-size: 0.72rem;
    color: #94A3B8;
    margin-top: 0.15rem;
  }
  .chart-icon {
    font-size: 0.9rem;
  }
  .chart-icon.emerald { color: #10B981; }
  .chart-icon.blue    { color: #3B82F6; }

  .header-pill {
    font-size: 0.7rem;
    font-weight: 700;
    color: #E2E8F0;
    background: #282C32;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.35rem 0.75rem;
    border-radius: 9999px;
  }

  .unit-toggle-pill {
    font-size: 0.68rem;
    font-weight: 700;
    color: #60A5FA;
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.25);
    padding: 0.3rem 0.65rem;
    border-radius: 6px;
  }

  /* Donut Graph Component */
  .donut-interactive-wrap {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 0.5rem;
  }

  .donut-svg-box {
    position: relative;
    width: 180px;
    height: 180px;
    flex-shrink: 0;
  }
  .donut-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }
  .donut-segment {
    cursor: pointer;
    transition: stroke-width 0.2s ease, opacity 0.2s ease;
  }
  .donut-segment:hover {
    opacity: 0.9;
  }

  .donut-center-readout {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    text-align: center;
  }
  .readout-label {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #94A3B8;
  }
  .readout-val {
    font-size: 1.45rem;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.1;
  }
  .readout-pct {
    font-size: 0.75rem;
    font-weight: 700;
    color: #34D399;
  }

  .donut-legend-list {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }

  .legend-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.65rem;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid transparent;
    transition: all 0.15s ease;
    cursor: pointer;
  }
  .legend-row:hover,
  .legend-row.is-hovered {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
  .legend-dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .legend-details {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .legend-name {
    font-size: 0.78rem;
    font-weight: 700;
    color: #F1F5F9;
  }
  .legend-sub {
    font-size: 0.65rem;
    color: #64748B;
  }
  .legend-stat {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .legend-num {
    font-size: 0.82rem;
    font-weight: 800;
    color: #FFFFFF;
  }
  .legend-pct {
    font-size: 0.65rem;
    color: #94A3B8;
  }

  /* ── Interactive Bar Graph ── */
  .bar-chart-container {
    position: relative;
    height: 180px;
    margin-top: 1rem;
    display: flex;
    align-items: flex-end;
  }

  .grid-lines-bg {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
  }
  .grid-line {
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    position: relative;
  }
  .grid-label {
    position: absolute;
    right: 0;
    top: -8px;
    font-size: 0.58rem;
    color: #475569;
    font-weight: 600;
  }

  .bars-flex-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    padding: 0 1.5rem 0 0.5rem;
    z-index: 2;
  }

  .bar-col {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    width: 38px;
    cursor: pointer;
  }

  .bar-track {
    width: 18px;
    height: 82%;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 6px 6px 0 0;
    display: flex;
    align-items: flex-end;
    overflow: hidden;
  }

  .bar-fill {
    width: 100%;
    background: linear-gradient(180deg, #3B82F6, #1D4ED8);
    border-radius: 6px 6px 0 0;
    transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    position: relative;
  }
  .bar-fill.bar-active {
    background: linear-gradient(180deg, #60A5FA, #2563EB);
    box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
  }

  .bar-glow-cap {
    width: 100%;
    height: 3px;
    background: #93C5FD;
    border-radius: 2px 2px 0 0;
  }

  .bar-district-label {
    font-size: 0.65rem;
    font-weight: 600;
    color: #94A3B8;
    margin-top: 0.5rem;
    white-space: nowrap;
  }

  /* Tooltip */
  .bar-tooltip {
    position: absolute;
    bottom: 95%;
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: #111315;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    padding: 0.5rem 0.65rem;
    font-size: 0.68rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: all 0.15s ease;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
    z-index: 20;
  }
  .bar-tooltip.show {
    opacity: 1;
    transform: translateX(-50%) translateY(-6px);
  }
  .tt-header { font-weight: 700; color: #FFFFFF; }
  .tt-body   { color: #94A3B8; margin-top: 2px; }
  .tt-val    { color: #60A5FA; font-weight: 700; margin-top: 2px; }

  .bar-chart-footer {
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    padding-top: 0.75rem;
    margin-top: 0.75rem;
  }
  .footer-hint {
    display: flex;
    align-items: center;
    gap: 0.45rem;
    font-size: 0.68rem;
    color: #64748B;
  }

  /* ── Recent Leads Table ── */
  .table-section {
    padding: 1.5rem;
    overflow: hidden;
  }

  .table-card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .table-responsive-wrapper {
    overflow-x: auto;
  }

  .premium-admin-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    font-size: 0.8125rem;
  }

  .premium-admin-table th {
    background: #1B1E22;
    color: #94A3B8;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }

  .premium-admin-table td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    vertical-align: middle;
  }

  .table-row-hover:hover td {
    background: rgba(255, 255, 255, 0.02);
  }

  .cell-id {
    font-family: monospace;
    font-size: 0.75rem;
    color: #64748B;
  }

  .farmer-cell {
    display: flex;
    align-items: center;
    gap: 0.65rem;
  }
  .farmer-avatar {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #10B981, #065F46);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 0.68rem;
    font-weight: 800;
    flex-shrink: 0;
  }
  .farmer-meta {
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
    transition: color 0.15s ease;
  }
  .farmer-phone:hover {
    color: #34D399;
  }

  .district-pill {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.25rem 0.55rem;
    border-radius: 6px;
    font-size: 0.72rem;
    color: #E2E8F0;
  }

  .cell-product {
    font-size: 0.78rem;
    color: #CBD5E1;
  }

  .acres-badge {
    font-weight: 700;
    color: #F1F5F9;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
  }

  .cost-figure {
    font-weight: 700;
    color: #FFFFFF;
    font-size: 0.82rem;
  }

  .cell-date {
    font-size: 0.72rem;
    color: #64748B;
  }

  .empty-table-cell {
    text-align: center;
    padding: 3rem !important;
  }
  .empty-state-wrap {
    color: #64748B;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .table-loading-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    gap: 0.75rem;
    color: #94A3B8;
  }

  /* ── Responsive ── */
  @media (max-width: 1200px) {
    .kpi-grid { grid-template-columns: repeat(2, 1fr); }
    .charts-two-col { grid-template-columns: 1fr; }
  }

  @media (max-width: 768px) {
    .kpi-grid { grid-template-columns: 1fr; }
    .donut-interactive-wrap { flex-direction: column; }
  }
  `]
})
export class DashboardComponent implements OnInit {
  auth = inject(AuthService);
  api = inject(ApiService);

  loading = signal(true);
  stats = signal<DashboardStats | null>(null);
  recentLeads = signal<QuoteLead[]>([]);
  activeKpi = signal<string>('farmers');

  // Interactive Hover Slice for Donut
  activeHoverSlice = signal<string | null>(null);
  hoverDistrict = signal<DistrictLeadMetric | null>(null);

  // Status breakdown array
  statusData = signal([
    { label: 'Pending',   count: 4, color: '#F59E0B', description: 'Awaiting eligibility inspection' },
    { label: 'Approved',  count: 8, color: '#3B82F6', description: 'Govt. subsidy sanction issued' },
    { label: 'Completed', count: 11, color: '#10B981', description: 'Drip/sprinklers installed on field' },
    { label: 'Ineligible',count: 1, color: '#EF4444', description: 'Exceeded land ceiling / disqualified' },
  ]);

  // District Activity Bar Metrics
  districtMetrics = signal<DistrictLeadMetric[]>([
    { district: 'Dindigul',  leadCount: 14, subsidyLakhs: 24.5, acres: 68 },
    { district: 'Madurai',   leadCount: 9,  subsidyLakhs: 16.2, acres: 44 },
    { district: 'Theni',     leadCount: 7,  subsidyLakhs: 13.8, acres: 36 },
    { district: 'Karur',     leadCount: 6,  subsidyLakhs: 11.4, acres: 30 },
    { district: 'Tiruppur',  leadCount: 5,  subsidyLakhs: 9.8,  acres: 26 },
    { district: 'Salem',     leadCount: 4,  subsidyLakhs: 7.5,  acres: 20 },
  ]);

  totalLeadsCount = computed(() => {
    return this.statusData().reduce((acc, curr) => acc + curr.count, 0);
  });

  statusBreakdown = computed(() => {
    const total = this.totalLeadsCount() || 1;
    return this.statusData().map(s => ({
      ...s,
      pct: Math.round((s.count / total) * 100)
    }));
  });

  // Calculate SVG stroke-dasharray and stroke-dashoffset for the Donut
  donutSlices = computed(() => {
    const total = this.totalLeadsCount() || 1;
    const circumference = 2 * Math.PI * 76; // r=76 => ~477.52
    let accumulatedLength = 0;

    return this.statusBreakdown().map(s => {
      const sliceLength = (s.count / total) * circumference;
      const dashArray = `${sliceLength} ${circumference - sliceLength}`;
      const dashOffset = -accumulatedLength;
      accumulatedLength += sliceLength;

      return {
        ...s,
        dashArray,
        dashOffset,
        isHovered: this.activeHoverSlice() === s.label
      };
    });
  });

  activeSliceCount = computed(() => {
    const active = this.activeHoverSlice();
    if (!active) return this.totalLeadsCount();
    const item = this.statusData().find(s => s.label === active);
    return item ? item.count : this.totalLeadsCount();
  });

  activeSlicePct = computed(() => {
    const active = this.activeHoverSlice();
    if (!active) return '100% Pipeline';
    const item = this.statusBreakdown().find(s => s.label === active);
    return item ? `${item.pct}% of Leads` : '100%';
  });

  formattedTotalSubsidy = computed(() => {
    const leads = this.recentLeads();
    if (leads.length === 0) return '1.84 Cr';
    const total = leads.reduce((sum, l) => sum + (Number(l.projected_subsidy_amount) || 0), 0);
    return total > 0 ? (total / 100000).toFixed(1) + ' Lakhs' : '1.84 Cr';
  });

  ngOnInit() {
    this.api.getDashboardStats().subscribe(s => this.stats.set(s));

    this.api.getQuoteLeads().subscribe(leads => {
      if (leads && leads.length > 0) {
        this.recentLeads.set(leads.slice(0, 8));

        // Update real status breakdown from backend
        const pending = leads.filter(l => l.status === 'PENDING').length;
        const approved = leads.filter(l => l.status === 'APPROVED').length;
        const completed = leads.filter(l => l.status === 'COMPLETED').length;
        const rejected = leads.filter(l => l.status === 'REJECTED').length;

        if (pending + approved + completed + rejected > 0) {
          this.statusData.set([
            { label: 'Pending',   count: pending || 1, color: '#F59E0B', description: 'Awaiting eligibility inspection' },
            { label: 'Approved',  count: approved || 1, color: '#3B82F6', description: 'Govt. subsidy sanction issued' },
            { label: 'Completed', count: completed || 1, color: '#10B981', description: 'Drip/sprinklers installed on field' },
            { label: 'Ineligible',count: rejected, color: '#EF4444', description: 'Exceeded land ceiling / disqualified' },
          ]);
        }
      } else {
        // Fallback sample leads
        this.recentLeads.set([
          { id: 101, farmer_name: 'M. Selvam', phone_number: '9876543210', district: 'Dindigul', product: 1, product_title: 'Drip Irrigation Kit', land_size_acres: 3.5, estimated_project_cost: '85750', projected_subsidy_amount: '85750', farmer_contribution: '0', subsidy_percent: 100, status: 'APPROVED', created_at: new Date().toISOString() },
          { id: 102, farmer_name: 'K. Murugesan', phone_number: '9489528432', district: 'Madurai', product: 2, product_title: 'Sprinkler System', land_size_acres: 8.0, estimated_project_cost: '145600', projected_subsidy_amount: '109200', farmer_contribution: '36400', subsidy_percent: 75, status: 'PENDING', created_at: new Date(Date.now() - 86400000).toISOString() },
          { id: 103, farmer_name: 'S. Ramasamy', phone_number: '9842100000', district: 'Theni', product: 3, product_title: 'Rain Gun System', land_size_acres: 15.0, estimated_project_cost: '480000', projected_subsidy_amount: '240000', farmer_contribution: '240000', subsidy_percent: 50, status: 'COMPLETED', created_at: new Date(Date.now() - 172800000).toISOString() },
          { id: 104, farmer_name: 'A. Meenakshi', phone_number: '9443322110', district: 'Karur', product: 4, product_title: 'Solar Agri Pump', land_size_acres: 4.0, estimated_project_cost: '85000', projected_subsidy_amount: '85000', farmer_contribution: '0', subsidy_percent: 100, status: 'APPROVED', created_at: new Date(Date.now() - 259200000).toISOString() },
        ]);
      }
      this.loading.set(false);
    });
  }

  hoverSlice(label: string | null) {
    this.activeHoverSlice.set(label);
  }

  getBarHeight(acres: number): number {
    const maxAcres = 75;
    return Math.min(100, Math.max(14, Math.round((acres / maxAcres) * 100)));
  }

  initials(name: string): string {
    if (!name) return 'TN';
    return name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
  }

  formatNum(val: string | number): string {
    return Number(val || 0).toLocaleString('en-IN');
  }

  formatDate(iso: string): string {
    if (!iso) return 'Just now';
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
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
